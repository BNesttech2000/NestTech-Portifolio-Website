const express = require('express');
const router = express.Router();
const { body, query, param, validationResult } = require('express-validator');
const Project = require('../models/Project');
const { validateRequest } = require('../middleware/validation');

// @route   GET /api/projects
// @desc    Get all projects with filtering and pagination
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
  query('category').optional().isIn(['fullstack', 'frontend', 'backend', 'fundamentals', 'opensource']),
  query('status').optional().isIn(['completed', 'in-progress', 'planned']),
  query('featured').optional().isBoolean().toBoolean(),
  query('search').optional().trim().escape(),
  query('sortBy').optional().isIn(['createdAt', 'updatedAt', 'views', 'title']),
  query('sortOrder').optional().isIn(['asc', 'desc'])
], validateRequest, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      status,
      featured,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const result = await Project.getFilteredProjects({
      category,
      status,
      featured,
      search,
      page,
      limit,
      sortBy,
      sortOrder
    });

    res.json({
      success: true,
      data: result.projects,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching projects'
    });
  }
});

// @route   GET /api/projects/featured
// @desc    Get featured projects
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const featuredProjects = await Project.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .select('-__v')
      .lean();

    res.json({
      success: true,
      data: featuredProjects
    });
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching featured projects'
    });
  }
});

// @route   GET /api/projects/:slug
// @desc    Get project by slug
// @access  Public
router.get('/:slug', [
  param('slug').isString().trim().notEmpty()
], validateRequest, async (req, res) => {
  try {
    const { slug } = req.params;
    
    const project = await Project.findOne({ slug }).select('-__v').lean();
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Increment views asynchronously
    Project.incrementViews(slug).catch(console.error);

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching project'
    });
  }
});

// @route   POST /api/projects
// @desc    Create a new project (Admin only)
// @access  Private
router.post('/', [
  body('title').isString().trim().notEmpty().withMessage('Title is required'),
  body('description').isString().trim().notEmpty().withMessage('Description is required'),
  body('problemStatement').isString().trim().notEmpty().withMessage('Problem statement is required'),
  body('solution').isString().trim().notEmpty().withMessage('Solution is required'),
  body('technologies').isArray().withMessage('Technologies must be an array'),
  body('features').isArray().withMessage('Features must be an array'),
  body('category').isIn(['fullstack', 'frontend', 'backend', 'fundamentals', 'opensource']).withMessage('Invalid category'),
  body('githubUrl').isURL().withMessage('Valid GitHub URL is required'),
  body('demoUrl').optional().isURL().withMessage('Valid demo URL is required'),
  body('liveUrl').optional().isURL().withMessage('Valid live URL is required'),
  body('role').isString().trim().notEmpty().withMessage('Role is required'),
  body('startDate').isISO8601().toDate().withMessage('Valid start date is required'),
  body('endDate').optional().isISO8601().toDate(),
  body('featured').optional().isBoolean(),
  body('status').optional().isIn(['completed', 'in-progress', 'planned'])
], validateRequest, async (req, res) => {
  try {
    const projectData = req.body;
    
    // Check if project with same title exists
    const existingProject = await Project.findOne({ title: projectData.title });
    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: 'Project with this title already exists'
      });
    }

    const project = new Project(projectData);
    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error creating project'
    });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project (Admin only)
// @access  Private
router.put('/:id', [
  param('id').isMongoId().withMessage('Invalid project ID'),
  body('title').optional().isString().trim().notEmpty(),
  body('description').optional().isString().trim().notEmpty(),
  body('technologies').optional().isArray(),
  body('category').optional().isIn(['fullstack', 'frontend', 'backend', 'fundamentals', 'opensource']),
  body('featured').optional().isBoolean(),
  body('status').optional().isIn(['completed', 'in-progress', 'planned'])
], validateRequest, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const project = await Project.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Error updating project:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error updating project'
    });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project (Admin only)
// @access  Private
router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid project ID')
], validateRequest, async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting project'
    });
  }
});

module.exports = router;
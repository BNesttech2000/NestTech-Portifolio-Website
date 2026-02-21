const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');
const { authMiddleware, authorize } = require('../../middleware/auth');

// @route   GET /api/admin/projects
// @desc    Get all projects with pagination
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Project.countDocuments();
    
    res.json({
      success: true,
      data: projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @route   GET /api/admin/projects/:id
// @desc    Get single project
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Project not found' 
      });
    }
    res.json({ 
      success: true, 
      data: project 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @route   POST /api/admin/projects
// @desc    Create new project
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    await project.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Project created successfully',
      data: project 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @route   PUT /api/admin/projects/:id
// @desc    Update project
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body, 
        updatedAt: new Date() 
      },
      { new: true, runValidators: true }
    );
    
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
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @route   DELETE /api/admin/projects/:id
// @desc    Delete project
// @access  Private
router.delete('/:id', authMiddleware, authorize('admin'), async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
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
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @route   PATCH /api/admin/projects/:id/feature
// @desc    Toggle featured status
// @access  Private
router.patch('/:id/feature', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Project not found' 
      });
    }
    
    project.featured = !project.featured;
    await project.save();
    
    res.json({ 
      success: true, 
      message: `Project ${project.featured ? 'featured' : 'unfeatured'} successfully`,
      data: { featured: project.featured }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;

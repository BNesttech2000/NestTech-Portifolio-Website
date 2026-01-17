const express = require('express');
const router = express.Router();
const { body, query, param, validationResult } = require('express-validator');
const Certificate = require('../models/Certificate');
const { validateRequest } = require('../middleware/validation');

// @route   GET /api/certificates
// @desc    Get all certificates with filtering
// @access  Public
router.get('/', [
  query('category').optional().isIn(['webdev', 'frontend', 'backend', 'database', 'cloud', 'fundamentals', 'other']),
  query('verified').optional().isBoolean().toBoolean(),
  query('featured').optional().isBoolean().toBoolean(),
  query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
  query('sortBy').optional().isIn(['issueDate', 'priority', 'title']),
  query('sortOrder').optional().isIn(['asc', 'desc'])
], validateRequest, async (req, res) => {
  try {
    const {
      category,
      verified,
      featured,
      limit = 10,
      sortBy = 'issueDate',
      sortOrder = 'desc'
    } = req.query;

    const query = {};
    
    if (category) query.category = category;
    if (verified !== undefined) query.verified = verified;
    if (featured !== undefined) query.featured = featured;

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const certificates = await Certificate.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .select('-__v')
      .lean();

    const total = await Certificate.countDocuments(query);

    res.json({
      success: true,
      data: certificates,
      count: certificates.length,
      total
    });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching certificates'
    });
  }
});

// @route   GET /api/certificates/featured
// @desc    Get featured certificates
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const certificates = await Certificate.getFeatured(6);
    
    res.json({
      success: true,
      data: certificates
    });
  } catch (error) {
    console.error('Error fetching featured certificates:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching featured certificates'
    });
  }
});

// @route   GET /api/certificates/categories
// @desc    Get certificate categories with counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Certificate.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          latest: { $max: '$issueDate' }
        }
      },
      {
        $project: {
          category: '$_id',
          count: 1,
          latest: 1,
          _id: 0
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching certificate categories:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching categories'
    });
  }
});

// @route   GET /api/certificates/:slug
// @desc    Get certificate by slug
// @access  Public
router.get('/:slug', [
  param('slug').isString().trim().notEmpty()
], validateRequest, async (req, res) => {
  try {
    const { slug } = req.params;
    
    const certificate = await Certificate.findOne({ slug }).select('-__v').lean();
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Increment views asynchronously
    Certificate.incrementViews(slug).catch(console.error);

    res.json({
      success: true,
      data: certificate
    });
  } catch (error) {
    console.error('Error fetching certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching certificate'
    });
  }
});

// @route   POST /api/certificates
// @desc    Create a new certificate (Admin only)
// @access  Private
router.post('/', [
  body('title').isString().trim().notEmpty().withMessage('Title is required'),
  body('issuer').isString().trim().notEmpty().withMessage('Issuer is required'),
  body('issueDate').isISO8601().toDate().withMessage('Valid issue date is required'),
  body('credentialId').isString().trim().notEmpty().withMessage('Credential ID is required'),
  body('skills').isArray().withMessage('Skills must be an array'),
  body('category').isIn(['webdev', 'frontend', 'backend', 'database', 'cloud', 'fundamentals', 'other']).withMessage('Invalid category'),
  body('credentialUrl').optional().isURL().withMessage('Valid URL is required'),
  body('certificateUrl').optional().isURL().withMessage('Valid URL is required'),
  body('imageUrl').optional().isURL().withMessage('Valid URL is required'),
  body('description').optional().isString().trim(),
  body('verified').optional().isBoolean(),
  body('featured').optional().isBoolean(),
  body('priority').optional().isInt({ min: 0, max: 10 })
], validateRequest, async (req, res) => {
  try {
    const certificateData = req.body;
    
    // Check if credential ID already exists
    const existingCert = await Certificate.findOne({ 
      credentialId: certificateData.credentialId 
    });
    
    if (existingCert) {
      return res.status(400).json({
        success: false,
        message: 'Certificate with this credential ID already exists'
      });
    }

    const certificate = new Certificate(certificateData);
    await certificate.save();

    res.status(201).json({
      success: true,
      message: 'Certificate created successfully',
      data: certificate
    });
  } catch (error) {
    console.error('Error creating certificate:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error creating certificate'
    });
  }
});

// @route   PUT /api/certificates/:id
// @desc    Update certificate (Admin only)
// @access  Private
router.put('/:id', [
  param('id').isMongoId().withMessage('Invalid certificate ID'),
  body('title').optional().isString().trim().notEmpty(),
  body('issuer').optional().isString().trim().notEmpty(),
  body('skills').optional().isArray(),
  body('category').optional().isIn(['webdev', 'frontend', 'backend', 'database', 'cloud', 'fundamentals', 'other']),
  body('verified').optional().isBoolean(),
  body('featured').optional().isBoolean(),
  body('priority').optional().isInt({ min: 0, max: 10 })
], validateRequest, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const certificate = await Certificate.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    res.json({
      success: true,
      message: 'Certificate updated successfully',
      data: certificate
    });
  } catch (error) {
    console.error('Error updating certificate:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error updating certificate'
    });
  }
});

// @route   DELETE /api/certificates/:id
// @desc    Delete certificate (Admin only)
// @access  Private
router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid certificate ID')
], validateRequest, async (req, res) => {
  try {
    const { id } = req.params;

    const certificate = await Certificate.findByIdAndDelete(id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    res.json({
      success: true,
      message: 'Certificate deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting certificate'
    });
  }
});

module.exports = router;
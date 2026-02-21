const express = require('express');
const router = express.Router();
const Certificate = require('../../models/Certificate');
const { authMiddleware } = require('../../middleware/auth');

// @route   GET /api/admin/certificates
// @desc    Get all certificates
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ issueDate: -1 });
    res.json({ 
      success: true, 
      data: certificates 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @route   GET /api/admin/certificates/:id
// @desc    Get single certificate
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ 
        success: false, 
        message: 'Certificate not found' 
      });
    }
    res.json({ 
      success: true, 
      data: certificate 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @route   POST /api/admin/certificates
// @desc    Create new certificate
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const certificate = new Certificate(req.body);
    await certificate.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Certificate created successfully',
      data: certificate 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @route   PUT /api/admin/certificates/:id
// @desc    Update certificate
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
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
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @route   DELETE /api/admin/certificates/:id
// @desc    Delete certificate
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
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
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;

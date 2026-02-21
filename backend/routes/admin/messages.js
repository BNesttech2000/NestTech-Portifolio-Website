const express = require('express');
const router = express.Router();
const Contact = require('../../models/Contact');
const { authMiddleware } = require('../../middleware/auth');

// @route   GET /api/admin/messages
// @desc    Get all messages
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const messages = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Contact.countDocuments();
    const unread = await Contact.countDocuments({ read: false });
    
    res.json({
      success: true,
      data: messages,
      stats: {
        total,
        unread,
        page,
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

// @route   GET /api/admin/messages/:id
// @desc    Get single message
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }
    
    // Mark as read
    if (!message.read) {
      message.read = true;
      await message.save();
    }
    
    res.json({ 
      success: true, 
      data: message 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @route   PATCH /api/admin/messages/:id/read
// @desc    Mark message as read
// @access  Private
router.patch('/:id/read', authMiddleware, async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Message marked as read',
      data: message 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @route   PATCH /api/admin/messages/:id/replied
// @desc    Mark message as replied
// @access  Private
router.patch('/:id/replied', authMiddleware, async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { replied: true },
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Message marked as replied',
      data: message 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @route   DELETE /api/admin/messages/:id
// @desc    Delete message
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }
    res.json({ 
      success: true, 
      message: 'Message deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @route   DELETE /api/admin/messages
// @desc    Delete multiple messages
// @access  Private
router.delete('/', authMiddleware, async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide an array of message IDs' 
      });
    }
    
    const result = await Contact.deleteMany({ _id: { $in: ids } });
    
    res.json({ 
      success: true, 
      message: `${result.deletedCount} messages deleted successfully` 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;

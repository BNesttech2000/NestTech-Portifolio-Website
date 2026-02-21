const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');
const Certificate = require('../../models/Certificate');
const Contact = require('../../models/Contact');
const User = require('../../models/User');
const { authMiddleware } = require('../../middleware/auth');

// @route   GET /api/admin/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const [
      totalProjects,
      featuredProjects,
      totalCertificates,
      totalMessages,
      unreadMessages,
      totalUsers,
      recentProjects,
      recentMessages
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ featured: true }),
      Certificate.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ read: false }),
      User.countDocuments(),
      Project.find().sort({ createdAt: -1 }).limit(5),
      Contact.find().sort({ createdAt: -1 }).limit(5)
    ]);
    
    // Get monthly stats for chart
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = date.toLocaleString('default', { month: 'short' });
      
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const projectsCount = await Project.countDocuments({
        createdAt: { $gte: startOfMonth, $lte: endOfMonth }
      });
      
      const messagesCount = await Contact.countDocuments({
        createdAt: { $gte: startOfMonth, $lte: endOfMonth }
      });
      
      last6Months.push({
        month,
        projects: projectsCount,
        messages: messagesCount
      });
    }
    
    res.json({
      success: true,
      data: {
        overview: {
          totalProjects,
          featuredProjects,
          totalCertificates,
          totalMessages,
          unreadMessages,
          totalUsers
        },
        recent: {
          projects: recentProjects,
          messages: recentMessages
        },
        charts: {
          monthly: last6Months
        }
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @route   GET /api/admin/dashboard/activity
// @desc    Get recent activity
// @access  Private
router.get('/activity', authMiddleware, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    // Get recent projects
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('title createdAt');
    
    // Get recent certificates
    const recentCertificates = await Certificate.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('title issuer createdAt');
    
    // Get recent messages
    const recentMessages = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('name email subject read createdAt');
    
    // Combine and sort all activities
    const activities = [
      ...recentProjects.map(p => ({
        type: 'project',
        action: 'Project added',
        title: p.title,
        time: p.createdAt,
        icon: 'í³'
      })),
      ...recentCertificates.map(c => ({
        type: 'certificate',
        action: 'Certificate added',
        title: c.title,
        issuer: c.issuer,
        time: c.createdAt,
        icon: 'í¾“'
      })),
      ...recentMessages.map(m => ({
        type: 'message',
        action: 'New message',
        title: m.subject || 'No subject',
        from: m.name,
        time: m.createdAt,
        read: m.read,
        icon: 'í³§'
      }))
    ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, limit);
    
    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;

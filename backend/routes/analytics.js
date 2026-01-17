// backend/routes/analytics.js (Simplified)
const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');
const Project = require('../models/Project');
const Certificate = require('../models/Certificate');
const Contact = require('../models/contact');

// @route   POST /api/analytics/track
// @desc    Track user analytics
// @access  Public
router.post('/track', async (req, res) => {
  try {
    const { event, properties, timestamp, path, userId } = req.body;

    const analytics = new Analytics({
      event,
      properties: properties || {},
      path: path || '/',
      userId: userId || req.ip,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
      timestamp: timestamp ? new Date(timestamp) : new Date()
    });

    await analytics.save();

    res.json({
      success: true,
      message: 'Analytics tracked successfully'
    });
  } catch (error) {
    console.error('Error tracking analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Error tracking analytics'
    });
  }
});

// @route   GET /api/analytics/summary
// @desc    Get analytics summary
// @access  Public
router.get('/summary', async (req, res) => {
  try {
    const now = new Date();
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Get counts
    const [
      totalVisitors,
      visitorsLast30Days,
      totalPageViews,
      popularPages,
      projectStats,
      certificateStats,
      contactStats
    ] = await Promise.all([
      Analytics.countDocuments({ event: 'page_view' }),
      Analytics.countDocuments({ 
        event: 'page_view', 
        timestamp: { $gte: last30Days } 
      }),
      Analytics.countDocuments(),
      Analytics.aggregate([
        { $match: { event: 'page_view' } },
        { $group: { _id: '$path', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      Project.aggregate([
        { $group: { _id: null, total: { $sum: 1 }, totalViews: { $sum: '$views' } } }
      ]),
      Certificate.aggregate([
        { $group: { _id: null, total: { $sum: 1 }, totalViews: { $sum: '$views' } } }
      ]),
      Contact.aggregate([
        { $group: { _id: null, total: { $sum: 1 }, unread: { $sum: { $cond: ['$read', 0, 1] } } } }
      ])
    ]);

    // Get daily visitors for last 7 days
    const dailyVisitors = await Analytics.aggregate([
      {
        $match: {
          event: 'page_view',
          timestamp: { $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
          },
          count: { $sum: 1 },
          uniqueVisitors: { $addToSet: '$userId' }
        }
      },
      {
        $project: {
          date: '$_id',
          count: 1,
          uniqueVisitors: { $size: '$uniqueVisitors' },
          _id: 0
        }
      },
      { $sort: { date: 1 } }
    ]);

    res.json({
      success: true,
      data: {
        visitors: {
          total: totalVisitors,
          last30Days: visitorsLast30Days,
          daily: dailyVisitors
        },
        pageViews: totalPageViews,
        popularPages,
        projects: {
          total: projectStats[0]?.total || 0,
          totalViews: projectStats[0]?.totalViews || 0
        },
        certificates: {
          total: certificateStats[0]?.total || 0,
          totalViews: certificateStats[0]?.totalViews || 0
        },
        contacts: {
          total: contactStats[0]?.total || 0,
          unread: contactStats[0]?.unread || 0
        }
      }
    });
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics'
    });
  }
});

// @route   GET /api/analytics/events
// @desc    Get recent events
// @access  Public
router.get('/events', async (req, res) => {
  try {
    const { limit = 50, event } = req.query;

    const query = {};
    if (event) query.event = event;

    const events = await Analytics.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit) || 50)
      .select('-__v')
      .lean();

    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching events'
    });
  }
});

module.exports = router;
const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
    enum: ['page_view', 'project_view', 'certificate_view', 'contact_submit']
  },
  path: {
    type: String,
    required: true
  },
  userId: String,
  userAgent: String,
  ip: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Analytics = mongoose.model('Analytics', analyticsSchema);
module.exports = Analytics;

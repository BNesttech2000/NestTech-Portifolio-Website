const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Certificate title is required'],
    trim: true
  },
  issuer: {
    type: String,
    required: [true, 'Issuer is required'],
    trim: true
  },
  issueDate: {
    type: Date,
    required: [true, 'Issue date is required']
  },
  credentialId: {
    type: String,
    required: [true, 'Credential ID is required'],
    unique: true
  },
  skills: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    enum: ['webdev', 'frontend', 'backend', 'database', 'cloud', 'fundamentals'],
    default: 'webdev'
  },
  certificateUrl: String,
  verified: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Certificate = mongoose.model('Certificate', certificateSchema);
module.exports = Certificate;

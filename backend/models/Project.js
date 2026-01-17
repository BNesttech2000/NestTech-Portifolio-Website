const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  problemStatement: {
    type: String,
    required: [true, 'Problem statement is required']
  },
  solution: {
    type: String,
    required: [true, 'Solution description is required']
  },
  technologies: [{
    type: String,
    required: true
  }],
  features: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    enum: ['fullstack', 'frontend', 'backend', 'fundamentals', 'opensource'],
    required: true,
    default: 'fullstack'
  },
  githubUrl: {
    type: String,
    required: [true, 'GitHub URL is required'],
    match: [/^https?:\/\/github\.com\/.+/, 'Please provide a valid GitHub URL']
  },
  demoUrl: {
    type: String,
    match: [/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/, 'Please provide a valid URL']
  },
  liveUrl: {
    type: String,
    match: [/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/, 'Please provide a valid URL']
  },
  role: {
    type: String,
    required: [true, 'Role description is required']
  },
  challenges: [String],
  learnings: [String],
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create slug from title
projectSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;

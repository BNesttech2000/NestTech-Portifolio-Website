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
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
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
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for search and filtering
projectSchema.index({ title: 'text', description: 'text', technologies: 'text' });
projectSchema.index({ category: 1, featured: 1, status: 1 });

// Virtual for duration
projectSchema.virtual('duration').get(function() {
  if (!this.startDate) return null;
  const end = this.endDate || new Date();
  const months = Math.round((end - this.startDate) / (1000 * 60 * 60 * 24 * 30));
  return months > 0 ? `${months} month${months > 1 ? 's' : ''}` : 'Less than a month';
});

// Pre-save middleware to update slug
projectSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  this.updatedAt = Date.now();
  next();
});

// Static method to increment views
projectSchema.statics.incrementViews = async function(slug) {
  return this.findOneAndUpdate(
    { slug },
    { $inc: { views: 1 } },
    { new: true }
  );
};

// Static method for pagination and filtering
projectSchema.statics.getFilteredProjects = async function({
  category,
  status,
  featured,
  search,
  page = 1,
  limit = 10,
  sortBy = 'createdAt',
  sortOrder = 'desc'
}) {
  const query = {};
  
  if (category) query.category = category;
  if (status) query.status = status;
  if (featured !== undefined) query.featured = featured;
  if (search) {
    query.$text = { $search: search };
  }
  
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  
  const skip = (page - 1) * limit;
  
  const [projects, total] = await Promise.all([
    this.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-__v')
      .lean(),
    this.countDocuments(query)
  ]);
  
  return {
    projects,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
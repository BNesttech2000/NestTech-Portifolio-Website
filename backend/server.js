const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ====================
// MIDDLEWARE
// ====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure upload directories exist
const uploadDir = path.join(__dirname, 'uploads');
const projectsDir = path.join(uploadDir, 'projects');
const certificatesDir = path.join(uploadDir, 'certificates');

[uploadDir, projectsDir, certificatesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
});

// ====================
// MONGODB CONNECTION
// ====================
console.log('🔍 Testing MongoDB Atlas Connection...');
const safeUri = process.env.MONGODB_URI?.replace(/mongodb\+srv:\/\/([^:]+):([^@]+)/, 'mongodb+srv://$1:****');
console.log('🔗 Connection:', safeUri);

// Exit if no MongoDB connection string
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env file');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log('✅ MongoDB Atlas Connected Successfully!');
  console.log('Host:', mongoose.connection.host);
  console.log('Database:', mongoose.connection.name);
})
.catch((error) => {
  console.error('❌ MongoDB Connection Failed!');
  console.error('Error:', error.message);
  console.error('Please check your MongoDB Atlas connection string and network access');
  process.exit(1);
});

// ====================
// MODELS
// ====================

// User Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor'], default: 'admin' },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Project Model
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String, required: true },
  problemStatement: String,
  solution: String,
  technologies: [String],
  features: [String],
  category: { 
    type: String, 
    enum: ['fullstack', 'frontend', 'backend', 'fundamentals', 'opensource'],
    default: 'fullstack'
  },
  githubUrl: String,
  demoUrl: String,
  imageUrl: String,
  role: String,
  featured: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
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
  this.updatedAt = Date.now();
  next();
});

// Certificate Model
const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  issueDate: { type: Date, required: true },
  credentialId: { type: String, unique: true },
  credentialUrl: String,
  imageUrl: String,
  skills: [String],
  category: { 
    type: String, 
    enum: ['webdev', 'frontend', 'backend', 'database', 'cloud', 'fundamentals'],
    default: 'webdev'
  },
  verified: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Contact Model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: String,
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  replied: { type: Boolean, default: false },
  ip: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now }
});

// Create models
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// ====================
// AUTH MIDDLEWARE
// ====================
const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token, authorization denied' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Token is not valid' 
    });
  }
};

// ====================
// FILE UPLOAD CONFIGURATION
// ====================

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadType = req.query.type || 'general';
    let dest = uploadDir;
    
    if (uploadType === 'project') dest = projectsDir;
    if (uploadType === 'certificate') dest = certificatesDir;
    
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images and PDF files are allowed'));
  }
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

// ====================
// UPLOAD ROUTES
// ====================

// Upload single file
app.post('/api/admin/upload/file', authMiddleware, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }
    
    const fileUrl = `/uploads/${req.query.type || 'general'}/${req.file.filename}`;
    
    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        url: fileUrl,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Upload multiple files
app.post('/api/admin/upload/files', authMiddleware, upload.array('files', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No files uploaded' 
      });
    }
    
    const files = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      url: `/uploads/${req.query.type || 'general'}/${file.filename}`,
      size: file.size,
      mimetype: file.mimetype
    }));
    
    res.json({
      success: true,
      message: `${files.length} files uploaded successfully`,
      data: files
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Delete file
app.delete('/api/admin/upload/file', authMiddleware, (req, res) => {
  try {
    const { filepath } = req.body;
    const fullPath = path.join(__dirname, filepath);
    
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      res.json({ 
        success: true, 
        message: 'File deleted successfully' 
      });
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'File not found' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// ====================
// ADMIN AUTH ROUTES
// ====================

// Create default admin (only if no admin exists)
app.get('/api/admin/auth/setup', async (req, res) => {
  try {
    const adminExists = await User.findOne({ username: 'admin' });
    
    if (!adminExists) {
      const admin = new User({
        username: 'admin',
        email: 'admin@nesttech.dev',
        password: 'Admin123!',
        role: 'admin'
      });
      
      await admin.save();
      
      res.json({ 
        success: true, 
        message: '✅ Default admin created successfully',
        credentials: {
          username: 'admin',
          password: 'Admin123!'
        }
      });
    } else {
      res.json({ 
        success: true, 
        message: 'Admin user already exists' 
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin login
app.post('/api/admin/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    user.lastLogin = new Date();
    await user.save();
    
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get current user
app.get('/api/admin/auth/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ====================
// ADMIN PROJECT ROUTES
// ====================

// Get all projects (with pagination)
app.get('/api/admin/projects', authMiddleware, async (req, res) => {
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
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single project
app.get('/api/admin/projects/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create project
app.post('/api/admin/projects', authMiddleware, async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    await project.save();
    
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update project
app.put('/api/admin/projects/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete project
app.delete('/api/admin/projects/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    
    // Delete associated image if exists
    if (project.imageUrl) {
      const imagePath = path.join(__dirname, project.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Toggle featured
app.patch('/api/admin/projects/:id/feature', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    project.featured = !project.featured;
    await project.save();
    
    res.json({ success: true, featured: project.featured });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ====================
// ADMIN CERTIFICATE ROUTES
// ====================

// Get all certificates (with pagination)
app.get('/api/admin/certificates', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const certificates = await Certificate.find()
      .sort({ issueDate: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Certificate.countDocuments();
    
    res.json({ 
      success: true, 
      data: certificates,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single certificate
app.get('/api/admin/certificates/:id', authMiddleware, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }
    res.json({ success: true, data: certificate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create certificate
app.post('/api/admin/certificates', authMiddleware, async (req, res) => {
  try {
    const certificate = new Certificate(req.body);
    await certificate.save();
    
    res.status(201).json({ success: true, data: certificate });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update certificate
app.put('/api/admin/certificates/:id', authMiddleware, async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }
    
    res.json({ success: true, data: certificate });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete certificate
app.delete('/api/admin/certificates/:id', authMiddleware, async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }
    
    // Delete associated image if exists
    if (certificate.imageUrl) {
      const imagePath = path.join(__dirname, certificate.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    res.json({ success: true, message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ====================
// ADMIN MESSAGE ROUTES
// ====================

// Get all messages (with pagination)
app.get('/api/admin/messages', authMiddleware, async (req, res) => {
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
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        unread
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single message
app.get('/api/admin/messages/:id', authMiddleware, async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    
    if (!message.read) {
      message.read = true;
      await message.save();
    }
    
    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Mark as read
app.patch('/api/admin/messages/:id/read', authMiddleware, async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Mark as replied
app.patch('/api/admin/messages/:id/replied', authMiddleware, async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { replied: true },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete message
app.delete('/api/admin/messages/:id', authMiddleware, async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ====================
// ADMIN DASHBOARD ROUTES
// ====================

// Get dashboard stats
app.get('/api/admin/dashboard/stats', authMiddleware, async (req, res) => {
  try {
    const [
      totalProjects,
      featuredProjects,
      totalCertificates,
      totalMessages,
      unreadMessages
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ featured: true }),
      Certificate.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ read: false })
    ]);
    
    // Get recent items
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title createdAt');
    
    const recentMessages = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name subject read createdAt');
    
    res.json({
      success: true,
      data: {
        stats: {
          projects: { total: totalProjects, featured: featuredProjects },
          certificates: { total: totalCertificates },
          messages: { total: totalMessages, unread: unreadMessages }
        },
        recent: {
          projects: recentProjects,
          messages: recentMessages
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ====================
// PUBLIC ROUTES
// ====================

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'NestTech Portfolio API',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Get all projects (public)
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get featured projects (public)
app.get('/api/projects/featured', async (req, res) => {
  try {
    const featuredProjects = await Project.find({ featured: true }).limit(6);
    res.json({ success: true, data: featuredProjects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single project by slug (public)
app.get('/api/projects/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    
    // Increment views
    project.views += 1;
    await project.save();
    
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all certificates (public)
app.get('/api/certificates', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ issueDate: -1 });
    res.json({ success: true, data: certificates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get featured certificates (public)
app.get('/api/certificates/featured', async (req, res) => {
  try {
    const featured = await Certificate.find({ featured: true }).limit(6);
    res.json({ success: true, data: featured });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Contact form submission (public)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });
    
    await contact.save();
    
    res.json({ 
      success: true, 
      message: 'Thank you for your message! I will get back to you within 24 hours.'
    });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ====================
// START SERVER
// ====================
app.listen(PORT, () => {
  console.log(`\n🚀 NestTech Portfolio Backend`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\n📁 Upload Directories:`);
  console.log(`   📂 Uploads: ${uploadDir}`);
  console.log(`   📂 Projects: ${projectsDir}`);
  console.log(`   📂 Certificates: ${certificatesDir}`);
  
  console.log(`\n🔗 Public API Endpoints:`);
  console.log(`   GET  /health`);
  console.log(`   GET  /api/projects`);
  console.log(`   GET  /api/projects/featured`);
  console.log(`   GET  /api/projects/:slug`);
  console.log(`   GET  /api/certificates`);
  console.log(`   GET  /api/certificates/featured`);
  console.log(`   POST /api/contact`);
  
  console.log(`\n🔒 Admin API Endpoints (Requires Authentication):`);
  console.log(`   POST /api/admin/auth/login`);
  console.log(`   GET  /api/admin/dashboard/stats`);
  console.log(`   CRUD /api/admin/projects`);
  console.log(`   CRUD /api/admin/certificates`);
  console.log(`   CRUD /api/admin/messages`);
  console.log(`   POST /api/admin/upload/file`);
  
  console.log(`\n✅ Server running: http://localhost:${PORT}`);
  console.log(`✅ MongoDB: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Not connected'}`);
});
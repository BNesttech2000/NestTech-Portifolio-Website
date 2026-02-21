// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ====================
// // MONGODB CONNECTION
// // ====================
// console.log('��� Testing MongoDB Atlas Connection...');
// const safeUri = process.env.MONGODB_URI?.replace(/mongodb\+srv:\/\/([^:]+):([^@]+)/, 'mongodb+srv://$1:****');
// console.log('��� Connection:', safeUri);

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 5000
// })
// .then(() => {
//   console.log('✅ MongoDB Atlas Connected Successfully!');
//   console.log('Host:', mongoose.connection.host);
//   console.log('Database:', mongoose.connection.name);
// })
// .catch((error) => {
//   console.log('❌ MongoDB Connection Failed!');
//   console.log('Error:', error.message);
//   console.log('⚠️  Using in-memory data instead of MongoDB');
// });

// // ====================
// // MONGODB MODELS
// // ====================
// const projectSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   technologies: [String],
//   category: String,
//   githubUrl: String,
//   demoUrl: String,
//   featured: Boolean,
//   createdAt: { type: Date, default: Date.now }
// });

// const certificateSchema = new mongoose.Schema({
//   title: String,
//   issuer: String,
//   issueDate: String,
//   skills: [String],
//   category: String,
//   verified: Boolean,
//   createdAt: { type: Date, default: Date.now }
// });

// const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
// const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);

// // ====================
// // SAMPLE DATA (Fallback)
// // ====================
// const sampleProjects = [
//   {
//     id: 1,
//     title: "SkyBook Airlines Booking System",
//     description: "Comprehensive airline management system with real-time seat booking and automated ticketing",
//     technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
//     category: "fullstack",
//     githubUrl: "https://github.com/nesttech/airline-booking",
//     demoUrl: "https://skybook.nesttech.dev",
//     featured: true
//   },
//   {
//     id: 2,
//     title: "CineMax Cinema Booking System",
//     description: "Interactive cinema booking platform with seat selection and QR ticket verification",
//     technologies: ["React", "Node.js", "WebSockets", "Stripe API"],
//     category: "fullstack",
//     githubUrl: "https://github.com/nesttech/cinema-booking",
//     demoUrl: "https://cinemax.nesttech.dev",
//     featured: true
//   }
// ];

// const sampleCertificates = [
//   {
//     id: 1,
//     title: "Full Stack Web Development",
//     issuer: "Coursera",
//     issueDate: "2023",
//     skills: ["React", "Node.js", "MongoDB", "Express"],
//     category: "webdev",
//     verified: true
//   },
//   {
//     id: 2,
//     title: "React Advanced Patterns",
//     issuer: "Frontend Masters",
//     issueDate: "2023",
//     skills: ["React", "Hooks", "Performance", "Testing"],
//     category: "frontend",
//     verified: true
//   }
// ];

// // ====================
// // MIDDLEWARE
// // ====================
// app.use(cors());
// app.use(express.json());

// // ====================
// // ROUTES
// // ====================

// // Health check
// app.get('/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     service: 'NestTech Portfolio API',
//     mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
//     timestamp: new Date().toISOString()
//   });
// });

// app.get('/api/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     service: 'NestTech Portfolio API',
//     mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
//     timestamp: new Date().toISOString()
//   });
// });

// // Seed database with sample data
// app.get('/api/seed', async (req, res) => {
//   try {
//     const isConnected = mongoose.connection.readyState === 1;
    
//     if (isConnected) {
//       // Clear existing data
//       await Project.deleteMany({});
//       await Certificate.deleteMany({});
      
//       // Insert sample data
//       await Project.insertMany(sampleProjects.map(({ id, ...rest }) => rest));
//       await Certificate.insertMany(sampleCertificates.map(({ id, ...rest }) => rest));
      
//       res.json({ 
//         success: true, 
//         message: 'Database seeded with sample data!',
//         source: 'MongoDB Atlas'
//       });
//     } else {
//       res.json({ 
//         success: true, 
//         message: 'Using in-memory data (MongoDB not connected)',
//         source: 'In-memory'
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error seeding database',
//       error: error.message 
//     });
//   }
// });

// // Get all projects
// app.get('/api/projects', async (req, res) => {
//   try {
//     const isConnected = mongoose.connection.readyState === 1;
    
//     if (isConnected) {
//       const projects = await Project.find().sort({ createdAt: -1 });
//       res.json({ success: true, data: projects, source: 'MongoDB Atlas' });
//     } else {
//       res.json({ success: true, data: sampleProjects, source: 'In-memory' });
//     }
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error fetching projects',
//       error: error.message 
//     });
//   }
// });

// // Get featured projects
// app.get('/api/projects/featured', async (req, res) => {
//   try {
//     const isConnected = mongoose.connection.readyState === 1;
    
//     if (isConnected) {
//       const featuredProjects = await Project.find({ featured: true }).limit(3);
//       res.json({ success: true, data: featuredProjects, source: 'MongoDB Atlas' });
//     } else {
//       const featured = sampleProjects.filter(p => p.featured);
//       res.json({ success: true, data: featured, source: 'In-memory' });
//     }
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error fetching featured projects',
//       error: error.message 
//     });
//   }
// });

// // Get all certificates
// app.get('/api/certificates', async (req, res) => {
//   try {
//     const isConnected = mongoose.connection.readyState === 1;
    
//     if (isConnected) {
//       const certificates = await Certificate.find().sort({ issueDate: -1 });
//       res.json({ success: true, data: certificates, source: 'MongoDB Atlas' });
//     } else {
//       res.json({ success: true, data: sampleCertificates, source: 'In-memory' });
//     }
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error fetching certificates',
//       error: error.message 
//     });
//   }
// });

// // Contact form submission
// app.post('/api/contact', async (req, res) => {
//   try {
//     const { name, email, message, subject = 'Portfolio Inquiry' } = req.body;
    
//     console.log('��� Contact Form Submission:', { 
//       name, 
//       email, 
//       subject, 
//       message: message.substring(0, 100) + '...',
//       timestamp: new Date().toISOString()
//     });
    
//     res.json({ 
//       success: true, 
//       message: 'Thank you for your message! I will get back to you within 24 hours.',
//       data: { name, email, subject }
//     });
    
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error processing contact form',
//       error: error.message 
//     });
//   }
// });

// // ====================
// // START SERVER
// // ====================
// app.listen(PORT, () => {
//   console.log(`\n��� NestTech Portfolio Backend`);
//   console.log(`��� Port: ${PORT}`);
//   console.log(`��� Environment: ${process.env.NODE_ENV || 'development'}`);
//   console.log(`\n��� API Endpoints:`);
//   console.log(`   GET  /health                     - Health check`);
//   console.log(`   GET  /api/health                 - Health check (API version)`);
//   console.log(`   GET  /api/seed                   - Seed database`);
//   console.log(`   GET  /api/projects               - All projects`);
//   console.log(`   GET  /api/projects/featured      - Featured projects`);
//   console.log(`   GET  /api/certificates           - All certificates`);
//   console.log(`   POST /api/contact                - Submit contact form`);
//   console.log(`\n✅ Server running: http://localhost:${PORT}`);
//   console.log(`✅ MongoDB: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Not connected'}`);
// });







const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ====================
// MIDDLEWARE
// ====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====================
// MONGODB CONNECTION
// ====================
console.log('🔍 Testing MongoDB Atlas Connection...');
const safeUri = process.env.MONGODB_URI?.replace(/mongodb\+srv:\/\/([^:]+):([^@]+)/, 'mongodb+srv://$1:****');
console.log('🔗 Connection:', safeUri);

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
  console.log('❌ MongoDB Connection Failed!');
  console.log('Error:', error.message);
  console.log('⚠️  Using in-memory data instead of MongoDB');
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
  description: String,
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

// Certificate Model
const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  issueDate: Date,
  credentialId: String,
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
// SAMPLE DATA (Fallback)
// ====================
const sampleProjects = [
  {
    title: "SkyBook Airlines Booking System",
    description: "Comprehensive airline management system with real-time seat booking and automated ticketing",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
    category: "fullstack",
    githubUrl: "https://github.com/nesttech/airline-booking",
    demoUrl: "https://skybook.nesttech.dev",
    featured: true
  },
  {
    title: "CineMax Cinema Booking System",
    description: "Interactive cinema booking platform with seat selection and QR ticket verification",
    technologies: ["React", "Node.js", "WebSockets", "Stripe API"],
    category: "fullstack",
    githubUrl: "https://github.com/nesttech/cinema-booking",
    demoUrl: "https://cinemax.nesttech.dev",
    featured: true
  }
];

const sampleCertificates = [
  {
    title: "Full Stack Web Development",
    issuer: "Coursera",
    issueDate: "2023",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    category: "webdev",
    verified: true
  },
  {
    title: "React Advanced Patterns",
    issuer: "Frontend Masters",
    issueDate: "2023",
    skills: ["React", "Hooks", "Performance", "Testing"],
    category: "frontend",
    verified: true
  }
];

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
// ADMIN ROUTES
// ====================

// Create default admin
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

// Get all projects
app.get('/api/admin/projects', authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create project
app.post('/api/admin/projects', authMiddleware, async (req, res) => {
  try {
    const project = new Project(req.body);
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
      { new: true }
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

// Get all certificates
app.get('/api/admin/certificates', authMiddleware, async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ issueDate: -1 });
    res.json({ success: true, data: certificates });
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
      { new: true }
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
    res.json({ success: true, message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ====================
// ADMIN MESSAGE ROUTES
// ====================

// Get all messages
app.get('/api/admin/messages', authMiddleware, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    const unreadCount = await Contact.countDocuments({ read: false });
    
    res.json({ 
      success: true, 
      data: messages,
      stats: {
        total: messages.length,
        unread: unreadCount
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
    
    res.json({
      success: true,
      data: {
        projects: { total: totalProjects, featured: featuredProjects },
        certificates: { total: totalCertificates },
        messages: { total: totalMessages, unread: unreadMessages }
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

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'NestTech Portfolio API',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Seed database
app.get('/api/seed', async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    
    if (isConnected) {
      await Project.deleteMany({});
      await Certificate.deleteMany({});
      
      await Project.insertMany(sampleProjects);
      await Certificate.insertMany(sampleCertificates);
      
      res.json({ 
        success: true, 
        message: 'Database seeded with sample data!',
        source: 'MongoDB Atlas'
      });
    } else {
      res.json({ 
        success: true, 
        message: 'Using in-memory data (MongoDB not connected)',
        source: 'In-memory'
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all projects (public)
app.get('/api/projects', async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    
    if (isConnected) {
      const projects = await Project.find().sort({ createdAt: -1 });
      res.json({ success: true, data: projects });
    } else {
      res.json({ success: true, data: sampleProjects });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get featured projects (public)
app.get('/api/projects/featured', async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    
    if (isConnected) {
      const featuredProjects = await Project.find({ featured: true }).limit(3);
      res.json({ success: true, data: featuredProjects });
    } else {
      const featured = sampleProjects.filter(p => p.featured);
      res.json({ success: true, data: featured });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all certificates (public)
app.get('/api/certificates', async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    
    if (isConnected) {
      const certificates = await Certificate.find().sort({ issueDate: -1 });
      res.json({ success: true, data: certificates });
    } else {
      res.json({ success: true, data: sampleCertificates });
    }
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
    
    console.log('📧 New contact form submission:', { name, email, subject });
    
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
  console.log(`\n🔗 Public API Endpoints:`);
  console.log(`   GET  /health`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/seed`);
  console.log(`   GET  /api/projects`);
  console.log(`   GET  /api/projects/featured`);
  console.log(`   GET  /api/certificates`);
  console.log(`   POST /api/contact`);
  
  console.log(`\n🔒 Admin API Endpoints:`);
  console.log(`   GET  /api/admin/auth/setup`);
  console.log(`   POST /api/admin/auth/login`);
  console.log(`   GET  /api/admin/auth/me`);
  console.log(`   GET  /api/admin/dashboard/stats`);
  console.log(`   GET  /api/admin/projects`);
  console.log(`   POST /api/admin/projects`);
  console.log(`   PUT  /api/admin/projects/:id`);
  console.log(`   DELETE /api/admin/projects/:id`);
  console.log(`   GET  /api/admin/certificates`);
  console.log(`   POST /api/admin/certificates`);
  console.log(`   PUT  /api/admin/certificates/:id`);
  console.log(`   DELETE /api/admin/certificates/:id`);
  console.log(`   GET  /api/admin/messages`);
  console.log(`   PATCH /api/admin/messages/:id/read`);
  console.log(`   PATCH /api/admin/messages/:id/replied`);
  console.log(`   DELETE /api/admin/messages/:id`);
  
  console.log(`\n✅ Server running: http://localhost:${PORT}`);
  console.log(`✅ MongoDB: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Not connected'}`);
});
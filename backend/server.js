const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ====================
// MONGODB CONNECTION
// ====================
console.log('Ì¥ç Testing MongoDB Atlas Connection...');
const safeUri = process.env.MONGODB_URI?.replace(/mongodb\+srv:\/\/([^:]+):([^@]+)/, 'mongodb+srv://$1:****');
console.log('Ì¥ó Connection:', safeUri);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log('‚úÖ MongoDB Atlas Connected Successfully!');
  console.log('Host:', mongoose.connection.host);
  console.log('Database:', mongoose.connection.name);
})
.catch((error) => {
  console.log('‚ùå MongoDB Connection Failed!');
  console.log('Error:', error.message);
  console.log('‚ö†Ô∏è  Using in-memory data instead of MongoDB');
});

// ====================
// MONGODB MODELS
// ====================
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  category: String,
  githubUrl: String,
  demoUrl: String,
  featured: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const certificateSchema = new mongoose.Schema({
  title: String,
  issuer: String,
  issueDate: String,
  skills: [String],
  category: String,
  verified: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);

// ====================
// SAMPLE DATA (Fallback)
// ====================
const sampleProjects = [
  {
    id: 1,
    title: "SkyBook Airlines Booking System",
    description: "Comprehensive airline management system with real-time seat booking and automated ticketing",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
    category: "fullstack",
    githubUrl: "https://github.com/nesttech/airline-booking",
    demoUrl: "https://skybook.nesttech.dev",
    featured: true
  },
  {
    id: 2,
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
    id: 1,
    title: "Full Stack Web Development",
    issuer: "Coursera",
    issueDate: "2023",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    category: "webdev",
    verified: true
  },
  {
    id: 2,
    title: "React Advanced Patterns",
    issuer: "Frontend Masters",
    issueDate: "2023",
    skills: ["React", "Hooks", "Performance", "Testing"],
    category: "frontend",
    verified: true
  }
];

// ====================
// MIDDLEWARE
// ====================
app.use(cors());
app.use(express.json());

// ====================
// ROUTES
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

// Seed database with sample data
app.get('/api/seed', async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    
    if (isConnected) {
      // Clear existing data
      await Project.deleteMany({});
      await Certificate.deleteMany({});
      
      // Insert sample data
      await Project.insertMany(sampleProjects.map(({ id, ...rest }) => rest));
      await Certificate.insertMany(sampleCertificates.map(({ id, ...rest }) => rest));
      
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
    res.status(500).json({ 
      success: false, 
      message: 'Error seeding database',
      error: error.message 
    });
  }
});

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    
    if (isConnected) {
      const projects = await Project.find().sort({ createdAt: -1 });
      res.json({ success: true, data: projects, source: 'MongoDB Atlas' });
    } else {
      res.json({ success: true, data: sampleProjects, source: 'In-memory' });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching projects',
      error: error.message 
    });
  }
});

// Get featured projects
app.get('/api/projects/featured', async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    
    if (isConnected) {
      const featuredProjects = await Project.find({ featured: true }).limit(3);
      res.json({ success: true, data: featuredProjects, source: 'MongoDB Atlas' });
    } else {
      const featured = sampleProjects.filter(p => p.featured);
      res.json({ success: true, data: featured, source: 'In-memory' });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching featured projects',
      error: error.message 
    });
  }
});

// Get all certificates
app.get('/api/certificates', async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    
    if (isConnected) {
      const certificates = await Certificate.find().sort({ issueDate: -1 });
      res.json({ success: true, data: certificates, source: 'MongoDB Atlas' });
    } else {
      res.json({ success: true, data: sampleCertificates, source: 'In-memory' });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching certificates',
      error: error.message 
    });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, subject = 'Portfolio Inquiry' } = req.body;
    
    console.log('Ì≥ß Contact Form Submission:', { 
      name, 
      email, 
      subject, 
      message: message.substring(0, 100) + '...',
      timestamp: new Date().toISOString()
    });
    
    res.json({ 
      success: true, 
      message: 'Thank you for your message! I will get back to you within 24 hours.',
      data: { name, email, subject }
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error processing contact form',
      error: error.message 
    });
  }
});

// ====================
// START SERVER
// ====================
app.listen(PORT, () => {
  console.log(`\nÌ∫Ä NestTech Portfolio Backend`);
  console.log(`Ì≥° Port: ${PORT}`);
  console.log(`Ìºê Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\nÌ¥ó API Endpoints:`);
  console.log(`   GET  /health                     - Health check`);
  console.log(`   GET  /api/health                 - Health check (API version)`);
  console.log(`   GET  /api/seed                   - Seed database`);
  console.log(`   GET  /api/projects               - All projects`);
  console.log(`   GET  /api/projects/featured      - Featured projects`);
  console.log(`   GET  /api/certificates           - All certificates`);
  console.log(`   POST /api/contact                - Submit contact form`);
  console.log(`\n‚úÖ Server running: http://localhost:${PORT}`);
  console.log(`‚úÖ MongoDB: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Not connected'}`);
});

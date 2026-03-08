const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authMiddleware } = require('../../middleware/auth');

// Ensure upload directories exist
const uploadDir = path.join(__dirname, '../../uploads');
const projectsDir = path.join(uploadDir, 'projects');
const certificatesDir = path.join(uploadDir, 'certificates');

[uploadDir, projectsDir, certificatesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine folder based on upload type
    const uploadType = req.query.type || 'general';
    let dest = uploadDir;
    
    if (uploadType === 'project') dest = projectsDir;
    if (uploadType === 'certificate') dest = certificatesDir;
    
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    // Create unique filename
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

// Upload single file
router.post('/file', authMiddleware, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }
    
    // Generate URL for the uploaded file
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
router.post('/files', authMiddleware, upload.array('files', 5), (req, res) => {
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
router.delete('/file', authMiddleware, (req, res) => {
  try {
    const { filepath } = req.body;
    const fullPath = path.join(__dirname, '../../', filepath);
    
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

module.exports = router;

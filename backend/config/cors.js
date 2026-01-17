const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'https://nesttech.dev',
  'https://www.nesttech.dev',
  'https://portfolio.nesttech.dev'
];

if (process.env.NODE_ENV === 'development') {
  allowedOrigins.push('http://localhost:*');
}

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || 
        process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Allow-Headers'
  ],
  exposedHeaders: [
    'Content-Length',
    'Content-Type',
    'Authorization',
    'X-Total-Count'
  ],
  maxAge: 86400 // 24 hours
};

module.exports = cors(corsOptions);
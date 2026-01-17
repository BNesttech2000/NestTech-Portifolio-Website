# 🚀 NestTech Portfolio

A modern, professional portfolio website built with React, TailwindCSS, and Node.js. This portfolio showcases projects, skills, certificates, and experience in an elegant, responsive design.

## ✨ Features

### Frontend
- ⚛️ **React 18** with functional components and hooks
- 🎨 **TailwindCSS** for utility-first styling
- 🎯 **Fully Responsive** design for all devices
- ✨ **Smooth Animations** with Framer Motion and custom CSS
- 🌙 **Dark/Light Mode** toggle
- 📱 **Mobile-First** approach
- 🔍 **SEO Optimized** with meta tags and structured data
- ⚡ **Fast Performance** with code splitting and lazy loading

### Backend
- 🛠️ **Node.js & Express** REST API
- 🍃 **MongoDB** with Mongoose ODM
- 🔐 **JWT Authentication** (optional)
- 📧 **Email Integration** with nodemailer
- 📊 **Analytics Tracking**
- 🐳 **Docker Support**
- 🧪 **Input Validation** with express-validator

## 🏗️ Project Structure

nesttech-portfolio/
├── frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── App.js # Main app component
│ │ └── index.js # Entry point
│ ├── public/ # Static files
│ └── package.json
├── backend/ # Node.js backend
│ ├── models/ # MongoDB models
│ ├── routes/ # API routes
│ ├── controllers/ # Route controllers
│ ├── middleware/ # Custom middleware
│ ├── config/ # Configuration files
│ └── server.js # Server entry point
├── docker-compose.yml # Docker configuration
└── README.md # This file


## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB (local or Atlas)
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/nesttech/nesttech-portfolio.git
cd nesttech-portfolio

    Setup Backend

bash

cd backend
cp .env.example .env
# Edit .env with your configurations
npm install
npm run dev

    Setup Frontend

bash

cd ../frontend
cp .env.example .env
npm install
npm start

    Access the application

    Frontend: http://localhost:3000

    Backend API: http://localhost:5000/api

    API Health: http://localhost:5000/health

Docker Development
bash

# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

📦 Environment Variables
Backend (.env)
env

NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nesttech
JWT_SECRET=your-secret-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@nesttech.dev
CORS_ORIGIN=http://localhost:3000

Frontend (.env)
env

REACT_APP_API_URL=http://localhost:5000
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key

🛠️ Available Scripts
Frontend
bash

npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run lint       # Run ESLint

Backend
bash

npm run dev        # Start development server with nodemon
npm start          # Start production server
npm test           # Run tests
npm run seed       # Seed database with sample data
npm run backup     # Create database backup

📁 API Endpoints
Projects

    GET /api/projects - Get all projects with filtering

    GET /api/projects/featured - Get featured projects

    GET /api/projects/:slug - Get project by slug

    POST /api/projects - Create new project (admin)

    PUT /api/projects/:id - Update project (admin)

    DELETE /api/projects/:id - Delete project (admin)

Certificates

    GET /api/certificates - Get all certificates

    GET /api/certificates/featured - Get featured certificates

    GET /api/certificates/:slug - Get certificate by slug

Contact

    POST /api/contact - Submit contact form

    GET /api/contact/stats - Get contact statistics (admin)

Analytics

    POST /api/analytics/track - Track user events

    GET /api/analytics/summary - Get analytics summary (admin)

🐳 Docker Deployment
Production with Docker Compose
bash

# Build images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

Kubernetes (Optional)
bash

kubectl apply -f k8s/

🌐 Deployment
Frontend (Vercel/Netlify)

    Connect your GitHub repository

    Set build command: npm run build

    Set output directory: build

    Add environment variables

Backend (Render/Railway)

    Create new web service

    Connect your repository

    Set build command: npm install && npm run build

    Set start command: npm start

    Add environment variables

    Add MongoDB database

📊 Performance Optimization
Frontend

    ✅ Code splitting with React.lazy()

    ✅ Image optimization with lazy loading

    ✅ CSS minification and PurgeCSS

    ✅ Service worker for caching

    ✅ Brotli/Gzip compression

Backend

    ✅ Database indexing

    ✅ Query optimization

    ✅ Response caching with Redis

    ✅ Rate limiting

    ✅ Compression middleware

🔒 Security
Implemented Security Measures

    ✅ Helmet.js for security headers

    ✅ CORS configuration

    ✅ Rate limiting

    ✅ Input validation and sanitization

    ✅ SQL/NoSQL injection prevention

    ✅ XSS protection

    ✅ CSRF protection

    ✅ JWT token validation

Recommended Security Practices

    Use HTTPS in production

    Regular dependency updates

    Database backup automation

    Security headers configuration

    Regular security audits

📈 Analytics & Monitoring
Built-in Analytics

    Page views tracking

    Project views tracking

    Contact form submissions

    User behavior analytics

Integration Options

    Google Analytics

    Hotjar for heatmaps

    Sentry for error tracking

    LogRocket for session replay

🤝 Contributing

    Fork the repository

    Create a feature branch

    Commit your changes

    Push to the branch

    Open a Pull Request

Commit Guidelines

    Use conventional commits

    Write meaningful commit messages

    Include issue references

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
👨‍💻 Author

NestTech

    Website: nesttech.dev

    GitHub: @nesttech

    LinkedIn: NestTech

🙏 Acknowledgments

    React - UI library

    TailwindCSS - CSS framework

    Node.js - Runtime environment

    MongoDB - Database

    Express - Web framework

📞 Support

For support, email hello@nesttech.dev or open an issue on GitHub.

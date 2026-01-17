const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const Certificate = require('./models/Certificate');
const Contact = require('./models/contact');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nesttech');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Project.deleteMany({}),
      Certificate.deleteMany({}),
      Contact.deleteMany({})
    ]);
    console.log('🗑️  Cleared existing data');

    // Seed Projects
    const projects = [
      {
        title: "SkyBook Airlines Booking System",
        slug: "skybook-airlines-booking-system",
        description: "Comprehensive airline management system with real-time seat booking and automated ticketing",
        problemStatement: "Manual flight booking processes causing inefficiency and errors in traditional airline systems",
        solution: "Developed a full-stack web application with real-time seat availability, automated notifications, and secure payment processing",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT", "Stripe API"],
        features: [
          "Real-time seat booking with conflict prevention",
          "Automated email and SMS notifications",
          "Admin analytics dashboard",
          "Secure payment integration with multiple gateways",
          "Flight search and filtering system"
        ],
        category: "fullstack",
        githubUrl: "https://github.com/nesttech/airline-booking",
        demoUrl: "https://skybook.nesttech.dev",
        role: "Full-Stack Developer & System Architect",
        challenges: [
          "Implementing real-time seat availability updates",
          "Handling concurrent bookings efficiently",
          "Ensuring payment security and compliance"
        ],
        learnings: [
          "Real-time web socket implementation",
          "Payment gateway integration best practices",
          "Database optimization for high-concurrency scenarios"
        ],
        startDate: new Date("2023-01-15"),
        endDate: new Date("2023-04-30"),
        status: "completed",
        featured: true,
        views: 1245
      },
      {
        title: "CineMax Cinema Booking System",
        slug: "cinemax-cinema-booking-system",
        description: "Interactive cinema booking platform with seat selection and QR ticket verification",
        problemStatement: "Long queues and inefficient seat selection process in traditional movie theaters",
        solution: "Created a user-friendly platform with interactive seat maps, multiple payment options, and digital tickets",
        technologies: ["React", "Node.js", "MongoDB", "WebSockets", "QR Code", "Redis"],
        features: [
          "Interactive seat selection with real-time updates",
          "Multiple payment gateway integration",
          "QR-based ticket verification",
          "Movie recommendation engine",
          "Admin dashboard for theater management"
        ],
        category: "fullstack",
        githubUrl: "https://github.com/nesttech/cinema-booking",
        demoUrl: "https://cinemax.nesttech.dev",
        role: "Full-Stack Developer",
        startDate: new Date("2023-03-01"),
        endDate: new Date("2023-06-15"),
        status: "completed",
        featured: true,
        views: 987
      }
    ];

    await Project.insertMany(projects);
    console.log(`✅ Seeded ${projects.length} projects`);

    // Seed Certificates
    const certificates = [
      {
        title: "Full Stack Web Development Specialization",
        slug: "full-stack-web-development-specialization",
        issuer: "Coursera",
        issuerLogo: "https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg",
        issueDate: new Date("2023-06-15"),
        credentialId: "CERT-789F4G2H",
        credentialUrl: "https://coursera.org/verify/789F4G2H",
        certificateUrl: "/certificates/fullstack.pdf",
        skills: ["React", "Node.js", "MongoDB", "Express", "REST APIs", "Authentication"],
        category: "webdev",
        description: "Comprehensive full-stack development certification covering modern web technologies",
        verified: true,
        priority: 9,
        featured: true
      },
      {
        title: "React Advanced Patterns",
        slug: "react-advanced-patterns",
        issuer: "Frontend Masters",
        issueDate: new Date("2023-04-20"),
        credentialId: "FEM-456A7B8C",
        skills: ["React", "Hooks", "Performance", "Testing", "State Management"],
        category: "frontend",
        verified: true,
        priority: 8
      }
    ];

    await Certificate.insertMany(certificates);
    console.log(`✅ Seeded ${certificates.length} certificates`);

    // Seed Sample Contacts
    const contacts = [
      {
        name: "John Smith",
        email: "john@techcompany.com",
        subject: "Full-Stack Developer Position",
        message: "I came across your portfolio and was impressed with your projects. We have an opening for a senior full-stack developer position. Would you be interested in discussing this opportunity?",
        ip: "192.168.1.100",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        priority: "high",
        tags: ["job"],
        read: false,
        responded: false
      }
    ];

    await Contact.insertMany(contacts);
    console.log(`✅ Seeded ${contacts.length} sample contacts`);

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedData();
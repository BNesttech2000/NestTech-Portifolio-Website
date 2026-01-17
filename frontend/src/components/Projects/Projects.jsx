// frontend/src/components/Projects/Projects.jsx
import React, { useState } from 'react';
import { 
  ExternalLink, Github, Eye, Code, Server, 
  Database, Shield, Zap, Users, Lock 
} from 'lucide-react';
import { Dialog } from '@headlessui/react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: "SkyBook Airlines Booking System",
      category: "fullstack",
      problem: "Manual flight booking processes causing inefficiency and errors.",
      solution: "Developed a comprehensive airline management system with real-time seat availability, automated ticketing, and admin dashboard.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Socket.io"],
      role: "Full-Stack Developer & System Architect",
      features: [
        "Real-time seat booking with conflict prevention",
        "Automated email/SMS notifications",
        "Admin analytics dashboard",
        "Secure payment integration"
      ],
      github: "https://github.com/nesttech/airline-booking",
      demo: "https://skybook.nesttech.dev",
      image: "/projects/airline-system.jpg",
      icon: Users,
      color: "text-blue-500"
    },
    {
      id: 2,
      title: "Campus Hostel Management System",
      category: "fullstack",
      problem: "Inefficient hostel allocation and maintenance tracking in educational institutions.",
      solution: "Digital platform automating room allocation, maintenance requests, and fee management.",
      technologies: ["React", "Node.js", "MySQL", "Express", "Redux"],
      role: "Lead Developer & Database Designer",
      features: [
        "Automated room allocation algorithm",
        "Maintenance request tracking system",
        "Fee management with payment history",
        "Role-based access control"
      ],
      github: "https://github.com/nesttech/hostel-management",
      demo: null,
      image: "/projects/hostel-system.jpg",
      icon: Database,
      color: "text-green-500"
    },
    {
      id: 3,
      title: "CineMax Cinema Booking System",
      category: "fullstack",
      problem: "Long queues and manual seat selection at movie theaters.",
      solution: "Interactive cinema booking platform with seat selection, payment integration, and QR tickets.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API", "WebSockets"],
      role: "Full-Stack Developer",
      features: [
        "Interactive seat selection with real-time updates",
        "Multiple payment gateway integration",
        "QR-based ticket verification",
        "Movie recommendation engine"
      ],
      github: "https://github.com/nesttech/cinema-booking",
      demo: "https://cinemax.nesttech.dev",
      image: "/projects/cinema-system.jpg",
      icon: Eye,
      color: "text-purple-500"
    },
    {
      id: 4,
      title: "Secure Auth System",
      category: "backend",
      problem: "Need for secure, scalable authentication across multiple applications.",
      solution: "Comprehensive authentication system with multi-factor authentication, role-based access, and audit logging.",
      technologies: ["Node.js", "Express", "JWT", "Redis", "PostgreSQL"],
      role: "Backend Developer & Security Specialist",
      features: [
        "JWT-based authentication with refresh tokens",
        "Two-factor authentication support",
        "Role-based access control",
        "Comprehensive audit logging"
      ],
      github: "https://github.com/nesttech/auth-system",
      demo: null,
      image: "/projects/auth-system.jpg",
      icon: Lock,
      color: "text-red-500"
    },
    {
      id: 5,
      title: "Algorithm Visualization Platform",
      category: "frontend",
      problem: "Difficulty understanding complex algorithms through static content.",
      solution: "Interactive visualization tool demonstrating sorting, searching, and graph algorithms.",
      technologies: ["React", "D3.js", "TypeScript", "Tailwind CSS"],
      role: "Frontend Developer & Algorithm Specialist",
      features: [
        "Step-by-step algorithm visualization",
        "Speed and data size controls",
        "Code explanation alongside visualization",
        "Multiple algorithm categories"
      ],
      github: "https://github.com/nesttech/algo-visualizer",
      demo: "https://algo.nesttech.dev",
      image: "/projects/algo-visualizer.jpg",
      icon: Zap,
      color: "text-yellow-500"
    },
    {
      id: 6,
      title: "E-commerce Analytics Dashboard",
      category: "fullstack",
      problem: "Lack of real-time insights for e-commerce business decisions.",
      solution: "Real-time analytics dashboard with sales tracking, customer insights, and inventory management.",
      technologies: ["React", "Node.js", "MongoDB", "Chart.js", "WebSockets"],
      role: "Full-Stack Developer & Data Analyst",
      features: [
        "Real-time sales tracking and visualization",
        "Customer behavior analytics",
        "Inventory management system",
        "Automated report generation"
      ],
      github: "https://github.com/nesttech/ecommerce-analytics",
      demo: "https://analytics.nesttech.dev",
      image: "/projects/analytics-dashboard.jpg",
      icon: Server,
      color: "text-indigo-500"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
  ];

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Real-world solutions demonstrating technical expertise and problem-solving skills
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Icon */}
              <div className="absolute top-6 right-6 z-10">
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                  <project.icon className={`w-6 h-6 ${project.color}`} />
                </div>
              </div>

              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-bold text-white/30">
                    {project.title.split(' ')[0]}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Category Badge */}
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                  {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-dark-600 dark:text-dark-400 mb-4 line-clamp-2">
                  {project.solution}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium text-dark-500">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openProjectModal(project)}
                    className="flex-1 btn btn-outline py-2 text-sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                  
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-600 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-600 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/nesttech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            View all projects on GitHub
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Project Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white dark:bg-dark-800 rounded-2xl shadow-2xl overflow-hidden">
            {selectedProject && (
              <>
                {/* Modal Header */}
                <div className="p-6 border-b border-dark-200 dark:border-dark-700">
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="text-2xl font-bold text-dark-900 dark:text-white">
                      {selectedProject.title}
                    </Dialog.Title>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <p className="text-dark-600 dark:text-dark-400 mt-2">
                    {selectedProject.role}
                  </p>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div>
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                          Problem Statement
                        </h4>
                        <p className="text-dark-600 dark:text-dark-400">
                          {selectedProject.problem}
                        </p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                          Solution
                        </h4>
                        <p className="text-dark-600 dark:text-dark-400">
                          {selectedProject.solution}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-3">
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {selectedProject.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mt-0.5">
                                <Check className="w-3 h-3 text-primary-600 dark:text-primary-400" />
                              </div>
                              <span className="text-dark-600 dark:text-dark-400">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div>
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-3">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-300 rounded-lg text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-3">
                          Project Links
                        </h4>
                        <div className="space-y-3">
                          <a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-dark-100 dark:bg-dark-700 rounded-lg hover:bg-dark-200 dark:hover:bg-dark-600 transition-colors group"
                          >
                            <Github className="w-5 h-5 text-dark-700 dark:text-dark-300 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                            <span className="font-medium text-dark-700 dark:text-dark-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                              View Source Code
                            </span>
                            <ExternalLink className="w-4 h-4 ml-auto text-dark-400" />
                          </a>
                          
                          {selectedProject.demo && (
                            <a
                              href={selectedProject.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 bg-dark-100 dark:bg-dark-700 rounded-lg hover:bg-dark-200 dark:hover:bg-dark-600 transition-colors group"
                            >
                              <Eye className="w-5 h-5 text-dark-700 dark:text-dark-300 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                              <span className="font-medium text-dark-700 dark:text-dark-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                                Live Demo
                              </span>
                              <ExternalLink className="w-4 h-4 ml-auto text-dark-400" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
  );
};

export default Projects;
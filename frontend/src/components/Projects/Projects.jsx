// src/components/Projects/Projects.jsx
import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, Github, Eye, Code, Server, 
  Database, Shield, Zap, Users, Lock, X, Check
} from 'lucide-react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ ADD THIS LINE - Environment variable for API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

useEffect(() => {
  fetchProjects();
}, []);

const fetchProjects = async () => {
  try {
    // ✅ FIXED - Now uses environment variable
    const response = await axios.get(`${API_URL}/api/projects`);
    setProjects(response.data.data);
  } catch (error) {
    console.error('Error fetching projects:', error);
  } finally {
    setLoading(false);
  }
};

  const getIcon = (category) => {
    switch(category) {
      case 'fullstack': return Server;
      case 'frontend': return Code;
      case 'backend': return Database;
      case 'fundamentals': return Zap;
      default: return Users;
    }
  };

  const getColor = (category) => {
    switch(category) {
      case 'fullstack': return 'text-blue-500';
      case 'frontend': return 'text-purple-500';
      case 'backend': return 'text-green-500';
      case 'fundamentals': return 'text-yellow-500';
      default: return 'text-indigo-500';
    }
  };

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'fundamentals', label: 'Fundamentals' },
  ];

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <section id="projects" className="section">
        <div className="container">
          <div className="flex justify-center items-center min-h-[300px] sm:min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Real-world solutions demonstrating technical expertise and problem-solving skills
          </p>
        </div>

        {/* Filter Buttons - Horizontal scroll on mobile */}
        <div className="flex flex-nowrap sm:flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 sm:pb-0 no-scrollbar px-4 -mx-4 sm:mx-0 sm:px-0 sm:justify-center">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex-shrink-0 px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm md:text-base transition-all duration-300 whitespace-nowrap ${
                activeFilter === filter.id
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
          {filteredProjects.map((project, index) => {
            const Icon = getIcon(project.category);
            const color = getColor(project.category);
            
            return (
              <div
                key={project._id}
                className="group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2"
              >
                {/* Project Image */}
                <div className="h-36 sm:h-40 md:h-44 lg:h-48 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 relative overflow-hidden">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${color} opacity-30`} />
                    </div>
                  )}
                  {project.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold">
                      ⭐ Featured
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                  {/* Category Badge */}
                  <span className="inline-block px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-1.5 sm:mb-2">
                    {project.category?.charAt(0).toUpperCase() + project.category?.slice(1)}
                  </span>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 line-clamp-2">
                    {project.description || project.solution}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                    {project.technologies?.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-1 sm:px-1.5 py-0.5 text-[9px] sm:text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 3 && (
                      <span className="px-1 sm:px-1.5 py-0.5 text-[9px] sm:text-xs font-medium text-gray-500">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      onClick={() => openProjectModal(project)}
                      className="flex-1 btn btn-outline py-1 sm:py-1.5 text-[10px] sm:text-xs lg:text-sm"
                    >
                      <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 mr-0.5 sm:mr-1" />
                      Details
                    </button>
                    
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 sm:p-1.5 lg:p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                      </a>
                    )}
                    
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 sm:p-1.5 lg:p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">No projects found in this category.</p>
          </div>
        )}

        {/* View More Link */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <a
            href="https://github.com/BNesttech2000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            View all projects on GitHub
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
          </a>
        </div>
      </div>

      {/* Project Modal - Responsive */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <Dialog.Panel className="w-full sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
            {selectedProject && (
              <>
                {/* Modal Header */}
                <div className="p-3 sm:p-4 md:p-5 lg:p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="flex-1">
                      <Dialog.Title className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedProject.title}
                      </Dialog.Title>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
                        {selectedProject.role || 'Full-Stack Developer'}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-1 sm:p-1.5 lg:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </button>
                  </div>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="p-3 sm:p-4 md:p-5 lg:p-6 overflow-y-auto max-h-[60vh] sm:max-h-[70vh]">
                  <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                    {selectedProject.imageUrl && (
                      <div className="rounded-lg overflow-hidden">
                        <img 
                          src={selectedProject.imageUrl} 
                          alt={selectedProject.title}
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                      {/* Left Column */}
                      <div className="flex-1 space-y-3 sm:space-y-4">
                        {selectedProject.description && (
                          <div>
                            <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">Description</h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{selectedProject.description}</p>
                          </div>
                        )}

                        {selectedProject.problemStatement && (
                          <div>
                            <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">Problem</h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{selectedProject.problemStatement}</p>
                          </div>
                        )}

                        {selectedProject.solution && (
                          <div>
                            <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">Solution</h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{selectedProject.solution}</p>
                          </div>
                        )}

                        {selectedProject.features && selectedProject.features.length > 0 && (
                          <div>
                            <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">Features</h4>
                            <ul className="space-y-1">
                              {selectedProject.features.slice(0, 3).map((feature, index) => (
                                <li key={index} className="flex items-start gap-1 sm:gap-1.5">
                                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                                </li>
                              ))}
                              {selectedProject.features.length > 3 && (
                                <li className="text-xs sm:text-sm text-gray-500 ml-4 sm:ml-5">
                                  +{selectedProject.features.length - 3} more features
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Right Column */}
                      <div className="flex-1 space-y-3 sm:space-y-4">
                        <div>
                          <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">Technologies</h4>
                          <div className="flex flex-wrap gap-1 sm:gap-1.5">
                            {selectedProject.technologies?.map((tech) => (
                              <span
                                key={tech}
                                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-[10px] sm:text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">Status</h4>
                          <span className={`inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                            selectedProject.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            selectedProject.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                          }`}>
                            {selectedProject.status || 'Completed'}
                          </span>
                        </div>

                        {/* Project Links */}
                        <div className="pt-2 sm:pt-3">
                          <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">Links</h4>
                          <div className="space-y-1.5 sm:space-y-2">
                            {selectedProject.githubUrl && (
                              <a
                                href={selectedProject.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs sm:text-sm"
                              >
                                <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                <span>View Source Code</span>
                                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-auto" />
                              </a>
                            )}
                            
                            {selectedProject.demoUrl && (
                              <a
                                href={selectedProject.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs sm:text-sm"
                              >
                                <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                <span>Live Demo</span>
                                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-auto" />
                              </a>
                            )}
                          </div>
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
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

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects');
      setProjects(response.data.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Map category to icon
  const getIcon = (category) => {
    switch(category) {
      case 'fullstack': return Server;
      case 'frontend': return Code;
      case 'backend': return Database;
      case 'fundamentals': return Zap;
      default: return Users;
    }
  };

  // Map category to color
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
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </section>
    );
  }

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
          {filteredProjects.map((project, index) => {
            const Icon = getIcon(project.category);
            const color = getColor(project.category);
            
            return (
              <div
                key={project._id}
                className="group relative bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Project Icon */}
                <div className="absolute top-6 right-6 z-10">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                </div>

                {/* Project Image */}
                <div className="h-48 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 relative overflow-hidden">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold text-white/30">
                        {project.title.split(' ')[0]}
                      </div>
                    </div>
                  )}
                  {project.featured && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                      ⭐ Featured
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                    {project.category?.charAt(0).toUpperCase() + project.category?.slice(1)}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-dark-600 dark:text-dark-400 mb-4 line-clamp-2">
                    {project.description || project.solution}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-medium bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 3 && (
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
                    
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-600 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
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
            );
          })}
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
                    {selectedProject.role || 'Full-Stack Developer'}
                  </p>
                </div>

                {/* Modal Content */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div>
                      {selectedProject.imageUrl && (
                        <div className="mb-6 rounded-lg overflow-hidden">
                          <img 
                            src={selectedProject.imageUrl} 
                            alt={selectedProject.title}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}

                      {selectedProject.problemStatement && (
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                            Problem Statement
                          </h4>
                          <p className="text-dark-600 dark:text-dark-400">
                            {selectedProject.problemStatement}
                          </p>
                        </div>
                      )}

                      {selectedProject.solution && (
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                            Solution
                          </h4>
                          <p className="text-dark-600 dark:text-dark-400">
                            {selectedProject.solution}
                          </p>
                        </div>
                      )}

                      {selectedProject.description && !selectedProject.solution && (
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                            Description
                          </h4>
                          <p className="text-dark-600 dark:text-dark-400">
                            {selectedProject.description}
                          </p>
                        </div>
                      )}

                      {selectedProject.features && selectedProject.features.length > 0 && (
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
                      )}
                    </div>

                    {/* Right Column */}
                    <div>
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-3">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies?.map((tech) => (
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
                          Project Status
                        </h4>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          selectedProject.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                          selectedProject.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {selectedProject.status || 'Completed'}
                        </span>
                      </div>

                      {selectedProject.challenges && selectedProject.challenges.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-3">
                            Challenges Overcome
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-dark-600 dark:text-dark-400">
                            {selectedProject.challenges.map((challenge, index) => (
                              <li key={index}>{challenge}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedProject.learnings && selectedProject.learnings.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-3">
                            Key Learnings
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-dark-600 dark:text-dark-400">
                            {selectedProject.learnings.map((learning, index) => (
                              <li key={index}>{learning}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Project Links */}
                      <div className="mt-6 pt-6 border-t border-dark-200 dark:border-dark-700">
                        <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-3">
                          Project Links
                        </h4>
                        <div className="space-y-3">
                          {selectedProject.githubUrl && (
                            <a
                              href={selectedProject.githubUrl}
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
                          )}
                          
                          {selectedProject.demoUrl && (
                            <a
                              href={selectedProject.demoUrl}
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

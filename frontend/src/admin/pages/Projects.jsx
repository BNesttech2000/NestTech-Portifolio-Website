import React, { useState, useEffect } from 'react';
import { 
  FiPlus, FiEdit2, FiTrash2, FiSearch, 
  FiStar, FiGithub, FiExternalLink, FiUpload,
  FiX, FiImage, FiFile
} from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [],
    category: 'fullstack',
    githubUrl: '',
    demoUrl: '',
    imageUrl: '',
    featured: false,
    status: 'completed'
  });

  const getApi = () => {
    const token = localStorage.getItem('adminToken');
    return axios.create({
      baseURL: 'http://localhost:5000/api/admin',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const api = getApi();
      const response = await api.get('/projects');
      setProjects(response.data.data);
    } catch (error) {
      toast.error('Error fetching projects');
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL for images
      if (file.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl('');
      }
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return null;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    try {
      const api = getApi();
      const response = await api.post('/upload/file?type=project', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data.success) {
        toast.success('File uploaded successfully');
        return response.data.data.url;
      }
    } catch (error) {
      toast.error('Error uploading file');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const api = getApi();
      let imageUrl = formData.imageUrl;
      
      // Upload file if selected
      if (selectedFile) {
        const uploadedUrl = await handleFileUpload();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }
      
      const projectData = { ...formData, imageUrl };
      
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, projectData);
        toast.success('Project updated successfully');
      } else {
        await api.post('/projects', projectData);
        toast.success('Project added successfully');
      }
      
      setShowModal(false);
      resetForm();
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving project');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const api = getApi();
        await api.delete(`/projects/${id}`);
        toast.success('Project deleted successfully');
        fetchProjects();
      } catch (error) {
        toast.error('Error deleting project');
      }
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      technologies: project.technologies || [],
      category: project.category || 'fullstack',
      githubUrl: project.githubUrl || '',
      demoUrl: project.demoUrl || '',
      imageUrl: project.imageUrl || '',
      featured: project.featured || false,
      status: project.status || 'completed'
    });
    if (project.imageUrl) {
      setPreviewUrl(project.imageUrl);
    }
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      technologies: [],
      category: 'fullstack',
      githubUrl: '',
      demoUrl: '',
      imageUrl: '',
      featured: false,
      status: 'completed'
    });
    setSelectedFile(null);
    setPreviewUrl('');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin/login';
  };

  const filteredProjects = projects.filter(project =>
    project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ['fullstack', 'frontend', 'backend', 'fundamentals', 'opensource'];
  const statuses = ['completed', 'in-progress', 'planned'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <FiPlus className="mr-2" />
          Add New Project
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            {project.imageUrl && (
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {project.featured && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 p-1 rounded-full">
                    <FiStar className="w-4 h-4" />
                  </div>
                )}
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies?.slice(0, 3).map(tech => (
                  <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {tech}
                  </span>
                ))}
                {project.technologies?.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.status === 'completed' ? 'bg-green-100 text-green-800' :
                  project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <FiTrash2 />
                  </button>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                      <FiGithub />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {previewUrl ? (
                    <div className="relative">
                      <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded" />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl('');
                          setFormData({...formData, imageUrl: ''});
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2">
                        <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                          <FiUpload className="inline mr-2" />
                          Choose File
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*,.pdf"
                            onChange={handleFileSelect}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        PNG, JPG, GIF, PDF up to 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies.join(', ')}
                  onChange={(e) => setFormData({
                    ...formData, 
                    technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                  })}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Demo URL
                </label>
                <input
                  type="url"
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({...formData, demoUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="mr-2"
                  />
                  Featured Project
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    editingProject ? 'Update' : 'Create'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;

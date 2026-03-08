// src/components/Certificates/Certificates.jsx
import React, { useState, useEffect } from 'react';
import { 
  FiAward, FiExternalLink, FiDownload, FiEye, 
  FiCalendar, FiCheckCircle, FiX, FiFilter,
  FiBookmark, FiStar, FiClock, FiDatabase, FiCloud, FiCpu
} from 'react-icons/fi';
import axios from 'axios';

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/certificates');
      setCertificates(response.data.data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', label: 'All', icon: FiAward },
    { id: 'webdev', label: 'Web Dev', icon: FiBookmark },
    { id: 'frontend', label: 'Frontend', icon: FiStar },
    { id: 'backend', label: 'Backend', icon: FiClock },
    { id: 'database', label: 'Database', icon: FiDatabase },
    { id: 'cloud', label: 'Cloud', icon: FiCloud },
    { id: 'fundamentals', label: 'Fundamentals', icon: FiCpu }
  ];

  const filteredCerts = filter === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.category === filter);

  if (loading) {
    return (
      <section id="certificates" className="section">
        <div className="container">
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certificates" className="section bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="section-title">
            <span className="gradient-text">Certifications</span> & Achievements
          </h2>
          <p className="section-subtitle">
            Validated expertise and continuous learning in modern technologies
          </p>
        </div>

        {/* Filter Buttons - Horizontal scroll on mobile */}
        <div className="flex flex-nowrap sm:flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-12 overflow-x-auto pb-2 sm:pb-0 no-scrollbar px-4 -mx-4 sm:mx-0 sm:px-0 sm:justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`flex items-center gap-1 sm:gap-1.5 flex-shrink-0 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                filter === category.id
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm'
              }`}
            >
              <category.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden xs:inline">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert._id}
              className="group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden"
            >
              {/* Certificate Header */}
              <div className="h-20 sm:h-24 lg:h-28 bg-gradient-to-r from-primary-600 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-2 right-2">
                  {cert.featured && (
                    <span className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-yellow-400 text-yellow-900 rounded-full text-[10px] sm:text-xs font-bold">
                      <FiStar className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                      <span className="hidden xs:inline">Featured</span>
                    </span>
                  )}
                </div>
                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <FiAward className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                    <div>
                      <div className="text-white font-bold text-xs sm:text-sm">{cert.issuer}</div>
                      <div className="text-white/80 text-[10px] sm:text-xs">
                        {new Date(cert.issueDate).getFullYear()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate Content */}
              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                  {cert.title}
                </h3>

                {cert.verified && (
                  <div className="flex items-center gap-1 mb-2">
                    <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500" />
                    <span className="text-[10px] sm:text-xs text-green-600 dark:text-green-400 font-medium">
                      Verified
                    </span>
                  </div>
                )}

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {cert.skills?.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-[9px] sm:text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills?.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[9px] sm:text-xs text-gray-500">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 sm:gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      setSelectedCert(cert);
                      setIsModalOpen(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-[10px] sm:text-xs"
                  >
                    <FiEye className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    Details
                  </button>
                  
                  {cert.imageUrl && (
                    <a
                      href={cert.imageUrl}
                      download
                      className="p-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <FiDownload className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </a>
                  )}
                </div>

                {cert.credentialId && (
                  <div className="mt-2 text-[8px] sm:text-[10px] text-gray-500 dark:text-gray-400 text-center truncate">
                    ID: {cert.credentialId}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Total Count */}
        <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 lg:px-6 py-2 sm:py-3 lg:py-4 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg">
            <FiAward className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary-600 dark:text-primary-400" />
            <div>
              <span className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                {certificates.length}+
              </span>
              <span className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 ml-1 sm:ml-2">
                Certifications
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal - Responsive */}
      {isModalOpen && selectedCert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl w-full max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 sm:p-4 flex justify-between items-center">
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white">
                Certificate Details
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              <div className="bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-lg p-4 sm:p-6 text-center">
                <FiAward className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                <h4 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {selectedCert.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {selectedCert.issuer} • {new Date(selectedCert.issueDate).getFullYear()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 sm:p-3">
                  <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Issuer</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                    {selectedCert.issuer}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 sm:p-3">
                  <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Date</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(selectedCert.issueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {selectedCert.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-[10px] sm:text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                {selectedCert.imageUrl && (
                  <a
                    href={selectedCert.imageUrl}
                    download
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-xs sm:text-sm"
                  >
                    <FiDownload className="w-3 h-3 sm:w-4 sm:h-4" />
                    Download
                  </a>
                )}
                {selectedCert.credentialUrl && (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    <FiExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    Verify
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
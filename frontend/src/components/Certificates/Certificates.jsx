import React, { useState } from 'react';
import { 
  FiAward, FiExternalLink, FiDownload, FiEye, 
  FiCalendar, FiCheckCircle, FiX, FiFilter,
  FiBookmark, FiStar, FiClock, FiDatabase, FiCloud, FiCpu
} from 'react-icons/fi';

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const certificates = [
    {
      id: 1,
      title: "Full Stack Web Development",
      issuer: "Coursera",
      date: "2023",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      category: "webdev",
      credentialId: "CERT-12345",
      verified: true,
      featured: true
    },
    {
      id: 2,
      title: "React Advanced Patterns",
      issuer: "Frontend Masters",
      date: "2023",
      skills: ["React", "Hooks", "Performance", "Testing"],
      category: "frontend",
      verified: true,
      featured: true
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      issuer: "Udemy",
      date: "2023",
      skills: ["Node.js", "Express", "REST APIs", "Authentication"],
      category: "backend",
      verified: true,
      featured: false
    },
    {
      id: 4,
      title: "MongoDB for Developers",
      issuer: "MongoDB University",
      date: "2022",
      skills: ["MongoDB", "Database Design", "Aggregation", "Indexing"],
      category: "database",
      verified: true,
      featured: false
    },
    {
      id: 5,
      title: "Data Structures & Algorithms",
      issuer: "LeetCode",
      date: "2022",
      skills: ["C++", "Algorithms", "Problem Solving", "Optimization"],
      category: "fundamentals",
      verified: true,
      featured: false
    },
    {
      id: 6,
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2023",
      skills: ["AWS", "Cloud Computing", "DevOps", "Security"],
      category: "cloud",
      verified: true,
      featured: true
    }
  ];

  const categories = [
    { id: 'all', label: 'All Certificates', icon: FiAward },
    { id: 'webdev', label: 'Web Development', icon: FiBookmark },
    { id: 'frontend', label: 'Frontend', icon: FiStar },
    { id: 'backend', label: 'Backend', icon: FiClock },
    { id: 'database', label: 'Database', icon: FiDatabase },
    { id: 'cloud', label: 'Cloud', icon: FiCloud },
    { id: 'fundamentals', label: 'Fundamentals', icon: FiCpu }
  ];

  const filteredCerts = filter === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.category === filter);

  return (
    <section id="certificates" className="section bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="gradient-text">Certifications</span> & Achievements
          </h2>
          <p className="section-subtitle">
            Validated expertise and continuous learning in modern technologies
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md hover:shadow-lg'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCerts.map((cert, index) => (
            <div
              key={cert.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Certificate Header with Gradient */}
              <div className="h-32 bg-gradient-to-r from-primary-600 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 right-4">
                  {cert.featured && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                      <FiStar className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2">
                    <FiAward className="w-8 h-8 text-white" />
                    <div>
                      <div className="text-white font-bold text-lg">{cert.issuer}</div>
                      <div className="text-white/80 text-xs">{cert.date}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {cert.title}
                </h3>

                {/* Verification Badge */}
                {cert.verified && (
                  <div className="flex items-center gap-1 mb-4">
                    <FiCheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                      Verified Certificate
                    </span>
                  </div>
                )}

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      setSelectedCert(cert);
                      setIsModalOpen(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <FiEye className="w-4 h-4" />
                    View Details
                  </button>
                  
                  <button
                    className="p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="Download Certificate"
                  >
                    <FiDownload className="w-5 h-5" />
                  </button>
                  
                  {cert.credentialId && (
                    <button
                      className="p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      title="Verify Certificate"
                    >
                      <FiExternalLink className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Credential ID */}
                {cert.credentialId && (
                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                    Credential ID: {cert.credentialId}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Total Count */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <FiAward className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {certificates.length}+
              </span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">
                Professional Certifications
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {isModalOpen && selectedCert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Certificate Details
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Certificate Preview */}
              <div className="bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-xl p-8 text-center">
                <FiAward className="w-16 h-16 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedCert.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Issued by {selectedCert.issuer} • {selectedCert.date}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Issuer</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {selectedCert.issuer}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Issue Date</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {selectedCert.date}
                  </div>
                </div>
                {selectedCert.credentialId && (
                  <div className="col-span-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Credential ID
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white break-all">
                      {selectedCert.credentialId}
                    </div>
                  </div>
                )}
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Skills Validated
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  <FiDownload className="w-5 h-5" />
                  Download PDF
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-colors">
                  <FiExternalLink className="w-5 h-5" />
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;

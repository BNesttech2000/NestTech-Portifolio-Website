// frontend/src/components/Certificates/Certificates.jsx
import React, { useState } from 'react';
import { 
  Award, ExternalLink, Download, Eye, Calendar, 
  Building, CheckCircle, X, Maximize2, Filter 
} from 'lucide-react';
import { Dialog } from '@headlessui/react';

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
      image: "/certificates/fullstack.jpg",
      pdf: "/certificates/fullstack.pdf",
      verified: true,
      credentialId: "CERT-12345",
      category: "webdev"
    },
    {
      id: 2,
      title: "React Advanced Patterns",
      issuer: "Frontend Masters",
      date: "2023",
      skills: ["React", "Hooks", "Performance", "Testing"],
      image: "/certificates/react-advanced.jpg",
      pdf: "/certificates/react-advanced.pdf",
      verified: true,
      credentialId: "FM-67890",
      category: "frontend"
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      issuer: "Udemy",
      date: "2023",
      skills: ["Node.js", "Express", "REST APIs", "Authentication"],
      image: "/certificates/nodejs.jpg",
      pdf: "/certificates/nodejs.pdf",
      verified: true,
      credentialId: "UDE-54321",
      category: "backend"
    },
    {
      id: 4,
      title: "MongoDB for Developers",
      issuer: "MongoDB University",
      date: "2022",
      skills: ["MongoDB", "Database Design", "Aggregation", "Indexing"],
      image: "/certificates/mongodb.jpg",
      pdf: "/certificates/mongodb.pdf",
      verified: true,
      credentialId: "MDB-09876",
      category: "database"
    },
    {
      id: 5,
      title: "Data Structures & Algorithms",
      issuer: "LeetCode",
      date: "2022",
      skills: ["C++", "Algorithms", "Problem Solving", "Optimization"],
      image: "/certificates/dsa.jpg",
      pdf: "/certificates/dsa.pdf",
      verified: true,
      credentialId: "LC-11223",
      category: "fundamentals"
    },
    {
      id: 6,
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2023",
      skills: ["AWS", "Cloud Computing", "DevOps", "Security"],
      image: "/certificates/aws.jpg",
      pdf: "/certificates/aws.pdf",
      verified: true,
      credentialId: "AWS-33445",
      category: "cloud"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Certificates' },
    { id: 'webdev', label: 'Web Development' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Database' },
    { id: 'fundamentals', label: 'Fundamentals' },
    { id: 'cloud', label: 'Cloud' }
  ];

  const filteredCerts = certificates.filter(cert => 
    filter === 'all' || cert.category === filter
  );

  const openCertificateModal = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const handleDownload = (pdfUrl, title) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="certificates" className="section bg-dark-50 dark:bg-dark-950">
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
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700'
              }`}
            >
              {filter === category.id && <Filter className="w-4 h-4" />}
              {category.label}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCerts.map((cert, index) => (
            <div
              key={cert.id}
              className="group bg-white dark:bg-dark-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Certificate Header */}
              <div className="p-6 border-b border-dark-100 dark:border-dark-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30">
                    <Award className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  {cert.verified && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">
                        Verified
                      </span>
                    </div>
                  )}
                </div>

                {/* Certificate Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-2 text-dark-600 dark:text-dark-400 mb-1">
                    <Building className="w-4 h-4" />
                    <span className="text-sm">{cert.issuer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-dark-500 dark:text-dark-500">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{cert.date}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs font-medium bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-300 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openCertificateModal(cert)}
                    className="flex-1 btn btn-outline py-2 text-sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </button>
                  
                  <button
                    onClick={() => handleDownload(cert.pdf, cert.title)}
                    className="p-3 rounded-lg bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-600 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    aria-label="Download"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-dark-800 rounded-xl shadow-lg">
            <Award className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <span className="text-dark-700 dark:text-dark-300 font-medium">
              {certificates.length} Professional Certifications Earned
            </span>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white dark:bg-dark-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {selectedCert && (
              <>
                {/* Modal Header */}
                <div className="sticky top-0 z-10 p-6 bg-white dark:bg-dark-800 border-b border-dark-200 dark:border-dark-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30">
                        <Award className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <Dialog.Title className="text-2xl font-bold text-dark-900 dark:text-white">
                          {selectedCert.title}
                        </Dialog.Title>
                        <p className="text-dark-600 dark:text-dark-400">
                          {selectedCert.issuer}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownload(selectedCert.pdf, selectedCert.title)}
                        className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors"
                        aria-label="Download"
                      >
                        <Download className="w-5 h-5 text-dark-600 dark:text-dark-400" />
                      </button>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors"
                      >
                        <X className="w-6 h-6 text-dark-600 dark:text-dark-400" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Certificate Image */}
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-2xl p-8 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🏆</div>
                          <div className="text-2xl font-bold text-dark-900 dark:text-white mb-2">
                            Certificate of Completion
                          </div>
                          <div className="text-dark-600 dark:text-dark-400">
                            This certifies that
                          </div>
                          <div className="text-xl font-bold text-primary-600 dark:text-primary-400 my-2">
                            NestTech
                          </div>
                          <div className="text-dark-600 dark:text-dark-400">
                            has successfully completed
                          </div>
                          <div className="text-lg font-semibold text-dark-900 dark:text-white mt-2">
                            {selectedCert.title}
                          </div>
                        </div>
                      </div>

                      {/* Certificate Details */}
                      <div className="bg-dark-50 dark:bg-dark-900 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">
                          Certificate Details
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-dark-600 dark:text-dark-400">Issuer:</span>
                            <span className="font-medium text-dark-900 dark:text-white">
                              {selectedCert.issuer}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-dark-600 dark:text-dark-400">Date Issued:</span>
                            <span className="font-medium text-dark-900 dark:text-white">
                              {selectedCert.date}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-dark-600 dark:text-dark-400">Credential ID:</span>
                            <span className="font-medium text-dark-900 dark:text-white">
                              {selectedCert.credentialId}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-dark-600 dark:text-dark-400">Status:</span>
                            <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                              <CheckCircle className="w-4 h-4" />
                              Verified
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Skills & Description */}
                    <div className="space-y-6">
                      {/* Skills Learned */}
                      <div>
                        <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">
                          Skills Validated
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {selectedCert.skills.map((skill) => (
                            <div
                              key={skill}
                              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-lg"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="font-medium text-dark-900 dark:text-white">
                                {skill}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">
                          About This Certification
                        </h4>
                        <div className="space-y-3 text-dark-600 dark:text-dark-400">
                          <p>
                            This certification validates comprehensive knowledge and practical skills 
                            in {selectedCert.title.toLowerCase()}. The program covers both theoretical 
                            concepts and hands-on implementation.
                          </p>
                          <p>
                            Topics include best practices, industry standards, and real-world 
                            applications that demonstrate proficiency in the relevant technologies.
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-6 border-t border-dark-200 dark:border-dark-700">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleDownload(selectedCert.pdf, selectedCert.title)}
                            className="flex-1 btn btn-primary"
                          >
                            <Download className="w-5 h-5 mr-2" />
                            Download PDF
                          </button>
                          <button
                            onClick={() => window.open(selectedCert.pdf, '_blank')}
                            className="flex-1 btn btn-outline"
                          >
                            <ExternalLink className="w-5 h-5 mr-2" />
                            Open in New Tab
                          </button>
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

export default Certificates;
// src/components/Contact/Contact.jsx
import React, { useState } from 'react';
import { 
  FiMail, FiMapPin, FiPhone, FiSend, 
  FiGithub, FiLinkedin, FiTwitter, FiUser,
  FiMessageSquare, FiCheckCircle, FiAlertCircle
} from 'react-icons/fi';
import axios from 'axios'; // Make sure to install axios: npm install axios

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // ✅ ADDED: Environment variable for API URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      value: 'biamungunestory27@gmail.com',
      link: 'mailto:biamungunestory27@gmail.com',
      color: 'text-blue-500'
    },
    {
      icon: FiPhone,
      title: 'Phone',
      value: '+260 776 669 320',
      link: 'tel:+260776669320',
      color: 'text-green-500'
    },
    {
      icon: FiMapPin,
      title: 'Location',
      value: 'Lusaka, Zambia',
      link: 'https://maps.google.com',
      color: 'text-red-500'
    }
  ];

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/BNesttech2000', label: 'GitHub', color: 'hover:text-gray-900' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/biamungu-nestony', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: FiTwitter, href: 'https://twitter.com/nesttechdev', label: 'Twitter', color: 'hover:text-sky-500' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // FIXED: Now sends actual data to backend with environment variable
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // ✅ FIXED: Using environment variable
      const response = await axios.post(`${API_URL}/api/contact`, formData);
      
      if (response.data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Let's build something amazing together
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column - Contact Info */}
          <div className="flex-1 space-y-4 sm:space-y-5 lg:space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-5">
                Contact Information
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.link}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group"
                  >
                    <div className={`p-2 sm:p-2.5 rounded-lg ${info.color} bg-opacity-10 bg-current`}>
                      <info.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${info.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {info.title}
                      </div>
                      <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-5">
                Connect With Me
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group ${social.color} text-xs sm:text-sm`}
                  >
                    <social.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-5">
                Send a Message
              </h3>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-4 p-3 sm:p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-green-800 dark:text-green-300">
                        Message sent successfully!
                      </div>
                      <div className="text-[10px] sm:text-xs text-green-700 dark:text-green-400">
                        I'll get back to you within 24 hours.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-4 p-3 sm:p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <div className="text-xs sm:text-sm font-medium text-red-800 dark:text-red-300">
                      Error sending message. Please try again.
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Your Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-2 sm:left-3 top-2 sm:top-3 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-7 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-2 sm:left-3 top-2 sm:top-3 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-7 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Your Message
                  </label>
                  <div className="relative">
                    <FiMessageSquare className="absolute left-2 sm:left-3 top-2 sm:top-3 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full pl-7 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn btn-primary py-2.5 sm:py-3 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <FiSend className="mr-1.5 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
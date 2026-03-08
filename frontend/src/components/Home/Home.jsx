// src/components/Home/Home.jsx
import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight, FiDownload, FiMail } from 'react-icons/fi';

const Home = () => {
  const [secretClickCount, setSecretClickCount] = useState(0);

  const handleSecretClick = () => {
    const newCount = secretClickCount + 1;
    setSecretClickCount(newCount);
    
    if (newCount >= 5) {
      window.location.href = '/admin/login';
      setSecretClickCount(0);
    }
    
    setTimeout(() => setSecretClickCount(0), 2000);
  };

  // ========== FIXED BUTTON HANDLERS ==========
  const handleViewProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
    // Create a temporary link to download the CV
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Make sure this file exists in your public folder
    link.download = 'NestTech_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional: Show a toast notification
    console.log('Downloading CV...');
  };

  const handleContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // ==========================================

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 pt-16 sm:pt-20">
      {/* Background decorations - hidden on mobile */}
      <div className="absolute top-20 right-20 w-48 sm:w-72 h-48 sm:h-72 bg-primary-500/10 rounded-full blur-3xl hidden md:block"></div>
      <div className="absolute bottom-20 left-20 w-48 sm:w-72 h-48 sm:h-72 bg-purple-500/10 rounded-full blur-3xl hidden md:block"></div>
      
      {/* Secret Admin Area */}
      <div 
        onClick={handleSecretClick}
        className="fixed top-0 left-0 w-16 h-16 sm:w-32 sm:h-32 opacity-0 cursor-pointer z-50"
        title="Secret Admin Area (click 5 times)"
      />
      
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 xl:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mx-auto lg:mx-0">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-primary-600 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-semibold text-primary-600 dark:text-primary-400">
                Full-Stack Developer
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="block text-gray-900 dark:text-white">Building</span>
              <span className="gradient-text block">Digital Excellence</span>
              <span className="block text-gray-900 dark:text-white">with Code</span>
            </h1>

            {/* Typing animation */}
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 h-12 sm:h-16">
              <TypeAnimation
                sequence={[
                  'React & Node.js Specialist',
                  2000,
                  'Full-Stack Engineer',
                  2000,
                  'Problem Solver',
                  2000,
                  'System Architect',
                  2000,
                ]}
                speed={50}
                repeat={Infinity}
                cursor={true}
              />
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 px-4 lg:px-0">
              I architect robust, scalable web applications using modern technologies. 
              Transforming complex problems into elegant, efficient solutions that 
              drive business success and user satisfaction.
            </p>

            {/* Buttons - NOW WITH WORKING HANDLERS */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 lg:px-0">
              <button 
                onClick={handleViewProjects}
                className="btn btn-primary group"
              >
                <span>View Projects</span>
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={handleDownloadCV}
                className="btn btn-secondary group"
              >
                <FiDownload className="mr-2" />
                <span>Download CV</span>
              </button>
              
              <button 
                onClick={handleContact}
                className="btn btn-outline group"
              >
                <FiMail className="mr-2" />
                <span>Contact Me</span>
              </button>
            </div>
          </div>

          {/* Right content - Code window - Hidden on mobile, visible on lg screens */}
          <div className="hidden lg:block flex-1">
            <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-float">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-sm text-gray-400">portfolio.js</span>
              </div>
              
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto">
                <pre className="text-gray-300">
                  <span className="text-gray-500">// NestTech Portfolio</span>{'\n'}
                  <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = {'{'}{'\n'}
                  {'  '}<span className="text-blue-400">name</span>: <span className="text-green-400">"NestTech"</span>,{'\n'}
                  {'  '}<span className="text-blue-400">role</span>: <span className="text-green-400">"Full-Stack Developer"</span>,{'\n'}
                  {'  '}<span className="text-blue-400">skills</span>: [<span className="text-green-400">"React"</span>, <span className="text-green-400">"Node.js"</span>, <span className="text-green-400">"MongoDB"</span>],{'\n'}
                  {'  '}<span className="text-blue-400">projects</span>: 6,{'\n'}
                  {'}'}{'\n\n'}
                  <span className="text-yellow-400">export default</span> <span className="text-blue-400">developer</span>
                </pre>
                
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-2 h-4 bg-primary-500 animate-pulse"></div>
                  <span className="text-gray-500 text-xs">Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Secret click counter indicator */}
      {process.env.NODE_ENV === 'development' && secretClickCount > 0 && (
        <div className="fixed bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs z-50">
          Secret clicks: {secretClickCount}/5
        </div>
      )}
    </section>
  );
};

export default Home;
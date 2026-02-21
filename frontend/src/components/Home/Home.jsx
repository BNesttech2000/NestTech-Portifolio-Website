import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight, FiDownload, FiMail } from 'react-icons/fi';

const Home = () => {
  const [secretClickCount, setSecretClickCount] = useState(0);

  const handleSecretClick = () => {
    const newCount = secretClickCount + 1;
    setSecretClickCount(newCount);
    
    // After 5 clicks, redirect to admin
    if (newCount >= 5) {
      window.location.href = '/admin/login';
      setSecretClickCount(0);
    }
    
    // Reset after 2 seconds
    setTimeout(() => setSecretClickCount(0), 2000);
  };

  return (
    <section id="home" className="section relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Background decoration */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      {/* Secret Admin Area - Hidden in plain sight */}
      <div 
        onClick={handleSecretClick}
        className="fixed top-0 left-0 w-32 h-32 opacity-0 cursor-pointer z-50"
        title="Secret Admin Area (click 5 times)"
      />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)]">
          {/* Left content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                Full-Stack Developer
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="block text-gray-900 dark:text-white">Building</span>
              <span className="gradient-text">Digital Excellence</span>
              <span className="block text-gray-900 dark:text-white">with Code</span>
            </h1>

            {/* Typing animation */}
            <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 h-16">
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
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
              I architect robust, scalable web applications using modern technologies. 
              Transforming complex problems into elegant, efficient solutions that 
              drive business success and user satisfaction.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-primary group">
                <span>View Projects</span>
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="btn btn-secondary group">
                <FiDownload className="mr-2" />
                <span>Download CV</span>
              </button>
              
              <button className="btn btn-outline group">
                <FiMail className="mr-2" />
                <span>Contact Me</span>
              </button>
            </div>
          </div>

          {/* Right content - Code window */}
          <div className="relative hidden lg:block">
            <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-float">
              {/* Window header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-sm text-gray-400">portfolio.js</span>
              </div>
              
              {/* Code content */}
              <div className="p-6 font-mono text-sm">
                <pre className="text-gray-300">
                  <span className="text-gray-500">// NestTech Portfolio</span>{'\n'}
                  <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = {'{'}{'\n'}
                  {'    '}<span className="text-blue-400">name</span>: <span className="text-green-400">"NestTech"</span>,{'\n'}
                  {'    '}<span className="text-blue-400">role</span>: <span className="text-green-400">"Full-Stack Developer"</span>,{'\n'}
                  {'    '}<span className="text-blue-400">skills</span>: [<span className="text-green-400">"React"</span>, <span className="text-green-400">"Node.js"</span>, <span className="text-green-400">"MongoDB"</span>],{'\n'}
                  {'    '}<span className="text-blue-400">projects</span>: 6,{'\n'}
                  {'}'}{'\n\n'}
                  <span className="text-yellow-400">export default</span> <span className="text-blue-400">developer</span>
                </pre>
                
                {/* Blinking cursor */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-2 h-4 bg-primary-500 animate-pulse"></div>
                  <span className="text-gray-500 text-xs">Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Secret click counter indicator (only visible during development) */}
      {process.env.NODE_ENV === 'development' && secretClickCount > 0 && (
        <div className="fixed bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs z-50">
          Secret clicks: {secretClickCount}/5
        </div>
      )}
    </section>
  );
};

export default Home;

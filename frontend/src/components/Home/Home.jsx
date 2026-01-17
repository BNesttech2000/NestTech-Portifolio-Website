// frontend/src/components/Home/Home.jsx
import React, { useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, Download, Mail, Github, Linkedin, Twitter, Code, Server, Cpu, Database } from 'lucide-react';

const Home = () => {
  useEffect(() => {
    // Add floating particles effect
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-primary-500/20 rounded-full animate-float-slow';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      document.querySelector('.particles-container')?.appendChild(particle);
    };

    for (let i = 0; i < 20; i++) {
      createParticle();
    }
  }, []);

  const handleViewProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'NestTech_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/nesttech', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/nesttech', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/nesttechdev', label: 'Twitter' },
  ];

  const techStack = [
    { icon: Code, label: 'React', color: 'text-blue-500' },
    { icon: Server, label: 'Node.js', color: 'text-green-500' },
    { icon: Database, label: 'MongoDB', color: 'text-green-600' },
    { icon: Cpu, label: 'C++', color: 'text-purple-500' },
  ];

  return (
    <section id="home" className="section relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl"></div>
        <div className="particles-container absolute inset-0"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="animate-slide-in-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full mb-8">
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">🚀 Full-Stack Developer</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block text-dark-900 dark:text-white">Building</span>
              <span className="gradient-text">Digital Excellence</span>
              <span className="block text-dark-900 dark:text-white">with Code</span>
            </h1>

            {/* Animated Typing */}
            <div className="mb-8">
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
                className="text-xl md:text-2xl text-dark-600 dark:text-dark-400 font-medium"
              />
            </div>

            {/* Description */}
            <p className="text-lg text-dark-600 dark:text-dark-400 mb-10 max-w-xl">
              I architect robust, scalable web applications using modern technologies. 
              Transforming complex problems into elegant, efficient solutions that 
              drive business success and user satisfaction.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={handleViewProjects}
                className="btn btn-primary group"
              >
                <span>View Projects</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={handleDownloadCV}
                className="btn btn-secondary group"
              >
                <Download className="mr-2" />
                <span>Download CV</span>
              </button>
              
              <button
                onClick={handleContact}
                className="btn btn-outline"
              >
                <Mail className="mr-2" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6 mb-12">
              <span className="text-dark-600 dark:text-dark-400 font-medium">Follow me:</span>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Visuals */}
          <div className="relative animate-slide-in-right">
            {/* Main Illustration */}
            <div className="relative">
              {/* Code Window */}
              <div className="relative bg-dark-800 rounded-2xl p-6 shadow-2xl overflow-hidden group">
                {/* Window Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 text-dark-400 text-sm font-mono">portfolio.js</div>
                </div>

                {/* Code Content */}
                <div className="font-mono text-sm">
                  <div className="text-dark-400 mb-2">// NestTech Portfolio</div>
                  <div className="text-dark-400 mb-4">const developer = {'{'}</div>
                  
                  <div className="ml-4 mb-2">
                    <span className="text-purple-400">name</span>
                    <span className="text-dark-400">: </span>
                    <span className="text-green-400">"NestTech"</span>
                    <span className="text-dark-400">,</span>
                  </div>
                  
                  <div className="ml-4 mb-2">
                    <span className="text-purple-400">role</span>
                    <span className="text-dark-400">: </span>
                    <span className="text-green-400">"Full-Stack Developer"</span>
                    <span className="text-dark-400">,</span>
                  </div>
                  
                  <div className="ml-4 mb-2">
                    <span className="text-purple-400">skills</span>
                    <span className="text-dark-400">: [</span>
                    <span className="text-yellow-400">"React"</span>
                    <span className="text-dark-400">, </span>
                    <span className="text-yellow-400">"Node.js"</span>
                    <span className="text-dark-400">, </span>
                    <span className="text-yellow-400">"MongoDB"</span>
                    <span className="text-dark-400">],</span>
                  </div>
                  
                  <div className="ml-4 mb-4">
                    <span className="text-purple-400">projects</span>
                    <span className="text-dark-400">: </span>
                    <span className="text-blue-400">6</span>
                    <span className="text-dark-400">,</span>
                  </div>
                  
                  <div className="text-dark-400">{'}'}</div>
                  
                  <div className="mt-4">
                    <span className="text-blue-400">export</span>
                    <span className="text-dark-400"> </span>
                    <span className="text-yellow-400">default</span>
                    <span className="text-dark-400"> developer</span>
                  </div>
                </div>

                {/* Cursor */}
                <div className="absolute bottom-6 right-6 w-2 h-4 bg-primary-500 animate-blink"></div>
              </div>

              {/* Floating Tech Icons */}
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-white dark:bg-dark-800 rounded-2xl shadow-xl flex items-center justify-center animate-float">
                <Code className="text-primary-600" size={32} />
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-white dark:bg-dark-800 rounded-2xl shadow-xl flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                <Server className="text-secondary-600" size={32} />
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mt-12">
              <div className="text-dark-600 dark:text-dark-400 font-medium mb-4">Tech Stack:</div>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <div
                    key={tech.label}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    <tech.icon className={tech.color} size={18} />
                    <span className="text-sm font-medium text-dark-700 dark:text-dark-300">
                      {tech.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
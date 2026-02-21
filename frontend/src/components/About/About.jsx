import React from 'react';
import { FiUser, FiAward, FiClock, FiCode, FiServer, FiDatabase, FiCpu, FiGitBranch } from 'react-icons/fi';

const About = () => {
  const stats = [
    { value: '15+', label: 'Projects Completed', icon: FiAward },
    { value: '3+', label: 'Years Experience', icon: FiClock },
    { value: '10+', label: 'Technologies', icon: FiCode },
    { value: '5+', label: 'Certifications', icon: FiAward },
  ];

  const skills = [
    { icon: FiCode, label: 'React Development', level: 'Expert' },
    { icon: FiServer, label: 'Node.js Backend', level: 'Expert' },
    { icon: FiDatabase, label: 'Database Design', level: 'Advanced' },
    { icon: FiCpu, label: 'C++ Programming', level: 'Expert' },
    { icon: FiGitBranch, label: 'Version Control', level: 'Advanced' },
  ];

  return (
    <section id="about" className="section bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            Full-Stack Developer passionate about building scalable solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - About Text */}
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl"></div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 relative">
                Building the Future, <span className="gradient-text">One Line at a Time</span>
              </h3>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              With expertise spanning from system-level programming in C/C++ to modern JavaScript ecosystems, 
              I architect solutions that are both performant and maintainable. My journey in software development 
              combines strong fundamentals with practical experience in full-stack development.
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              I've led multiple projects from concept to deployment, focusing on clean code, optimal performance, 
              and user-centered design. Beyond technical skills, I bring leadership experience from social impact 
              projects and a problem-solving mindset that tackles complex challenges with innovative solutions.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <FiCode className="mr-2 text-primary-600" />
                Core Competencies
              </h3>
              
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.label} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <skill.icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {skill.label}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                        {skill.level}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full w-0 group-hover:w-full transition-all duration-1000"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Philosophy Card */}
            <div className="bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Development Philosophy</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span>Write clean, maintainable code with comprehensive documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span>Focus on performance optimization and scalable architecture</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span>Prioritize user experience and accessibility in every project</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

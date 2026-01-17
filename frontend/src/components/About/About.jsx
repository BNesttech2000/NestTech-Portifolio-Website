// frontend/src/components/About/About.jsx
import React from 'react';
import { 
  User, Target, Award, Clock, Code2, 
  Server, Database, Cpu, GitBranch, Zap 
} from 'lucide-react';

const About = () => {
  const skills = [
    { icon: Code2, label: 'React Development', level: 'Expert' },
    { icon: Server, label: 'Node.js Backend', level: 'Expert' },
    { icon: Database, label: 'Database Design', level: 'Advanced' },
    { icon: Cpu, label: 'C++ Programming', level: 'Expert' },
    { icon: GitBranch, label: 'Version Control', level: 'Advanced' },
    { icon: Zap, label: 'System Architecture', level: 'Intermediate' },
  ];

  const stats = [
    { value: '15+', label: 'Projects Completed', icon: Target },
    { value: '3+', label: 'Years Experience', icon: Clock },
    { value: '10+', label: 'Technologies', icon: Code2 },
    { value: '5+', label: 'Certifications', icon: Award },
  ];

  return (
    <section id="about" className="section bg-dark-50 dark:bg-dark-950">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - About Me */}
          <div className="animate-slide-in-left">
            {/* Section Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full mb-4">
                <User className="w-4 h-4" />
                <span className="text-sm font-semibold">About Me</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-white mb-4">
                Building the Future,
                <span className="gradient-text"> One Line at a Time</span>
              </h2>
              
              <p className="text-lg text-dark-600 dark:text-dark-400">
                Full-Stack Developer specializing in scalable web applications with modern technologies
              </p>
            </div>

            {/* About Text */}
            <div className="space-y-4 mb-8">
              <p className="text-dark-600 dark:text-dark-400">
                With expertise spanning from system-level programming in C/C++ to modern JavaScript ecosystems, 
                I architect solutions that are both performant and maintainable. My journey in software development 
                combines strong fundamentals with practical experience in full-stack development.
              </p>
              
              <p className="text-dark-600 dark:text-dark-400">
                I've led multiple projects from concept to deployment, focusing on clean code, optimal performance, 
                and user-centered design. Beyond technical skills, I bring leadership experience from social impact 
                projects and a problem-solving mindset that tackles complex challenges with innovative solutions.
              </p>
              
              <p className="text-dark-600 dark:text-dark-400">
                My approach is rooted in continuous learning and adapting to emerging technologies while maintaining 
                a strong foundation in computer science principles.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="text-center p-4 bg-white dark:bg-dark-800 rounded-xl shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-dark-600 dark:text-dark-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Skills & Image */}
          <div className="animate-slide-in-right">
            {/* Skills Grid */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">
                Core Competencies
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.label}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                      <skill.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-dark-900 dark:text-white">
                        {skill.label}
                      </div>
                      <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                        {skill.level}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Development Philosophy */}
            <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Development Philosophy</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <p>Write clean, maintainable code with comprehensive documentation</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <p>Focus on performance optimization and scalable architecture</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <p>Prioritize user experience and accessibility in every project</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
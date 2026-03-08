// src/components/Experience/Experience.jsx
import React from 'react';
import { 
  Briefcase, GraduationCap, Calendar, MapPin, 
  Award, TrendingUp, Code, Server, 
  Database, Cpu, GitBranch 
} from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      type: 'work',
      title: 'Full-Stack Developer',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      period: '2022 - Present',
      description: 'Led development of multiple web applications using React and Node.js.',
      achievements: [
        'Architected and deployed 5+ full-stack applications',
        'Reduced server response time by 60%',
        'Mentored 3 junior developers'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
      icon: Briefcase,
      color: 'text-blue-500'
    },
    {
      id: 2,
      type: 'work',
      title: 'Frontend Developer',
      company: 'Digital Agency',
      location: 'New York, NY',
      period: '2021 - 2022',
      description: 'Developed responsive web applications with focus on user experience.',
      achievements: [
        'Built 10+ client websites',
        'Improved site performance by 50%',
        'Reduced page load time by 40%'
      ],
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      icon: Code,
      color: 'text-purple-500'
    },
    {
      id: 3,
      type: 'education',
      title: 'Bachelor of Computer Science',
      institution: 'University of Technology',
      location: 'San Francisco, CA',
      period: '2018 - 2022',
      description: 'Specialized in Software Engineering and Web Development.',
      achievements: [
        'GPA: 3.8/4.0',
        "Dean's List all semesters",
        'President of Computer Science Club'
      ],
      technologies: ['C++', 'Java', 'Python', 'Data Structures'],
      icon: GraduationCap,
      color: 'text-green-500'
    },
    {
      id: 4,
      type: 'education',
      title: 'Full Stack Web Development Bootcamp',
      institution: 'Coding Academy',
      location: 'Online',
      period: '2021',
      description: 'Intensive program covering modern web development technologies.',
      achievements: [
        'Top 5% of cohort',
        'Built 4 major portfolio projects',
        'Completed 500+ hours of coding'
      ],
      technologies: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'],
      icon: Award,
      color: 'text-orange-500'
    }
  ];

  const skills = [
    { category: 'Frontend', icon: Code, items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'] },
    { category: 'Backend', icon: Server, items: ['Node.js', 'Express', 'Python', 'REST APIs'] },
    { category: 'Database', icon: Database, items: ['MongoDB', 'PostgreSQL', 'Redis'] },
    { category: 'DevOps', icon: GitBranch, items: ['Docker', 'AWS', 'Git', 'CI/CD'] },
    { category: 'Fundamentals', icon: Cpu, items: ['C++', 'Data Structures', 'Algorithms'] }
  ];

  return (
    <section id="experience" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="section-title">
            Experience <span className="gradient-text">& Education</span>
          </h2>
          <p className="section-subtitle">
            Professional journey and academic background
          </p>
        </div>

        {/* Timeline - Responsive */}
        <div className="relative max-w-3xl mx-auto px-2 sm:px-4">
          {/* Timeline Items */}
          <div className="space-y-6 sm:space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="relative bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-4 sm:p-5 lg:p-6"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className={`p-2 sm:p-2.5 rounded-xl ${exp.color.replace('text-', 'bg-')}/10 w-fit`}>
                    <exp.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${exp.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 sm:mb-2">
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white">
                        {exp.title}
                      </h3>
                      <span className="text-[10px] sm:text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 px-2 py-0.5 rounded-full w-fit">
                        {exp.type === 'work' ? 'Work' : 'Education'}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-gray-600 dark:text-gray-400 text-[10px] sm:text-xs">
                      <div className="flex items-center gap-1">
                        {exp.type === 'work' ? (
                          <Briefcase className="w-3 h-3" />
                        ) : (
                          <GraduationCap className="w-3 h-3" />
                        )}
                        <span>{exp.company || exp.institution}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                  {exp.description}
                </p>

                {/* Achievements */}
                <div className="mb-3 sm:mb-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Key Achievements
                  </h4>
                  <ul className="space-y-1">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Award className="w-3 h-3 text-primary-500 mt-0.5 flex-shrink-0" />
                        <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 sm:px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-[9px] sm:text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Matrix */}
        <div className="mt-10 sm:mt-12 lg:mt-16">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Technical Skills
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive skill set across multiple domains
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {skills.map((skillCategory, index) => (
              <div
                key={skillCategory.category}
                className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <skillCategory.icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                    {skillCategory.category}
                  </h4>
                </div>

                <div className="space-y-2">
                  {skillCategory.items.map((skill) => (
                    <div key={skill} className="group">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] sm:text-xs text-gray-700 dark:text-gray-300">
                          {skill}
                        </span>
                        <span className="text-[8px] sm:text-[10px] font-bold text-primary-600 dark:text-primary-400">
                          {Math.floor(Math.random() * 20) + 80}%
                        </span>
                      </div>
                      <div className="h-1 sm:h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                          style={{ width: `${Math.floor(Math.random() * 20) + 80}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
// frontend/src/components/Experience/Experience.jsx
import React from 'react';
import { 
  Briefcase, GraduationCap, Calendar, MapPin, 
  Award, TrendingUp, Users, Code, Server, 
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
      description: 'Led development of multiple web applications using React and Node.js. Improved application performance by 40% through optimization techniques.',
      achievements: [
        'Architected and deployed 5+ full-stack applications',
        'Reduced server response time by 60% through database optimization',
        'Mentored 3 junior developers in best practices',
        'Implemented CI/CD pipeline reducing deployment time by 70%'
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
      description: 'Developed responsive web applications with focus on user experience and accessibility.',
      achievements: [
        'Built 10+ client websites with 95%+ accessibility scores',
        'Improved site performance scores by 50%',
        'Collaborated with design team on component library',
        'Reduced page load time by 40%'
      ],
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL'],
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
      description: 'Specialized in Software Engineering and Web Development. Graduated with Honors.',
      achievements: [
        'GPA: 3.8/4.0',
        'Dean\'s List all semesters',
        'President of Computer Science Club',
        'Published research paper on algorithm optimization'
      ],
      technologies: ['C++', 'Java', 'Python', 'Data Structures', 'Algorithms'],
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
      description: 'Intensive program covering modern web development technologies and best practices.',
      achievements: [
        'Top 5% of cohort',
        'Built 4 major portfolio projects',
        'Received Excellence in Backend Development award',
        'Completed 500+ hours of coding'
      ],
      technologies: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'],
      icon: Award,
      color: 'text-orange-500'
    }
  ];

  const skills = [
    { category: 'Frontend', icon: Code, items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux'] },
    { category: 'Backend', icon: Server, items: ['Node.js', 'Express', 'Python', 'REST APIs', 'GraphQL'] },
    { category: 'Database', icon: Database, items: ['MongoDB', 'PostgreSQL', 'Redis', 'MySQL', 'Firebase'] },
    { category: 'DevOps', icon: GitBranch, items: ['Docker', 'AWS', 'Git', 'CI/CD', 'NGINX'] },
    { category: 'Fundamentals', icon: Cpu, items: ['C++', 'Data Structures', 'Algorithms', 'OOP', 'System Design'] }
  ];

  return (
    <section id="experience" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            Experience <span className="gradient-text">& Education</span>
          </h2>
          <p className="section-subtitle">
            Professional journey and academic background in technology
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500 to-secondary-500 hidden lg:block"></div>

          {/* Timeline Items */}
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative mb-12 lg:w-1/2 ${index % 2 === 0 ? 'lg:ml-0 lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'} animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Timeline Dot */}
              <div className={`absolute top-6 ${
                index % 2 === 0 ? 'lg:right-[-6px]' : 'lg:left-[-6px]'
              } w-4 h-4 rounded-full border-4 border-white dark:border-dark-800 bg-primary-500 z-10 hidden lg:block`}></div>

              {/* Content Card */}
              <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${exp.color.replace('text-', 'bg-')}/10`}>
                    <exp.icon className={`w-6 h-6 ${exp.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-xl font-bold text-dark-900 dark:text-white">
                        {exp.title}
                      </h3>
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 px-3 py-1 rounded-full">
                        {exp.type === 'work' ? 'Work' : 'Education'}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-dark-600 dark:text-dark-400 text-sm">
                      <div className="flex items-center gap-1">
                        {exp.type === 'work' ? (
                          <Briefcase className="w-4 h-4" />
                        ) : (
                          <GraduationCap className="w-4 h-4" />
                        )}
                        <span>{exp.company || exp.institution}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-dark-600 dark:text-dark-400 mb-6">
                  {exp.description}
                </p>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-3">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                        <span className="text-dark-600 dark:text-dark-400">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-300 rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Matrix */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-dark-900 dark:text-white mb-4">
              Technical Skills Matrix
            </h3>
            <p className="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
              Comprehensive skill set across multiple domains of software development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillCategory, index) => (
              <div
                key={skillCategory.category}
                className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30">
                    <skillCategory.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h4 className="text-xl font-bold text-dark-900 dark:text-white">
                    {skillCategory.category}
                  </h4>
                </div>

                <div className="space-y-3">
                  {skillCategory.items.map((skill) => (
                    <div key={skill} className="group">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-dark-700 dark:text-dark-300 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {skill}
                        </span>
                        <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                          {Math.floor(Math.random() * 30) + 70}%
                        </span>
                      </div>
                      <div className="h-2 bg-dark-100 dark:bg-dark-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${Math.floor(Math.random() * 30) + 70}%`,
                            '--target-width': `${Math.floor(Math.random() * 30) + 70}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-6 text-white text-center">
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-sm opacity-90">Projects Completed</div>
              <TrendingUp className="w-8 h-8 mx-auto mt-4 opacity-80" />
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white text-center">
              <div className="text-3xl font-bold mb-2">3+</div>
              <div className="text-sm opacity-90">Years Experience</div>
              <Calendar className="w-8 h-8 mx-auto mt-4 opacity-80" />
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl p-6 text-white text-center">
              <div className="text-3xl font-bold mb-2">10+</div>
              <div className="text-sm opacity-90">Technologies</div>
              <Code className="w-8 h-8 mx-auto mt-4 opacity-80" />
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white text-center">
              <div className="text-3xl font-bold mb-2">5+</div>
              <div className="text-sm opacity-90">Certifications</div>
              <Award className="w-8 h-8 mx-auto mt-4 opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
import React from 'react';
import { 
  FiCode, FiServer, FiDatabase, FiCpu, 
  FiGitBranch, FiCloud, FiLayout, FiTool 
} from 'react-icons/fi';

const Skills = () => {
  const skillsData = [
    {
      category: 'Frontend',
      icon: FiLayout,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      skills: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'JavaScript/ES6+', level: 95 },
        { name: 'HTML5/CSS3', level: 98 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Redux/Context API', level: 88 },
      ]
    },
    {
      category: 'Backend',
      icon: FiServer,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      skills: [
        { name: 'Node.js', level: 92 },
        { name: 'Express.js', level: 90 },
        { name: 'REST APIs', level: 94 },
        { name: 'GraphQL', level: 82 },
        { name: 'MongoDB', level: 88 },
        { name: 'PostgreSQL', level: 85 },
      ]
    },
    {
      category: 'Fundamentals',
      icon: FiCpu,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      skills: [
        { name: 'C++', level: 90 },
        { name: 'C Programming', level: 88 },
        { name: 'Data Structures', level: 92 },
        { name: 'Algorithms', level: 90 },
        { name: 'OOP Principles', level: 94 },
        { name: 'System Design', level: 85 },
      ]
    },
    {
      category: 'Tools & DevOps',
      icon: FiGitBranch,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      skills: [
        { name: 'Git & GitHub', level: 96 },
        { name: 'Docker', level: 82 },
        { name: 'AWS', level: 78 },
        { name: 'Jest/Testing', level: 85 },
        { name: 'CI/CD', level: 80 },
        { name: 'Linux', level: 75 },
      ]
    }
  ];

  return (
    <section id="skills" className="section bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="section-subtitle">
            Continuously evolving toolkit for modern web development
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillsData.map((category, index) => (
            <div 
              key={category.category}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 rounded-xl ${category.bgColor}`}>
                  <category.icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.category}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {category.skills.length} skills
                  </p>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Additional Competencies
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              'Web Performance Optimization',
              'Responsive Design',
              'Cross-browser Compatibility',
              'SEO Best Practices',
              'Accessibility (WCAG)',
              'Microservices Architecture',
              'RESTful API Design',
              'Authentication & Authorization',
              'Database Optimization',
              'Agile/Scrum'
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

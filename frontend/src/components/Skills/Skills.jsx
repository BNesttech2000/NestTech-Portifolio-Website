// frontend/src/components/Skills/Skills.jsx
import React from 'react';
import { 
  Code, Server, Database, Cpu, GitBranch, 
  Layers, Zap, Palette, Shield, Cloud 
} from 'lucide-react';

const Skills = () => {
  const skillsData = [
    {
      category: 'Frontend',
      icon: Code,
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
      icon: Server,
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
      icon: Cpu,
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
      category: 'Tools & Others',
      icon: GitBranch,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      skills: [
        { name: 'Git & GitHub', level: 96 },
        { name: 'Docker', level: 82 },
        { name: 'AWS Basics', level: 78 },
        { name: 'Jest/Testing', level: 85 },
        { name: 'Figma/UI Design', level: 80 },
        { name: 'Agile/Scrum', level: 88 },
      ]
    }
  ];

  return (
    <section id="skills" className="section bg-dark-50 dark:bg-dark-950">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="gradient-text">Technical</span> Expertise
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
              className="card animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${category.bgColor}`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white">
                    {category.category}
                  </h3>
                  <p className="text-dark-500 dark:text-dark-400 text-sm">
                    {category.skills.length} skills
                  </p>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-dark-700 dark:text-dark-300 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-dark-100 dark:bg-dark-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${skill.level}%`,
                          '--target-width': `${skill.level}%`
                        }}
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
          <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-8">
            Additional Competencies
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {[
              'Web Performance Optimization',
              'Responsive Design',
              'Cross-browser Compatibility',
              'SEO Best Practices',
              'Accessibility Standards',
              'CI/CD Pipelines',
              'Microservices Architecture',
              'RESTful API Design',
              'Authentication & Authorization',
              'Database Optimization'
            ].map((skill, index) => (
              <div 
                key={skill}
                className="px-4 py-2 bg-white dark:bg-dark-800 rounded-full border border-dark-200 dark:border-dark-700 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-dark-700 dark:text-dark-300 font-medium text-sm">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
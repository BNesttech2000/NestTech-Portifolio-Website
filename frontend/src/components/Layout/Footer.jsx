// frontend/src/components/Layout/Footer.jsx
import React from 'react';
import { 
  Heart, Code, Mail, Github, Linkedin, 
  Twitter, ArrowUp, ExternalLink 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/nesttech', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/nesttech', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/nesttechdev', label: 'Twitter' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-900 text-white pt-16 pb-8">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">NT</span>
              </div>
              <div>
                <div className="font-bold text-xl">NestTech</div>
                <div className="text-dark-400 text-sm">Full-Stack Developer</div>
              </div>
            </div>
            <p className="text-dark-400 mb-6">
              Building exceptional digital experiences with modern technologies 
              and innovative solutions.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-dark-800 text-dark-400 hover:bg-dark-700 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-dark-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowUp className="w-3 h-3 rotate-45 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-bold mb-6">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'TypeScript', 'MongoDB', 'Tailwind', 'AWS'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-dark-800 text-dark-400 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <a
                href="mailto:hello@nesttech.dev"
                className="flex items-center gap-3 text-dark-400 hover:text-white transition-colors group"
              >
                <Mail className="w-5 h-5" />
                <span>hello@nesttech.dev</span>
              </a>
              <div className="flex items-center gap-3 text-dark-400">
                <div className="w-5 h-5"></div>
                <span>Based in San Francisco, CA</span>
              </div>
              <div className="pt-6 border-t border-dark-800">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dark-800 pt-8">
          {/* Newsletter (Optional) */}
          <div className="mb-8 text-center">
            <h4 className="text-lg font-bold mb-4">Stay Updated</h4>
            <div className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="px-6 py-2 bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-dark-400 text-center md:text-left">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span>© {currentYear} NestTech. All rights reserved.</span>
              </p>
              <p className="text-sm mt-2 flex items-center justify-center md:justify-start gap-1">
                <Code className="w-4 h-4" />
                <span>Built with React & Node.js</span>
                <Heart className="w-4 h-4 text-red-500 ml-2" />
              </p>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="p-3 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors group"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Attribution */}
          <div className="text-center text-dark-500 text-sm mt-8">
            <p>
              Designed and developed by NestTech • 
              <a 
                href="https://github.com/nesttech/nesttech-portfolio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-white transition-colors ml-2"
              >
                View source on GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
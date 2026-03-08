// // frontend/src/components/Layout/Navigation.jsx
// import React, { useState, useEffect } from 'react';
// import { Menu, X, Moon, Sun, Download } from 'lucide-react';

// const Navigation = ({ darkMode, toggleDarkMode }) => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState('home');

//   const navItems = [
//     { id: 'home', label: 'Home' },
//     { id: 'about', label: 'About' },
//     { id: 'skills', label: 'Skills' },
//     { id: 'projects', label: 'Projects' },
//     { id: 'certificates', label: 'Certificates' },
//     { id: 'experience', label: 'Experience' },
//     { id: 'contact', label: 'Contact' },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
      
//       const sections = navItems.map(item => document.getElementById(item.id));
//       const scrollPosition = window.scrollY + 100;

//       sections.forEach((section, index) => {
//         if (section) {
//           const sectionTop = section.offsetTop;
//           const sectionBottom = sectionTop + section.offsetHeight;
          
//           if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
//             setActiveSection(navItems[index].id);
//           }
//         }
//       });
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [navItems]);

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       const offset = 80;
//       const bodyRect = document.body.getBoundingClientRect().top;
//       const elementRect = element.getBoundingClientRect().top;
//       const elementPosition = elementRect - bodyRect;
//       const offsetPosition = elementPosition - offset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth'
//       });
//     }
//     setMobileMenuOpen(false);
//   };

//   const handleDownloadCV = () => {
//     const link = document.createElement('a');
//     link.href = '/resume.pdf';
//     link.download = 'NestTech_Resume.pdf';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <>
//       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled 
//           ? 'bg-white/90 dark:bg-dark-900/90 backdrop-blur-lg shadow-lg py-3' 
//           : 'bg-transparent py-5'
//       }`}>
//         <div className="container">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <div 
//               className="flex items-center gap-3 cursor-pointer group"
//               onClick={() => scrollToSection('home')}
//             >
//               <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
//                 <span className="text-white font-bold text-lg">NT</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="font-bold text-lg leading-tight text-dark-900 dark:text-white">NestTech</span>
//                 <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">Full-Stack Developer</span>
//               </div>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center gap-8">
//               {navItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => scrollToSection(item.id)}
//                   className={`relative px-1 py-2 text-sm font-medium transition-colors ${
//                     activeSection === item.id
//                       ? 'text-primary-600 dark:text-primary-400'
//                       : 'text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white'
//                   }`}
//                 >
//                   {item.label}
//                   {activeSection === item.id && (
//                     <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse"></span>
//                   )}
//                 </button>
//               ))}
//             </div>

//             {/* Right Side Controls */}
//             <div className="flex items-center gap-4">
//               {/* Theme Toggle */}
//               <button
//                 onClick={toggleDarkMode}
//                 className="p-2 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors"
//                 aria-label="Toggle theme"
//               >
//                 {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//               </button>

//               {/* Download CV Button (Desktop) */}
//               <button
//                 onClick={handleDownloadCV}
//                 className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
//               >
//                 <Download size={18} />
//                 <span className="font-medium">Resume</span>
//               </button>

//               {/* Mobile Menu Button */}
//               <button
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="lg:hidden p-2 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors"
//                 aria-label="Toggle menu"
//               >
//                 {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
//         mobileMenuOpen
//           ? 'opacity-100 visible'
//           : 'opacity-0 invisible pointer-events-none'
//       }`}>
//         {/* Backdrop */}
//         <div 
//           className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//           onClick={() => setMobileMenuOpen(false)}
//         />
        
//         {/* Menu Panel */}
//         <div className={`absolute right-0 top-0 h-full w-80 bg-white dark:bg-dark-800 shadow-2xl transform transition-transform duration-300 ${
//           mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}>
//           <div className="p-6 h-full flex flex-col">
//             {/* Menu Header */}
//             <div className="flex items-center justify-between mb-8">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
//                   <span className="text-white font-bold text-lg">NT</span>
//                 </div>
//                 <span className="font-bold text-lg text-dark-900 dark:text-white">NestTech</span>
//               </div>
//               <button
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             {/* Menu Items */}
//             <div className="flex-1 space-y-2">
//               {navItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => scrollToSection(item.id)}
//                   className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
//                     activeSection === item.id
//                       ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-semibold'
//                       : 'text-dark-700 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-700'
//                   }`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>

//             {/* Menu Footer */}
//             <div className="pt-6 border-t border-dark-200 dark:border-dark-700">
//               <button
//                 onClick={handleDownloadCV}
//                 className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
//               >
//                 <Download size={20} />
//                 Download Resume
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navigation;




// src/components/Layout/Navigation.jsx
import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Download } from 'lucide-react'; // Removed Lock import

const Navigation = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'NestTech_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg py-2 sm:py-3' 
          : 'bg-transparent py-3 sm:py-4 lg:py-5'
      }`}>
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
              onClick={() => scrollToSection('home')}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-sm sm:text-lg">NT</span>
              </div>
              <div className="hidden xs:flex flex-col">
                <span className="font-bold text-sm sm:text-base lg:text-lg leading-tight text-gray-900 dark:text-white">
                  NestTech
                </span>
                <span className="text-xs text-primary-600 dark:text-primary-400 font-medium hidden sm:block">
                  Full-Stack Developer
                </span>
              </div>
            </div>

            {/* Desktop Navigation - Hidden on mobile/tablet */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-2 py-1 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeSection === item.id
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>

              {/* Download CV Button - Hidden on mobile */}
              <button
                onClick={handleDownloadCV}
                className="hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                <span className="hidden lg:inline">Resume</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white dark:bg-gray-900 z-40 transform transition-transform duration-300 lg:hidden ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full pt-20 pb-8 px-6 overflow-y-auto">
          <div className="flex-1 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-4 rounded-lg transition-colors text-base ${
                  activeSection === item.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={handleDownloadCV}
              className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-base"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
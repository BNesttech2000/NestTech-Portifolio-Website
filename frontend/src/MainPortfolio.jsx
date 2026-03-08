// import React, { useState, useEffect } from 'react';
// import Navigation from './components/Layout/Navigation';
// import Home from './components/Home/Home';
// import About from './components/About/About';
// import Skills from './components/Skills/Skills';
// import Projects from './components/Projects/Projects';
// import Certificates from './components/Certificates/Certificates';
// import Experience from './components/Experience/Experience';
// import Contact from './components/Contact/Contact';
// import Footer from './components/Layout/Footer';
// import ScrollToTop from './components/Layout/ScrollToTop';
// import LoadingScreen from './components/Layout/LoadingScreen';
// import './index.css';

// function MainPortfolio() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [typedKeys, setTypedKeys] = useState([]);

//   // Dark mode effect
//   useEffect(() => {
//     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//     const savedTheme = localStorage.getItem('theme');
    
//     if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
//       setDarkMode(true);
//       document.documentElement.classList.add('dark');
//     }
    
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1500);
    
//     return () => clearTimeout(timer);
//   }, []);

//   // Secret keyboard shortcut effect
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       const key = e.key.toLowerCase();
      
//       if (key.length === 1 && /[a-z]/.test(key)) {
//         setTypedKeys(prev => {
//           const newKeys = [...prev, key];
//           if (newKeys.length > 9) newKeys.shift();
          
//           if (newKeys.join('') === 'nestadmin') {
//             window.location.href = '/admin/login';
//             return [];
//           }
          
//           return newKeys;
//         });
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     if (!darkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   };

//   if (loading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <div className={`min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300`}>
//       <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
//       <main>
//         <Home />
//         <About />
//         <Skills />
//         <Projects />
//         <Certificates />
//         <Experience />
//         <Contact />
//       </main>
//       <Footer />
//       <ScrollToTop />
//     </div>
//   );
// }

// export default MainPortfolio;





// src/MainPortfolio.jsx
import React, { useState, useEffect } from 'react';
import Navigation from './components/Layout/Navigation';
import Home from './components/Home/Home';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Certificates from './components/Certificates/Certificates';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import Footer from './components/Layout/Footer';
import ScrollToTop from './components/Layout/ScrollToTop';
import LoadingScreen from './components/Layout/LoadingScreen';
import './index.css';

function MainPortfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [typedKeys, setTypedKeys] = useState([]);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // 🎮 FIXED SECRET KEYBOARD SHORTCUT - Type "nestadmin" anywhere
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in an input, textarea, or contenteditable
      const target = e.target;
      const isInput = target.tagName === 'INPUT' || 
                      target.tagName === 'TEXTAREA' || 
                      target.isContentEditable;
      
      if (isInput) {
        return; // Don't trigger shortcut when typing in forms
      }

      // Safely get the key
      const key = e.key;
      if (!key) return; // Exit if key is undefined
      
      const lowerKey = key.toLowerCase();
      
      // Only track letters
      if (lowerKey.length === 1 && /[a-z]/.test(lowerKey)) {
        setTypedKeys(prev => {
          const newKeys = [...prev, lowerKey];
          // Keep only the last 9 keys
          if (newKeys.length > 9) {
            newKeys.shift();
          }
          
          // Check if the typed sequence matches "nestadmin"
          if (newKeys.join('') === 'nestadmin') {
            console.log('🎮 Secret code entered! Redirecting to admin...');
            window.location.href = '/admin/login';
            return [];
          }
          
          return newKeys;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300`}>
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default MainPortfolio;
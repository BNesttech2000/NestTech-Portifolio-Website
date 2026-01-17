// frontend/src/components/Layout/LoadingScreen.jsx
import React, { useEffect, useState } from 'react';
import { Code, Server, Database, Cpu } from 'lucide-react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('Initializing portfolio...');

  const loadingTexts = [
    'Initializing portfolio...',
    'Loading components...',
    'Connecting to database...',
    'Compiling styles...',
    'Almost ready...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const textInterval = setInterval(() => {
      setCurrentText((prev) => {
        const currentIndex = loadingTexts.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingTexts.length;
        return loadingTexts[nextIndex];
      });
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  const icons = [
    { icon: Code, color: 'text-blue-500', delay: '0s' },
    { icon: Server, color: 'text-green-500', delay: '0.2s' },
    { icon: Database, color: 'text-purple-500', delay: '0.4s' },
    { icon: Cpu, color: 'text-orange-500', delay: '0.6s' }
  ];

  return (
    <div className="fixed inset-0 bg-dark-900 z-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
          <div className="relative bg-dark-800 rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-center gap-4 mb-6">
              {icons.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl bg-dark-700 animate-bounce`}
                  style={{ animationDelay: item.delay, animationDuration: '1.5s' }}
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
              ))}
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              Nest<span className="text-primary-400">Tech</span>
            </div>
            <div className="text-dark-400">Full-Stack Developer Portfolio</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-dark-400 mb-2">
            <span>{currentText}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>

        {/* Footer Text */}
        <p className="text-dark-500 text-sm mt-8">
          Crafting exceptional digital experiences
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
import React, { useState, useEffect } from 'react';

const SecretIndicator = ({ typedKeys }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (typedKeys.length > 0) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [typedKeys]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg shadow-2xl animate-bounce">
      <div className="flex items-center gap-2">
        <span className="text-xl">í¾®</span>
        <span>Secret: {typedKeys.join('')}</span>
      </div>
    </div>
  );
};

export default SecretIndicator;

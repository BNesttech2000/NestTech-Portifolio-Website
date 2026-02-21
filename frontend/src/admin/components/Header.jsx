import React from 'react';
import { FiMenu, FiBell, FiUser } from 'react-icons/fi';

const Header = ({ sidebarOpen, setSidebarOpen, user }) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden text-gray-600 hover:text-gray-900"
        >
          <FiMenu size={24} />
        </button>

        <div className="flex-1"></div>

        <div className="flex items-center space-x-4">
          <button className="relative text-gray-600 hover:text-gray-900">
            <FiBell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center space-x-2 border-l pl-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <FiUser className="text-white" />
            </div>
            <span className="text-sm font-medium hidden sm:block">
              {user?.username}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

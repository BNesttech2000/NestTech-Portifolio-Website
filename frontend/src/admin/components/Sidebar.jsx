import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, FiFolder, FiAward, FiMail, FiSettings, 
  FiLogOut, FiBarChart2, FiMenu, FiX 
} from 'react-icons/fi';

const Sidebar = ({ sidebarOpen, setSidebarOpen, user, onLogout }) => {
  const menuItems = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: FiHome },
    { path: '/admin/projects', name: 'Projects', icon: FiFolder },
    { path: '/admin/certificates', name: 'Certificates', icon: FiAward },
    { path: '/admin/messages', name: 'Messages', icon: FiMail },
    { path: '/admin/settings', name: 'Settings', icon: FiSettings },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-gradient-to-b from-blue-900 to-purple-900 text-white flex flex-col`}>
        
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold">NestTech</h1>
          <p className="text-sm text-blue-200 mt-1">Admin Panel</p>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
              <span className="text-lg font-bold text-white">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <p className="font-medium">{user?.username}</p>
              <p className="text-xs text-blue-200 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'text-blue-100 hover:bg-white/10'
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="flex items-center px-4 py-3 w-full text-blue-100 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

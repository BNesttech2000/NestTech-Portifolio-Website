import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './admin.css';

const AdminApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsAuthenticated(true);
        setUser(parsedUser);
        console.log('✅ User already authenticated:', parsedUser.username);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      }
    }
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    console.log('✅ Login successful:', userData.username);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    setUser(null);
    console.log('✅ Logout successful');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <Routes>
        {/* PUBLIC ROUTE - Login page - Always accessible */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              <Navigate to="/admin/dashboard" replace /> : 
              <Login onLogin={handleLogin} />
          } 
        />

        {/* PROTECTED ROUTES - Only accessible when logged in */}
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (
              <div className="flex h-screen bg-gray-100">
                <Sidebar 
                  sidebarOpen={sidebarOpen} 
                  setSidebarOpen={setSidebarOpen}
                  user={user}
                  onLogout={handleLogout}
                />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header 
                    sidebarOpen={sidebarOpen} 
                    setSidebarOpen={setSidebarOpen}
                    user={user}
                  />
                  <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Dashboard user={user} />
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          } 
        />

        <Route 
          path="/projects" 
          element={
            isAuthenticated ? (
              <div className="flex h-screen bg-gray-100">
                <Sidebar 
                  sidebarOpen={sidebarOpen} 
                  setSidebarOpen={setSidebarOpen}
                  user={user}
                  onLogout={handleLogout}
                />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header 
                    sidebarOpen={sidebarOpen} 
                    setSidebarOpen={setSidebarOpen}
                    user={user}
                  />
                  <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Projects />
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          } 
        />

        <Route 
          path="/certificates" 
          element={
            isAuthenticated ? (
              <div className="flex h-screen bg-gray-100">
                <Sidebar 
                  sidebarOpen={sidebarOpen} 
                  setSidebarOpen={setSidebarOpen}
                  user={user}
                  onLogout={handleLogout}
                />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header 
                    sidebarOpen={sidebarOpen} 
                    setSidebarOpen={setSidebarOpen}
                    user={user}
                  />
                  <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Certificates />
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          } 
        />

        <Route 
          path="/messages" 
          element={
            isAuthenticated ? (
              <div className="flex h-screen bg-gray-100">
                <Sidebar 
                  sidebarOpen={sidebarOpen} 
                  setSidebarOpen={setSidebarOpen}
                  user={user}
                  onLogout={handleLogout}
                />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header 
                    sidebarOpen={sidebarOpen} 
                    setSidebarOpen={setSidebarOpen}
                    user={user}
                  />
                  <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Messages />
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          } 
        />

        <Route 
          path="/settings" 
          element={
            isAuthenticated ? (
              <div className="flex h-screen bg-gray-100">
                <Sidebar 
                  sidebarOpen={sidebarOpen} 
                  setSidebarOpen={setSidebarOpen}
                  user={user}
                  onLogout={handleLogout}
                />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header 
                    sidebarOpen={sidebarOpen} 
                    setSidebarOpen={setSidebarOpen}
                    user={user}
                  />
                  <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Settings user={user} />
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          } 
        />

        {/* Redirect root to login or dashboard based on auth status */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              <Navigate to="/admin/dashboard" replace /> : 
              <Navigate to="/admin/login" replace />
          } 
        />

        {/* Catch all - redirect to login */}
        <Route 
          path="*" 
          element={<Navigate to="/admin/login" replace />} 
        />
      </Routes>
    </div>
  );
};

export default AdminApp;

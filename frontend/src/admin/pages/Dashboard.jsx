import React, { useState, useEffect } from 'react';
import { 
  FiFolder, FiAward, FiMail, FiEye, 
  FiTrendingUp, FiCalendar, FiClock, FiAlertCircle
} from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    projects: 0,
    certificates: 0,
    messages: 0,
    unreadMessages: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create axios instance with token
  const getApi = () => {
    const token = localStorage.getItem('adminToken');
    return axios.create({
      baseURL: 'http://localhost:5000/api/admin',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setError(null);
      const api = getApi();
      
      // Fetch projects
      const projectsRes = await api.get('/projects?limit=5').catch(err => {
        console.log('Projects error:', err.response?.status);
        return { data: { data: [] } };
      });
      
      // Fetch certificates
      const certificatesRes = await api.get('/certificates?limit=5').catch(err => {
        console.log('Certificates error:', err.response?.status);
        return { data: { data: [] } };
      });
      
      // Fetch messages
      const messagesRes = await api.get('/messages?limit=5').catch(err => {
        console.log('Messages error:', err.response?.status);
        return { data: { data: [] } };
      });

      // Update stats
      setStats({
        projects: projectsRes.data.data?.length || 0,
        certificates: certificatesRes.data.data?.length || 0,
        messages: messagesRes.data.data?.length || 0,
        unreadMessages: messagesRes.data.data?.filter(m => !m.read).length || 0
      });

      // Create recent activities
      const activities = [
        ...(projectsRes.data.data || []).map(p => ({
          type: 'project',
          action: 'Project added',
          name: p.title,
          time: p.createdAt || new Date(),
          icon: FiFolder,
          color: 'text-blue-600'
        })),
        ...(certificatesRes.data.data || []).map(c => ({
          type: 'certificate',
          action: 'Certificate added',
          name: c.title,
          time: c.createdAt || new Date(),
          icon: FiAward,
          color: 'text-purple-600'
        })),
        ...(messagesRes.data.data || []).map(m => ({
          type: 'message',
          action: 'New message',
          name: `From: ${m.name}`,
          time: m.createdAt || new Date(),
          icon: FiMail,
          color: m.read ? 'text-gray-600' : 'text-green-600'
        }))
      ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10);

      setRecentActivities(activities);
    } catch (error) {
      console.error('Dashboard error:', error);
      setError('Failed to load dashboard data');
      
      // Check if token is invalid
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        window.location.href = '/admin/login';
      }
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Welcome back, {user?.username}! í±‹</h1>
        <p className="text-blue-100 mt-2">
          Here's what's happening with your portfolio today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Projects" 
          value={stats.projects} 
          icon={FiFolder} 
          color="blue"
        />
        <StatCard 
          title="Certificates" 
          value={stats.certificates} 
          icon={FiAward} 
          color="purple"
        />
        <StatCard 
          title="Total Messages" 
          value={stats.messages} 
          icon={FiMail} 
          color="green"
        />
        <StatCard 
          title="Unread Messages" 
          value={stats.unreadMessages} 
          icon={FiEye} 
          color="red"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        {recentActivities.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No recent activity</p>
        ) : (
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-lg ${activity.color?.replace('text', 'bg')}-100`}>
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.name}</p>
                  <p className="text-xs text-gray-400 mt-1 flex items-center">
                    <FiClock className="mr-1" />
                    {new Date(activity.time).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

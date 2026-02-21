import React, { useState, useEffect } from 'react';
import { 
  FiFolder, FiAward, FiMail, FiEye, 
  FiTrendingUp, FiCalendar, FiClock 
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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const api = axios.create({
    baseURL: 'http://localhost:5000/api/admin',
    headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
  });

  const fetchDashboardData = async () => {
    try {
      const [projects, certificates, messages] = await Promise.all([
        api.get('/projects?limit=5'),
        api.get('/certificates?limit=5'),
        api.get('/messages?limit=5')
      ]);

      setStats({
        projects: projects.data.pagination?.total || projects.data.data.length,
        certificates: certificates.data.data.length,
        messages: messages.data.data.length,
        unreadMessages: messages.data.data.filter(m => !m.read).length
      });

      // Create recent activities
      const activities = [
        ...projects.data.data.map(p => ({
          type: 'project',
          action: 'Project added',
          name: p.title,
          time: p.createdAt,
          icon: FiFolder,
          color: 'text-blue-600'
        })),
        ...certificates.data.data.map(c => ({
          type: 'certificate',
          action: 'Certificate added',
          name: c.title,
          time: c.createdAt,
          icon: FiAward,
          color: 'text-purple-600'
        })),
        ...messages.data.data.map(m => ({
          type: 'message',
          action: 'New message',
          name: `From: ${m.name}`,
          time: m.createdAt,
          icon: FiMail,
          color: 'text-green-600'
        }))
      ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10);

      setRecentActivities(activities);
    } catch (error) {
      toast.error('Error fetching dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        {trend && (
          <span className="text-green-500 text-sm flex items-center">
            <FiTrendingUp className="mr-1" />
            {trend}%
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
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
          trend="+2"
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
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`p-2 rounded-lg bg-${activity.color?.split('-')[1]}-100`}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.name}</p>
                <p className="text-xs text-gray-400 mt-1 flex items-center">
                  <FiClock className="mr-1" />
                  {new Date(activity.time).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

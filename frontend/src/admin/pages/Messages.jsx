import React, { useState, useEffect } from 'react';
import { FiMail, FiUser, FiCalendar, FiCheck, FiTrash2, FiEye } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

// ✅ ADD THIS LINE - Environment variable for API URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // ✅ FIXED - Now uses environment variable
  const api = axios.create({
    baseURL: `${API_URL}/api/admin`,  // ✅ Now dynamic!
    headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.get('/messages');
      setMessages(response.data.data);
    } catch (error) {
      toast.error('Error fetching messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.patch(`/messages/${id}/read`);
      setMessages(messages.map(msg => 
        msg._id === id ? { ...msg, read: true } : msg
      ));
    } catch (error) {
      toast.error('Error updating message');
    }
  };

  const markAsReplied = async (id) => {
    try {
      await api.patch(`/messages/${id}/replied`);
      setMessages(messages.map(msg => 
        msg._id === id ? { ...msg, replied: true } : msg
      ));
      toast.success('Marked as replied');
    } catch (error) {
      toast.error('Error updating message');
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(`/messages/${id}`);
        setMessages(messages.filter(msg => msg._id !== id));
        toast.success('Message deleted');
      } catch (error) {
        toast.error('Error deleting message');
      }
    }
  };

  const viewMessage = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
    if (!message.read) {
      markAsRead(message._id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Contact Messages</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {messages.map((message) => (
              <tr key={message._id} className={`hover:bg-gray-50 ${!message.read ? 'bg-blue-50' : ''}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {!message.read && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                    {message.replied && (
                      <FiCheck className="text-green-600" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{message.name}</div>
                  <div className="text-sm text-gray-500">{message.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{message.subject || 'No subject'}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {message.message?.substring(0, 50)}...
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => viewMessage(message)}
                      className="text-blue-600 hover:text-blue-800"
                      title="View"
                    >
                      <FiEye />
                    </button>
                    {!message.replied && (
                      <button
                        onClick={() => markAsReplied(message._id)}
                        className="text-green-600 hover:text-green-800"
                        title="Mark as replied"
                      >
                        <FiCheck />
                      </button>
                    )}
                    <button
                      onClick={() => deleteMessage(message._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Message Modal */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Message Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FiUser className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{selectedMessage.name}</h3>
                  <p className="text-gray-600">{selectedMessage.email}</p>
                  <p className="text-sm text-gray-400">
                    <FiCalendar className="inline mr-1" />
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Subject:</h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">
                  {selectedMessage.subject || 'No subject'}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Message:</h4>
                <p className="text-gray-700 bg-gray-50 p-4 rounded whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-semibold mb-2">Quick Reply:</h4>
                <p className="text-sm text-gray-600">
                  Email: <a href={`mailto:${selectedMessage.email}`} className="text-blue-600">
                    {selectedMessage.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="p-6 border-t flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <a
                href={`mailto:${selectedMessage.email}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;

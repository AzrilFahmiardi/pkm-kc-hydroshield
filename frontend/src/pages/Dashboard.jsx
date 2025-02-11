import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Droplets, Bell, History as HistoryIcon, Map, Settings, HelpCircle, User, LogOut, AlertTriangle, Power, Gauge, Menu, X } from 'lucide-react';
import FloodAlerts from '../components/FloodAlerts';
import PumpControl from '../components/PumpControl';
import HistoryComponent from '../components/History';
import AreaMap from '../components/AreaMap';
import Setting from '../components/Setting';

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Simulated real-time water level data
  const waterLevelData = [
    { time: '00:00', level: 2.5, flowRate: 150, risk: 'low' },
    { time: '04:00', level: 3.2, flowRate: 180, risk: 'medium' },
    { time: '08:00', level: 4.1, flowRate: 220, risk: 'high' },
    { time: '12:00', level: 3.8, flowRate: 200, risk: 'medium' },
    { time: '16:00', level: 3.0, flowRate: 170, risk: 'medium' },
    { time: '20:00', level: 2.8, flowRate: 160, risk: 'low' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-lg">
          <p className="text-sm font-bold">Time: {label}</p>
          <p className="text-sm text-blue-600">Water Level: {payload[0].value}m</p>
          <p className="text-sm text-green-600">Flow Rate: {payload[1].value} m³/h</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <Droplets className="h-8 w-8 text-blue-600" />
          <h2 className="text-xl font-bold">HydroShield</h2>
        </div>
        <button 
          onClick={toggleMenu}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Sidebar - Mobile & Desktop */}
      <div className={`
        fixed md:relative top-0 left-0 h-[100vh] w-64 bg-white shadow-lg
        transform transition-transform duration-300 ease-in-out z-30
        md:transform-none
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4">
          {/* Desktop Logo - Hidden on Mobile */}
          <div className="hidden md:flex items-center space-x-2 mb-8">
            <Droplets className="h-8 w-8 text-blue-600" />
            <h2 className="text-xl font-bold">HydroShield</h2>
          </div>
          
          {/* Profile Summary */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{user?.username || 'Loading...'}</h3>
                <p className="text-sm text-gray-500">{user?.role || 'User'}</p>
              </div>
            </div>
          </div>
          
          <nav className="space-y-2">
            <button
              onClick={() => handleSectionChange('dashboard')}
              className={`flex items-center space-x-3 p-3 rounded-lg w-full text-left ${
                activeSection === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
              }`}
            >
              <Gauge className="h-5 w-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => handleSectionChange('floodAlerts')}
              className={`flex items-center space-x-3 p-3 rounded-lg w-full text-left ${
                activeSection === 'floodAlerts' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
              }`}
            >
              <AlertTriangle className="h-5 w-5" />
              <span>Flood Alerts</span>
            </button>
            <button
              onClick={() => handleSectionChange('areaMap')}
              className={`flex items-center space-x-3 p-3 rounded-lg w-full text-left ${
                activeSection === 'areaMap' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
              }`}
            >
              <Map className="h-5 w-5" />
              <span>Area Map</span>
            </button>
            <button
              onClick={() => handleSectionChange('pumpControl')}
              className={`flex items-center space-x-3 p-3 rounded-lg w-full text-left ${
                activeSection === 'pumpControl' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
              }`}
            >
              <Power className="h-5 w-5" />
              <span>Pump Control</span>
            </button>
            <button
              onClick={() => handleSectionChange('history')}
              className={`flex items-center space-x-3 p-3 rounded-lg w-full text-left ${
                activeSection === 'history' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
              }`}
            >
              <HistoryIcon className="h-5 w-5" />
              <span>History</span>
            </button>
            
            <button
              onClick={() => handleSectionChange('settings')}
              className={`flex items-center space-x-3 p-3 rounded-lg w-full text-left ${
                activeSection === 'settings' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg w-full text-left text-red-600"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay for Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        {activeSection === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:col-span-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600">Current Water Level</p>
                    <h3 className="text-2xl font-bold text-blue-700">3.8m</h3>
                  </div>
                  <Droplets className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-sm text-blue-600 mt-2">+0.5m from normal</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600">Pump Status</p>
                    <h3 className="text-2xl font-bold text-green-700">Active</h3>
                  </div>
                  <Power className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-sm text-green-600 mt-2">200 m³/hour</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-yellow-600">Risk Level</p>
                    <h3 className="text-2xl font-bold text-yellow-700">Medium</h3>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                </div>
                <p className="text-sm text-yellow-600 mt-2">Monitor closely</p>
              </div>
            </div>

            {/* Water Level Chart */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Water Level Monitoring</h3>
              </div>
              <div className="p-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={waterLevelData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="level" stroke="#2563eb" fill="#dbeafe" />
                      <Area type="monotone" dataKey="flowRate" stroke="#16a34a" fill="#dcfce7" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Right Column - Alerts and Profile */}
            <div className="space-y-6">
              {/* Alerts Panel */}
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Recent Alerts</h3>
                  <Bell className="h-5 w-5 text-gray-500" />
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="text-sm font-medium text-red-700">High Water Level Alert</p>
                        <p className="text-xs text-red-500">10 minutes ago</p>
                      </div>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium text-yellow-700">Pump Flow Rate Warning</p>
                        <p className="text-xs text-yellow-500">25 minutes ago</p>
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                      <Power className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm font-medium text-green-700">Backup Pump Activated</p>
                        <p className="text-xs text-green-500">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Card */}
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">Profile Details</h3>
                </div>
                <div className="p-4">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="bg-blue-100 p-4 rounded-full">
                          <User className="h-16 w-16 text-blue-600" />
                        </div>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-semibold text-gray-900">{user.username}</h4>
                        <p className="text-gray-500">{user.email}</p>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Role</span>
                          <span className="font-medium">{user.role || 'Operator'}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-gray-500">Status</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-4">Loading...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeSection === 'floodAlerts' && <FloodAlerts />}
        {activeSection === 'pumpControl' && <PumpControl />}
        {activeSection === 'history' && <HistoryComponent />}
        {activeSection === 'areaMap' && <AreaMap />}
        {activeSection === 'settings' && <Setting />}
      </div>
    </div>
  );
};

export default DashboardLayout;
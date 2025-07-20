import React, { useState } from 'react';
import { User, Bell, Shield, Music, Globe, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Settings = () => {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'playback', label: 'Playback', icon: Music },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'download', label: 'Download', icon: Download },
  ];

  const handleProfileUpdate = (field, value) => {
    dispatch({
      type: 'UPDATE_USER_PROFILE',
      payload: { [field]: value }
    });
  };

  const handleNotificationUpdate = (field, value) => {
    dispatch({
      type: 'UPDATE_USER_PROFILE',
      payload: {
        notifications: {
          ...state.user.notifications,
          [field]: value
        }
      }
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
            
            <div className="flex items-center space-x-6 mb-6">
              <img
                src={state.user.imageUrl}
                alt={state.user.name}
                className="w-24 h-24 rounded-full"
              />
              <div>
                <button className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-full font-medium transition-colors">
                  Change Photo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={state.user.name}
                  onChange={(e) => handleProfileUpdate('name', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={state.user.email}
                  onChange={(e) => handleProfileUpdate('email', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Country
                </label>
                <select
                  value={state.user.country}
                  onChange={(e) => handleProfileUpdate('country', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="India">India</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Plan
                </label>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-green-500 text-black rounded-full text-sm font-medium">
                    {state.user.plan}
                  </span>
                  <button className="text-green-400 hover:text-green-300 text-sm">
                    Manage Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">New Releases</h4>
                  <p className="text-sm text-gray-400">Get notified about new music from your favorite artists</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.user.notifications.newReleases}
                    onChange={(e) => handleNotificationUpdate('newReleases', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Playlist Updates</h4>
                  <p className="text-sm text-gray-400">Get notified when playlists you follow are updated</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.user.notifications.playlistUpdates}
                    onChange={(e) => handleNotificationUpdate('playlistUpdates', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Concert Alerts</h4>
                  <p className="text-sm text-gray-400">Get notified about concerts in your area</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.user.notifications.concertAlerts}
                    onChange={(e) => handleNotificationUpdate('concertAlerts', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Friend Activity</h4>
                  <p className="text-sm text-gray-400">Get notified about what your friends are listening to</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.user.notifications.friendActivity}
                    onChange={(e) => handleNotificationUpdate('friendActivity', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Privacy Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Private Session</h4>
                  <p className="text-sm text-gray-400">Hide your activity from friends and followers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.user.privateSession}
                    onChange={(e) => handleProfileUpdate('privateSession', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Show Friend Activity</h4>
                  <p className="text-sm text-gray-400">Let friends see what you're listening to</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.user.showFriendActivity}
                    onChange={(e) => handleProfileUpdate('showFriendActivity', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'playback':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Playback Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Autoplay</h4>
                  <p className="text-sm text-gray-400">Automatically play similar songs when your music ends</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.user.autoplay}
                    onChange={(e) => handleProfileUpdate('autoplay', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">High Quality Streaming</h4>
                  <p className="text-sm text-gray-400">Stream music in high quality (uses more data)</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.user.highQualityStreaming}
                    onChange={(e) => handleProfileUpdate('highQualityStreaming', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Language & Region</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Display Language
              </label>
              <select
                value={state.user.language}
                onChange={(e) => handleProfileUpdate('language', e.target.value)}
                className="w-full max-w-xs px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="English">English</option>
                <option value="Spanish">Español</option>
                <option value="French">Français</option>
                <option value="German">Deutsch</option>
                <option value="Italian">Italiano</option>
                <option value="Portuguese">Português</option>
                <option value="Japanese">日本語</option>
                <option value="Korean">한국어</option>
              </select>
            </div>
          </div>
        );

      case 'download':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Download Settings</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Download Quality
              </label>
              <select
                value={state.user.downloadQuality}
                onChange={(e) => handleProfileUpdate('downloadQuality', e.target.value)}
                className="w-full max-w-xs px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="Normal">Normal (96 kbps)</option>
                <option value="High">High (160 kbps)</option>
                <option value="Very High">Very High (320 kbps)</option>
              </select>
              <p className="text-sm text-gray-400 mt-2">Higher quality uses more storage space</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium mb-2">Storage Usage</h4>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Downloaded Music</span>
                <span>2.3 GB</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <button className="text-green-400 hover:text-green-300 text-sm mt-2">
                Clear Cache
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black text-white overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 bg-gray-800 rounded-lg p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
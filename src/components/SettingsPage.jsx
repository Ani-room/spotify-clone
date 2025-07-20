import React, { useState } from 'react';
import { useStore } from '../store/useStore.js';

const tabs = [
  { id: 'account', label: 'Account' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'playback', label: 'Playback' },
  { id: 'language', label: 'Language' },
  { id: 'download', label: 'Download' },
];

const SettingsPage = () => {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState('account');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
            <p className="text-gray-400 mb-2">Email: {user.email}</p>
            <p className="text-gray-400 mb-2">Country: {user.country}</p>
            <p className="text-gray-400 mb-2">Plan: {user.plan}</p>
          </div>
        );
      case 'notifications':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Notifications</h3>
            <p className="text-gray-400">Manage your notification preferences here.</p>
          </div>
        );
      case 'privacy':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Privacy Settings</h3>
            <p className="text-gray-400">Control your privacy options here.</p>
          </div>
        );
      case 'playback':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Playback Settings</h3>
            <p className="text-gray-400">Adjust playback preferences here.</p>
          </div>
        );
      case 'language':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Language & Region</h3>
            <p className="text-gray-400">Change your language and region settings here.</p>
          </div>
        );
      case 'download':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Download Settings</h3>
            <p className="text-gray-400">Manage your download preferences here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black text-white overflow-y-auto">
      <div className="p-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Settings</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors text-left ${
                    activeTab === tab.id
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          {/* Content */}
          <div className="flex-1 bg-gray-800 rounded-lg p-8 min-h-[300px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 
import React from 'react';
import { useStore } from '../store/useStore.js';

const ProfilePage = () => {
  const { user } = useStore();

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black text-white overflow-y-auto">
      <div className="p-8 max-w-3xl mx-auto">
        <div className="flex items-center space-x-8 mb-10">
          <img
            src={user.imageUrl}
            alt={user.name}
            className="w-32 h-32 rounded-full shadow-2xl border-4 border-green-500"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-400 mb-1">{user.email}</p>
            <p className="text-gray-400 mb-1">Country: {user.country}</p>
            <span className="inline-block px-3 py-1 bg-green-500 text-black rounded-full text-sm font-medium mt-2">
              {user.plan} Plan
            </span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Account Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
              <input
                type="text"
                value={user.name}
                disabled
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
              <input
                type="text"
                value={user.country}
                disabled
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Plan</label>
              <input
                type="text"
                value={user.plan}
                disabled
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 
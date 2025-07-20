import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, User, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TopNav = () => {
  const { state, dispatch } = useApp();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <header className="bg-black bg-opacity-95 backdrop-blur-md text-white p-4 flex items-center justify-between">
      {/* Navigation */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Search Bar */}
      {state.currentView === 'search' && (
        <div className="flex-1 max-w-md mx-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={state.searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      )}

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-colors"
        >
          <img
            src={state.user.imageUrl}
            alt={state.user.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">{state.user.name}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {showProfileDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-10">
            <button 
              onClick={() => {
                dispatch({ type: 'SET_CURRENT_VIEW', payload: 'settings' });
                setShowProfileDropdown(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors"
            >
              Profile & Settings
            </button>
            <button className="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors">
              Account
            </button>
            <hr className="border-gray-700 my-2" />
            <button className="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors">
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNav;
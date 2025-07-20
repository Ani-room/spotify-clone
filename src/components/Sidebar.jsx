import React from 'react';
import { Home, Search, Library, Plus, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';

const Sidebar = () => {
  const { currentView, setCurrentView, playlists, user } = useStore();

  const menuItems = [
    { icon: Home, label: 'Home', view: 'home' },
    { icon: Search, label: 'Search', view: 'search' },
    { icon: Library, label: 'Your Library', view: 'library' },
  ];

  return (
    <div className="w-64 bg-black text-white h-full flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-green-400">Spotify 2.0</h1>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 px-2">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => setCurrentView(item.view)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  currentView === item.view
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-6 h-6 mr-4" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Create Playlist */}
        <div className="mt-8 px-4">
          <button
            onClick={() => {
              const name = prompt('Enter playlist name:');
              if (name) {
                const description = prompt('Enter playlist description:') || '';
                useStore.getState().createPlaylist(name, description);
              }
            }}
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <Plus className="w-6 h-6 mr-4" />
            Create Playlist
          </button>
        </div>

        {/* Liked Songs */}
        <div className="mt-4 px-4">
          <button
            onClick={() => setCurrentView('library')}
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <div className="w-6 h-6 mr-4 bg-gradient-to-br from-purple-700 to-blue-300 rounded-sm flex items-center justify-center">
              <Heart className="w-3 h-3 text-white" fill="currentColor" />
            </div>
            Liked Songs
          </button>
        </div>

        {/* Playlists */}
        <div className="mt-6 px-4">
          <div className="border-t border-gray-700 pt-4">
            <div className="max-h-64 overflow-y-auto">
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => {
                    setCurrentView('playlist');
                    useStore.getState().setSelectedPlaylist(playlist.id);
                  }}
                  className="block w-full text-left text-gray-300 hover:text-white py-2 truncate transition-colors"
                >
                  {playlist.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
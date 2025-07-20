import React from 'react';
import { useStore } from '../store/useStore.js';
import TrackList from './TrackList.jsx';

const LibraryPage = () => {
  const { tracks, user, playlists } = useStore();

  const likedSongs = (user.likedSongs || [])
    .map(id => tracks.find(track => track.id === id))
    .filter(Boolean);

  const userPlaylists = playlists.filter(playlist => 
    Array.isArray(user.playlists) && user.playlists.includes(playlist.id)
  );

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black text-white overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Your Library</h2>

        {/* Liked Songs */}
        <section className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-700 to-blue-300 rounded-lg flex items-center justify-center">
              <span className="text-2xl">❤️</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Liked Songs</h3>
              <p className="text-gray-400">{likedSongs.length} songs</p>
            </div>
          </div>
          {likedSongs.length > 0 ? (
            <TrackList tracks={likedSongs} />
          ) : (
            <p className="text-gray-400">No liked songs yet. Start liking some tracks!</p>
          )}
        </section>

        {/* Playlists */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Your Playlists</h3>
          {userPlaylists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() => {
                    useStore.getState().setCurrentView('playlist');
                    useStore.getState().setSelectedPlaylist(playlist.id);
                  }}
                >
                  <img
                    src={playlist.imageUrl}
                    alt={playlist.name}
                    className="w-full aspect-square rounded-lg shadow-lg mb-4"
                  />
                  <h4 className="text-white font-semibold truncate">{playlist.name}</h4>
                  <p className="text-gray-400 text-sm mt-1 truncate">{playlist.description}</p>
                  <p className="text-gray-400 text-xs mt-2">{playlist.tracks.length} songs</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No playlists yet. Create your first playlist!</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default LibraryPage; 
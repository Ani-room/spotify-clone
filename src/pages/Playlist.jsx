import React from 'react';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import TrackList from '../components/TrackList.jsx';

const Playlist = () => {
  const { state, dispatch } = useApp();

  const playlist = state.playlists.find(p => p.id === state.selectedPlaylist);

  if (!playlist) {
    return (
      <div className="flex-1 bg-gradient-to-b from-gray-900 to-black text-white p-6">
        <p className="text-gray-400">Playlist not found</p>
      </div>
    );
  }

  const handlePlayAll = () => {
    if (playlist.tracks.length > 0) {
      dispatch({ type: 'SET_CURRENT_TRACK', payload: playlist.tracks[0] });
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black text-white overflow-y-auto">
      <div className="p-6">
        {/* Playlist Header */}
        <div className="flex items-end space-x-6 mb-8">
          <img
            src={playlist.imageUrl}
            alt={playlist.name}
            className="w-48 h-48 rounded-lg shadow-2xl"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-300 mb-2">PLAYLIST</p>
            <h1 className="text-4xl font-bold mb-4">{playlist.name}</h1>
            <p className="text-gray-300 mb-4">{playlist.description}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>{playlist.tracks.length} songs</span>
              <span>•</span>
              <span>Created {new Date(playlist.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Playlist Controls */}
        <div className="flex items-center space-x-6 mb-8">
          <button
            onClick={handlePlayAll}
            className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors"
          >
            <Play className="w-6 h-6 text-black ml-1" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <Heart className="w-6 h-6 text-gray-400" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <MoreHorizontal className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Track List */}
        {playlist.tracks.length > 0 ? (
          <TrackList tracks={playlist.tracks} showAddToPlaylist={false} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">This playlist is empty</p>
            <p className="text-gray-500 text-sm mt-2">Add some tracks to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlist;
import React, { useState } from 'react';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';
import { useStore } from '../store/useStore';

const TrackList = ({ tracks, showAlbum = true, showAddToPlaylist = true }) => {
  const { 
    player, 
    user, 
    setCurrentTrack, 
    togglePlayPause, 
    toggleLikedSong,
    playlists,
    addToPlaylist 
  } = useStore();

  const [likeAnim, setLikeAnim] = useState({});

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = (track) => {
    if (player.currentTrack?.id === track.id) {
      togglePlayPause();
    } else {
      setCurrentTrack(track);
    }
  };

  const handleLike = (id) => {
    toggleLikedSong(id);
    setLikeAnim((prev) => ({ ...prev, [id]: true }));
  };
  const handleAnimationEnd = (id) => {
    setLikeAnim((prev) => ({ ...prev, [id]: false }));
  };

  if (typeof document !== 'undefined' && !document.getElementById('like-anim-style')) {
    const style = document.createElement('style');
    style.id = 'like-anim-style';
    style.innerHTML = `@keyframes like-bounce {0% { transform: scale(1); }30% { transform: scale(1.3); }60% { transform: scale(0.9); }100% { transform: scale(1); }}.animate-like {animation: like-bounce 0.4s;}`;
    document.head.appendChild(style);
  }

  return (
    <div className="space-y-1">
      {tracks.map((track, index) => {
        const isCurrentTrack = player.currentTrack?.id === track.id;
        const isLiked = Array.isArray(user.likedSongs) && user.likedSongs.includes(track.id);
        return (
          <div
            key={track.id}
            className="group flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {/* Track number / Play button */}
            <div className="w-8 text-center">
              {isCurrentTrack && player.isPlaying ? (
                <button
                  onClick={() => handlePlayPause(track)}
                  className="text-green-400"
                >
                  <Pause className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => handlePlayPause(track)}
                  className="group-hover:text-white text-gray-400 hover:text-green-400 transition-colors"
                >
                  <Play className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                  <span className="group-hover:hidden text-sm">{index + 1}</span>
                </button>
              )}
            </div>

            {/* Track info */}
            <div className="flex-1 min-w-0 ml-4">
              <div className="flex items-center space-x-4">
                <img
                  src={track.imageUrl}
                  alt={track.title}
                  className="w-10 h-10 rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className={`truncate ${isCurrentTrack ? 'text-green-400' : 'text-white'}`}>
                    {track.title}
                  </p>
                  <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                </div>
              </div>
            </div>

            {/* Album name */}
            {showAlbum && (
              <div className="hidden md:block w-1/4 px-4">
                <p className="text-gray-400 text-sm truncate">{track.album}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleLike(track.id)}
                onAnimationEnd={() => handleAnimationEnd(track.id)}
                className={`p-2 rounded-full hover:bg-gray-700 transition-colors ${
                  isLiked ? 'text-green-400' : 'text-gray-400'
                } ${likeAnim[track.id] ? 'animate-like' : ''}`}
              >
                <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
              </button>
              
              {showAddToPlaylist && (
                <div className="relative group">
                  <button className="p-2 rounded-full hover:bg-gray-700 transition-colors text-gray-400">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                    <div className="px-3 py-1 text-xs text-gray-400 font-medium">Add to playlist</div>
                    {playlists.map((playlist) => (
                      <button
                        key={playlist.id}
                        onClick={() => addToPlaylist(playlist.id, track.id)}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-700 transition-colors"
                      >
                        {playlist.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <span className="text-gray-400 text-sm w-12 text-right">
                {formatDuration(track.duration)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackList;
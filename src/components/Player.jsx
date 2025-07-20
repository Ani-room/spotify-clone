import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, VolumeX, Heart, Mic2, Maximize2, Minimize2, ChevronLeft } from 'lucide-react';
import { useStore } from '../store/useStore';

const Player = (props) => {
  const {
    player,
    user,
    setCurrentTrack,
    togglePlayPause,
    setVolume,
    setProgress,
    toggleShuffle,
    toggleRepeat,
    toggleLyrics,
    toggleLikedSong,
    tracks,
  } = useStore();

  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = player.volume;
    }
  }, [player.volume]);

  useEffect(() => {
    if (audioRef.current && player.currentTrack) {
      audioRef.current.load();
      audioRef.current.volume = player.volume;
      if (player.isPlaying) {
        // Try to play if user has interacted
        audioRef.current.play().catch(() => {});
      }
    }
  }, [player.currentTrack]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = clickX / width;
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleNext = () => {
    if (player.currentTrack) {
      const currentIndex = tracks.findIndex(t => t.id === player.currentTrack.id);
      const nextIndex = (currentIndex + 1) % tracks.length;
      setCurrentTrack(tracks[nextIndex]);
    }
  };

  const handlePrevious = () => {
    if (player.currentTrack) {
      const currentIndex = tracks.findIndex(t => t.id === player.currentTrack.id);
      const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
      setCurrentTrack(tracks[prevIndex]);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleEnded = () => {
    if (player.isRepeating) {
      audioRef.current?.play();
    } else {
      handleNext();
    }
  };

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
  };

  const handleMuteToggle = () => {
    if (player.volume === 0) {
      setVolume(0.7);
    } else {
      setVolume(0);
    }
  };

  const handlePlayPause = () => {
    if (!player.currentTrack) return;
    if (player.isPlaying) {
      audioRef.current?.pause();
      togglePlayPause();
    } else {
      audioRef.current?.play();
      togglePlayPause();
    }
  };

  const handleFullscreenToggle = () => {
    const root = document.documentElement;
    if (!isFullscreen) {
      root.requestFullscreen && root.requestFullscreen();
    } else {
      document.exitFullscreen && document.exitFullscreen();
    }
  };

  if (!player.currentTrack) return null;

  const isLiked = Array.isArray(user.likedSongs) && user.likedSongs.includes(player.currentTrack.id);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 z-40">
      {/* Unhide Now Playing button (controlled by App) */}
      {props.nowPlayingHidden && (
        <button
          className="absolute right-4 bottom-20 z-50 bg-gray-900 border border-gray-800 rounded-full px-3 py-2 flex items-center shadow-lg hover:bg-gray-800 transition-colors"
          onClick={props.onUnhideNowPlaying}
          title="Show Now Playing"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}
      <audio
        ref={audioRef}
        src={player.currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      
      <div className="flex items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center space-x-4 min-w-0 flex-1">
          <img
            src={player.currentTrack.imageUrl}
            alt={player.currentTrack.title}
            className="w-14 h-14 rounded-lg"
          />
          <div className="min-w-0">
            <h3 className="text-white font-medium truncate">{player.currentTrack.title}</h3>
            <p className="text-gray-400 text-sm truncate">{player.currentTrack.artist}</p>
          </div>
          <button
            onClick={() => toggleLikedSong(player.currentTrack.id)}
            className={`p-2 rounded-full hover:bg-gray-800 transition-colors ${
              isLiked ? 'text-green-400' : 'text-gray-400'
            }`}
            title={isLiked ? 'Remove from Liked Songs' : 'Add to Liked Songs'}
          >
            <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleShuffle}
              className={`p-2 rounded-full hover:bg-gray-800 transition-colors ${
                player.isShuffled ? 'text-green-400' : 'text-gray-400'
              }`}
            >
              <Shuffle className="w-5 h-5" />
            </button>
            
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            
            <button
              onClick={handlePlayPause}
              className="p-3 rounded-full bg-white hover:bg-gray-200 transition-colors"
            >
              {player.isPlaying ? (
                <Pause className="w-5 h-5 text-black" />
              ) : (
                <Play className="w-5 h-5 text-black ml-1" />
              )}
            </button>
            
            <button
              onClick={handleNext}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            
            <button
              onClick={toggleRepeat}
              className={`p-2 rounded-full hover:bg-gray-800 transition-colors ${
                player.isRepeating ? 'text-green-400' : 'text-gray-400'
              }`}
            >
              <Repeat className="w-5 h-5" />
            </button>
            {/* Fullscreen toggle button */}
            <button
              onClick={handleFullscreenToggle}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-3 w-full">
            <span className="text-gray-400 text-xs">{formatTime(currentTime)}</span>
            <div
              className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-white rounded-full transition-all duration-100"
                style={{ width: `${player.progress}%` }}
              />
            </div>
            <span className="text-gray-400 text-xs">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume and Lyrics */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <button
            onClick={toggleLyrics}
            className={`p-2 rounded-full hover:bg-gray-800 transition-colors ${
              player.showLyrics ? 'text-green-400' : 'text-gray-400'
            }`}
          >
            <Mic2 className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <button onClick={handleMuteToggle} className="focus:outline-none">
              {player.volume === 0 ? (
                <VolumeX className="w-5 h-5 text-gray-400" />
              ) : (
                <Volume2 className="w-5 h-5 text-gray-400" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={player.volume}
              onChange={handleVolumeChange}
              className="spotify-slider"
              style={{
                '--val': `${Math.round(player.volume * 100)}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
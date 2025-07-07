// Player.jsx
import { useEffect, useRef, useState } from 'react';

const Player = ({ song, playNext, playPrev }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    audio.play();
    setIsPlaying(true);

    const updateProgress = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(percent) ? 0 : percent);
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, [song]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-800 text-white px-8 py-10 shadow-2xl rounded-t-3xl">
      <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-6">
        {/* Real-time progress bar */}
        <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Song Info + Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
          {/* Song Info */}
          <div className="flex items-center gap-6">
            <img
              src={song.cover}
              alt={song.title}
              className="w-24 h-24 object-cover rounded-xl shadow-lg"
            />
            <div>
              <h3 className="text-2xl font-bold">{song.title}</h3>
              <p className="text-lg text-gray-200">by {song.artist}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-12">
            <button
              onClick={playPrev}
              className="text-5xl hover:scale-110 transition"
            >
              ⏮️
            </button>
            <button
              onClick={togglePlay}
              className="bg-white text-indigo-700 p-6 rounded-full text-5xl hover:scale-110 transition shadow-2xl"
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button
              onClick={playNext}
              className="text-5xl hover:scale-110 transition"
            >
              ⏭️
            </button>
          </div>
        </div>

        {/* Visible audio element */}
        <audio ref={audioRef} src={song.url} controls className="w-full" />
      </div>
    </div>
  );
};

export default Player;

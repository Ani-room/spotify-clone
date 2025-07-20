import React from 'react';
import { useStore } from '../store/useStore';
import { ChevronRight } from 'lucide-react';

const NowPlayingPanel = ({ hidden, setHidden }) => {
  const { player, tracks } = useStore();
  const currentTrack = player.currentTrack;
  if (!currentTrack || hidden) return null;

  // Find the index of the current track
  const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
  // Get the next up to 5 tracks in the queue
  const queue = tracks.slice(currentIndex + 1, currentIndex + 6);

  return (
    <aside className="w-96 bg-gray-900 border-l border-gray-800 flex flex-col h-full p-6 relative z-40">
      {/* Hide button */}
      <button
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800 transition-colors"
        onClick={() => setHidden(true)}
        title="Hide Now Playing"
      >
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>
      <h2 className="text-lg font-bold mb-6">Now Playing</h2>
      <div className="flex flex-col items-center mb-8">
        <img
          src={currentTrack.imageUrl}
          alt={currentTrack.title}
          className="w-48 h-48 rounded-xl shadow-2xl mb-6 object-cover"
        />
        <div className="text-center w-full">
          <div className="text-white font-semibold truncate text-xl mb-1">{currentTrack.title}</div>
          <div className="text-gray-400 text-md truncate mb-2">{currentTrack.artist}</div>
        </div>
      </div>
      <div>
        <h3 className="text-md font-semibold mb-2 text-gray-300">Up Next</h3>
        {queue.length === 0 ? (
          <div className="text-gray-500 text-sm">No more songs in queue</div>
        ) : (
          <ul className="space-y-2">
            {queue.map((track) => (
              <li key={track.id} className="flex items-center">
                <img
                  src={track.imageUrl}
                  alt={track.title}
                  className="w-10 h-10 rounded mr-3"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-white truncate text-sm">{track.title}</div>
                  <div className="text-gray-400 text-xs truncate">{track.artist}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default NowPlayingPanel; 
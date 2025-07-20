import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';

const LyricsPanel = () => {
  const { player, toggleLyrics } = useStore();
  const [highlightedLine, setHighlightedLine] = useState(0);

  useEffect(() => {
    // Simulate synced lyrics by updating highlighted line based on progress
    const interval = setInterval(() => {
      if (player.currentTrack?.lyrics && player.isPlaying) {
        const lines = player.currentTrack.lyrics.split('\n');
        const lineIndex = Math.floor((player.progress / 100) * lines.length);
        setHighlightedLine(lineIndex);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player.progress, player.currentTrack?.lyrics, player.isPlaying]);

  if (!player.showLyrics || !player.currentTrack?.lyrics) return null;

  const lines = player.currentTrack.lyrics.split('\n');

  return (
    <div className="fixed right-4 top-20 bottom-24 w-80 bg-gray-900 rounded-lg shadow-xl z-30 overflow-hidden">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-white font-semibold">Lyrics</h3>
        <button
          onClick={toggleLyrics}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      
      <div className="p-4 overflow-y-auto h-full">
        <div className="space-y-2">
          {lines.map((line, index) => (
            <p
              key={index}
              className={`text-sm transition-colors ${
                index === highlightedLine
                  ? 'text-green-400 font-medium'
                  : 'text-gray-400'
              }`}
            >
              {line || '\u00A0'}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LyricsPanel;
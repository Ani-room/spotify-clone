import React from 'react';
import { Play } from 'lucide-react';
import { useStore } from '../store/useStore';

const AlbumCard = ({ album }) => {
  const { setCurrentTrack } = useStore();

  const handlePlay = () => {
    if (album.tracks.length > 0) {
      setCurrentTrack(album.tracks[0]);
    }
  };

  return (
    <div className="group bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer">
      <div className="relative">
        <img
          src={album.imageUrl}
          alt={album.title}
          className="w-full aspect-square rounded-lg shadow-lg"
        />
        <button
          onClick={handlePlay}
          className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-green-400 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg"
        >
          <Play className="w-6 h-6 text-black ml-1" />
        </button>
      </div>
      
      <div className="mt-4">
        <h3 className="text-white font-semibold truncate">{album.title}</h3>
        <p className="text-gray-400 text-sm truncate mt-1">{album.artist}</p>
      </div>
    </div>
  );
};

export default AlbumCard;
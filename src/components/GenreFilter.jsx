import React from 'react';
import { useStore } from '../store/useStore';
import { genres } from '../data/mockData.js';

const GenreFilter = () => {
  const { selectedGenre, setSelectedGenre } = useStore();

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 mb-6">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => setSelectedGenre(genre)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selectedGenre === genre
              ? 'bg-green-500 text-black'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
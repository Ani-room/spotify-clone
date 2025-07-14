// Search.jsx
import { useState } from 'react';
import SongCard from '../components/SongCard';

const Search = ({ songs, setCurrentIndex }) => {
  const [query, setQuery] = useState('');

  const results = songs.filter((song) =>
    song.title.toLowerCase().includes(query.toLowerCase()) ||
    song.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">🔍 Search Songs</h2>

      <div className="w-full max-w-xl mb-6">
        <input
          type="text"
          placeholder="Search by title or artist..."
          className="w-full p-4 text-lg rounded-full border border-purple-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {query && results.length === 0 && (
        <p className="text-gray-500">No matching songs found.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {results.map((song, index) => (
          <SongCard
            key={song.id}
            song={song}
            onClick={() => setCurrentIndex(songs.indexOf(song))}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
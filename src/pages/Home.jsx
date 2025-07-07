// Home.jsx
import { useState } from 'react';
import SongCard from '../components/SongCard';

const Home = ({ songs, setCurrentIndex }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      {/* Centered and Styled Search Bar */}
      <div className="flex justify-center mb-6 w-full">
        <div className="w-full max-w-xl relative">
          <input
            type="text"
            placeholder="🔍 Search songs..."
            className="w-full p-4 text-lg rounded-full border border-purple-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 text-xl">
            🔍
          </div>
        </div>
      </div>

      {/* Song List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {filteredSongs.map((song, index) => (
          <SongCard
            key={song.id}
            song={song}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
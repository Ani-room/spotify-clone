// Genre.jsx
import { useParams } from 'react-router-dom';
import SongCard from '../components/SongCard';

const Genre = ({ songs, setCurrentIndex }) => {
  const { name } = useParams();

  const filtered = songs.filter((song) =>
    song.genre.toLowerCase() === name.toLowerCase()
  );

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">🎧 Genre: {name}</h2>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No songs found for this genre.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {filtered.map((song, index) => (
            <SongCard
              key={song.id}
              song={song}
              onClick={() => setCurrentIndex(songs.indexOf(song))}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Genre;
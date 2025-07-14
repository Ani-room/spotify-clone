// Album.jsx
import SongCard from '../components/SongCard';

const Album = ({ songs, setCurrentIndex }) => {
  // Group songs by album name
  const albums = songs.reduce((acc, song) => {
    if (!acc[song.album]) acc[song.album] = [];
    acc[song.album].push(song);
    return acc;
  }, {});

  return (
    <div className="w-full p-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-center">📀 Albums</h2>

      <div className="w-full max-w-6xl flex flex-col gap-10">
        {Object.entries(albums).map(([albumName, albumSongs]) => (
          <div key={albumName}>
            <h3 className="text-xl font-semibold mb-4">🎼 {albumName}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {albumSongs.map((song, index) => (
                <SongCard
                  key={song.id}
                  song={song}
                  onClick={() => setCurrentIndex(songs.indexOf(song))}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
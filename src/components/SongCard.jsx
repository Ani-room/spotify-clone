const SongCard = ({ song, onClick }) => {
  return (
    <div
      className="bg-white p-3 rounded-xl shadow hover:shadow-lg cursor-pointer text-center"
      onClick={onClick}
    >
      {/* ✅ Compressed Small Box Size */}
      <img
        src={song.cover}
        alt={song.title}
        className="w-24 h-24 object-cover mx-auto rounded-lg mb-2 shadow-sm"
      />
      <h3 className="text-sm font-semibold truncate">{song.title}</h3>
      <p className="text-xs text-gray-500 truncate">{song.artist}</p>
    </div>
  );
};

export default SongCard;

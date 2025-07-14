import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-60 h-full bg-gray-900 text-white p-4 flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-4">🎵 Spotify 2.0</h1>

      <nav className="flex flex-col gap-3">
        <Link to="/" className="hover:text-green-400">🏠 Home</Link>
        <Link to="/search" className="hover:text-green-400">🔍 Search</Link>
        <Link to="/genre/Electronic" className="hover:text-green-400">🎹 Electronic</Link>
        <Link to="/genre/Rock" className="hover:text-green-400">🎸 Rock</Link>
        <Link to="/albums" className="hover:text-green-400">📀 Albums</Link>
        {/* Add more genres or links as needed */}
      </nav>
    </div>
  );
};

export default Sidebar;
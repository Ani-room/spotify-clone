// App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Genre from './pages/Genre';
import Album from './pages/Album';
import Player from './components/Player';
import Sidebar from './components/Sidebar';
import { songs as dummySongs } from './data/dummyData';

const App = () => {
  const [songs] = useState(dummySongs);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home songs={songs} setCurrentIndex={setCurrentIndex} />} />
            <Route path="/search" element={<Search songs={songs} setCurrentIndex={setCurrentIndex} />} />
            <Route path="/genre/:name" element={<Genre songs={songs} setCurrentIndex={setCurrentIndex} />} />
            <Route path="/albums" element={<Album songs={songs} setCurrentIndex={setCurrentIndex} />} />
          </Routes>

          {/* Player visible on all pages */}
          <Player song={songs[currentIndex]} playNext={() => setCurrentIndex((prev) => (prev + 1) % songs.length)} playPrev={() => setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length)} />
        </div>
      </div>
    </Router>
  );
};

export default App;
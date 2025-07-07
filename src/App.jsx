import { useState } from 'react';
import Home from './pages/Home';
import Player from './components/Player';
import { songs } from './data/dummyData.js';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const playNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const playPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? songs.length - 1 : prev - 1
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <Home songs={songs} setCurrentIndex={setCurrentIndex} />
      </div>
      <Player
        song={songs[currentIndex]}
        playNext={playNext}
        playPrev={playPrev}
      />
    </div>
  );
}

export default App;

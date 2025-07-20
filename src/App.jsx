import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useStore } from './store/useStore.js';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import Player from './components/Player.jsx';
import LyricsPanel from './components/LyricsPanel.jsx';
import HomePage from './components/HomePage.jsx';
import SearchPage from './components/SearchPage.jsx';
import LibraryPage from './components/LibraryPage.jsx';
import PlaylistPage from './components/PlaylistPage.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import SettingsPage from './components/SettingsPage.jsx';
import NowPlayingPanel from './components/NowPlayingPanel.jsx';

function App() {
  const { currentView, player } = useStore();
  const [nowPlayingHidden, setNowPlayingHidden] = React.useState(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'search':
        return <SearchPage />;
      case 'library':
        return <LibraryPage />;
      case 'playlist':
        return <PlaylistPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col bg-black text-white font-sans">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col min-h-0">
            <Header />
            <main className="flex-1 min-h-0 overflow-y-auto">
              {renderCurrentView()}
            </main>
          </div>
          {/* NowPlayingPanel as right sidebar, controlled by App */}
          {player.currentTrack && (
            <NowPlayingPanel hidden={nowPlayingHidden} setHidden={setNowPlayingHidden} />
          )}
        </div>
        <Player nowPlayingHidden={nowPlayingHidden} onUnhideNowPlaying={() => setNowPlayingHidden(false)} />
        <LyricsPanel />
      </div>
    </BrowserRouter>
  );
}

export default App;
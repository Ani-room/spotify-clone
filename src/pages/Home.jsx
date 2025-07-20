import React from 'react';
import { useApp } from '../context/AppContext';
import TrackList from '../components/TrackList.jsx';
import AlbumCard from '../components/AlbumCard.jsx';
import GenreFilter from '../components/GenreFilter.jsx';
import { mockAlbums } from '../data/mockData';

const Home = () => {
  const { state } = useApp();

  // Filter tracks based on selected genre
  const filteredTracks = state.selectedGenre === 'All' 
    ? state.tracks 
    : state.tracks.filter(track => track.genre === state.selectedGenre);

  // Get recently played tracks
  const recentlyPlayedTracks = state.recentlyPlayed
    .map(id => state.tracks.find(track => track.id === id))
    .filter(Boolean);

  // Get liked songs
  const likedSongs = state.likedSongs
    .map(id => state.tracks.find(track => track.id === id))
    .filter(Boolean);

  // Get recommended tracks (simple algorithm based on genre)
  const recommendedTracks = state.tracks.filter(track => 
    likedSongs.some(liked => liked.genre === track.genre) && 
    !state.likedSongs.includes(track.id)
  ).slice(0, 6);

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black text-white overflow-y-auto">
      <div className="p-6">
        {/* Genre Filter */}
        <GenreFilter />

        {/* Recently Played */}
        {recentlyPlayedTracks.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Listening</h2>
            <TrackList tracks={recentlyPlayedTracks.slice(0, 5)} />
          </section>
        )}

        {/* Liked Songs */}
        {likedSongs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Favourites</h2>
            <TrackList tracks={likedSongs.slice(0, 5)} />
          </section>
        )}

        {/* Recommended Albums */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Recommended Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {mockAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>

        {/* Recommended Tracks */}
        {recommendedTracks.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
            <TrackList tracks={recommendedTracks} />
          </section>
        )}

        {/* All Tracks */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {state.selectedGenre === 'All' ? 'All Tracks' : `${state.selectedGenre} Tracks`}
          </h2>
          <TrackList tracks={filteredTracks} />
        </section>
      </div>
    </div>
  );
};

export default Home;
import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import TrackList from '../components/TrackList';
import AlbumCard from '../components/AlbumCard';
import { mockAlbums } from '../data/mockData';

const Search = () => {
  const { state } = useApp();

  const searchResults = useMemo(() => {
    if (!state.searchQuery) return { tracks: [], albums: [], artists: [] };

    const query = state.searchQuery.toLowerCase();
    
    const matchingTracks = state.tracks.filter(track =>
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      track.album.toLowerCase().includes(query) ||
      track.genre.toLowerCase().includes(query)
    );

    const matchingAlbums = mockAlbums.filter(album =>
      album.title.toLowerCase().includes(query) ||
      album.artist.toLowerCase().includes(query) ||
      album.genre.toLowerCase().includes(query)
    );

    // Mock artists data
    const mockArtists = [
      { id: '1', name: 'The Weeknd', imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300', genres: ['Pop', 'R&B'] },
      { id: '2', name: 'Dua Lipa', imageUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300', genres: ['Pop', 'Dance'] },
      { id: '3', name: 'Olivia Rodrigo', imageUrl: 'https://images.pexels.com/photos/1777479/pexels-photo-1777479.jpeg?auto=compress&cs=tinysrgb&w=300', genres: ['Pop', 'Alternative'] },
    ];

    const matchingArtists = mockArtists.filter(artist =>
      artist.name.toLowerCase().includes(query) ||
      artist.genres.some(genre => genre.toLowerCase().includes(query))
    );

    return { tracks: matchingTracks, albums: matchingAlbums, artists: matchingArtists };
  }, [state.searchQuery, state.tracks]);

  if (!state.searchQuery) {
    return (
      <div className="flex-1 bg-gradient-to-b from-gray-900 to-black text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Search</h2>
        <p className="text-gray-400">Start typing to search for songs, artists, albums, and more...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black text-white overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Search Results for "{state.searchQuery}"</h2>

        {/* Tracks */}
        {searchResults.tracks.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Songs</h3>
            <TrackList tracks={searchResults.tracks} />
          </section>
        )}

        {/* Albums */}
        {searchResults.albums.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Albums</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {searchResults.albums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          </section>
        )}

        {/* Artists */}
        {searchResults.artists.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Artists</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {searchResults.artists.map((artist) => (
                <div key={artist.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                  <div className="relative">
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="w-full aspect-square rounded-full shadow-lg"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-white font-semibold truncate">{artist.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">Artist</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {searchResults.tracks.length === 0 && 
         searchResults.albums.length === 0 && 
         searchResults.artists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No results found for "{state.searchQuery}"</p>
            <p className="text-gray-500 text-sm mt-2">Try searching for something else</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
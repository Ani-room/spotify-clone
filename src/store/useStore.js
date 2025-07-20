import { create } from 'zustand';
import { mockTracks, mockPlaylists, mockUser } from '../data/mockData.js';

export const useStore = create((set, get) => ({
  // Initial state
  user: mockUser,
  tracks: mockTracks,
  playlists: mockPlaylists,

  player: {
    currentTrack: null,
    isPlaying: false,
    volume: 0.7,
    progress: 0,
    isShuffled: false,
    isRepeating: false,
    showLyrics: false,
  },

  currentView: 'home',
  selectedGenre: 'All',
  searchQuery: '',
  selectedPlaylist: null,

  // Player actions
  setCurrentTrack: (track) => {
    set((state) => ({
      player: {
        ...state.player,
        currentTrack: track,
        isPlaying: true,
      }
    }));
    get().addToRecentlyPlayed(track.id);
  },

  togglePlayPause: () => {
    set((state) => ({
      player: {
        ...state.player,
        isPlaying: !state.player.isPlaying,
      }
    }));
  },

  setVolume: (volume) => {
    set((state) => ({
      player: {
        ...state.player,
        volume: Math.max(0, Math.min(1, volume)),
      }
    }));
  },

  setProgress: (progress) => {
    set((state) => ({
      player: {
        ...state.player,
        progress: Math.max(0, Math.min(100, progress)),
      }
    }));
  },

  toggleShuffle: () => {
    set((state) => ({
      player: {
        ...state.player,
        isShuffled: !state.player.isShuffled,
      }
    }));
  },

  toggleRepeat: () => {
    set((state) => ({
      player: {
        ...state.player,
        isRepeating: !state.player.isRepeating,
      }
    }));
  },

  toggleLyrics: () => {
    set((state) => ({
      player: {
        ...state.player,
        showLyrics: !state.player.showLyrics,
      }
    }));
  },

  // Playlist actions
  createPlaylist: (name, description) => {
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      description,
      imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
      tracks: [],
      isPublic: true,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      playlists: [...state.playlists, newPlaylist],
      user: {
        ...state.user,
        playlists: [
          ...(Array.isArray(state.user.playlists) ? state.user.playlists : []),
          newPlaylist.id
        ],
      }
    }));
  },

  addToPlaylist: (playlistId, trackId) => {
    const track = get().tracks.find(t => t.id === trackId);
    if (!track) return;

    set((state) => ({
      playlists: state.playlists.map(playlist =>
        playlist.id === playlistId
          ? { ...playlist, tracks: [...playlist.tracks, track] }
          : playlist
      )
    }));
  },

  removeFromPlaylist: (playlistId, trackId) => {
    set((state) => ({
      playlists: state.playlists.map(playlist =>
        playlist.id === playlistId
          ? { ...playlist, tracks: playlist.tracks.filter(t => t.id !== trackId) }
          : playlist
      )
    }));
  },

  // UI actions
  setCurrentView: (view) => set({ currentView: view }),
  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedPlaylist: (playlistId) => set({ selectedPlaylist: playlistId }),

  // User actions
  toggleLikedSong: (trackId) => {
    set((state) => ({
      user: {
        ...state.user,
        likedSongs: state.user.likedSongs.includes(trackId)
          ? state.user.likedSongs.filter(id => id !== trackId)
          : [...state.user.likedSongs, trackId],
      }
    }));
  },

  addToRecentlyPlayed: (trackId) => {
    set((state) => ({
      user: {
        ...state.user,
        recentlyPlayed: [
          trackId,
          ...((Array.isArray(state.user.recentlyPlayed) ? state.user.recentlyPlayed : []).filter(id => id !== trackId)),
        ].slice(0, 10),
      }
    }));
  },
})); 
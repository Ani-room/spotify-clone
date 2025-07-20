import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { mockTracks, mockUser } from '../data/mockData';

const AppContext = createContext();

const initialState = {
  // User state
  user: mockUser,
  
  // Music data
  tracks: mockTracks,
  playlists: JSON.parse(localStorage.getItem('playlists') || '[]'),
  
  // Player state
  currentTrack: null,
  isPlaying: false,
  volume: 0.7,
  progress: 0,
  isShuffled: false,
  isRepeating: false,
  showLyrics: false,
  
  // UI state
  currentView: 'home',
  selectedGenre: 'All',
  searchQuery: '',
  selectedPlaylist: null,
  
  // User preferences
  likedSongs: JSON.parse(localStorage.getItem('likedSongs') || '[]'),
  recentlyPlayed: JSON.parse(localStorage.getItem('recentlyPlayed') || '[]'),
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_CURRENT_TRACK':
      return {
        ...state,
        currentTrack: action.payload,
        isPlaying: true,
      };
    
    case 'TOGGLE_PLAY_PAUSE':
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    
    case 'SET_VOLUME':
      return {
        ...state,
        volume: Math.max(0, Math.min(1, action.payload)),
      };
    
    case 'SET_PROGRESS':
      return {
        ...state,
        progress: Math.max(0, Math.min(100, action.payload)),
      };
    
    case 'TOGGLE_SHUFFLE':
      return {
        ...state,
        isShuffled: !state.isShuffled,
      };
    
    case 'TOGGLE_REPEAT':
      return {
        ...state,
        isRepeating: !state.isRepeating,
      };
    
    case 'TOGGLE_LYRICS':
      return {
        ...state,
        showLyrics: !state.showLyrics,
      };
    
    case 'SET_CURRENT_VIEW':
      return {
        ...state,
        currentView: action.payload,
      };
    
    case 'SET_SELECTED_GENRE':
      return {
        ...state,
        selectedGenre: action.payload,
      };
    
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };
    
    case 'SET_SELECTED_PLAYLIST':
      return {
        ...state,
        selectedPlaylist: action.payload,
      };
    
    case 'TOGGLE_LIKED_SONG':
      const isLiked = state.likedSongs.includes(action.payload);
      const newLikedSongs = isLiked
        ? state.likedSongs.filter(id => id !== action.payload)
        : [...state.likedSongs, action.payload];
      
      localStorage.setItem('likedSongs', JSON.stringify(newLikedSongs));
      
      return {
        ...state,
        likedSongs: newLikedSongs,
      };
    
    case 'ADD_TO_RECENTLY_PLAYED':
      const newRecentlyPlayed = [
        action.payload,
        ...state.recentlyPlayed.filter(id => id !== action.payload),
      ].slice(0, 10);
      
      localStorage.setItem('recentlyPlayed', JSON.stringify(newRecentlyPlayed));
      
      return {
        ...state,
        recentlyPlayed: newRecentlyPlayed,
      };
    
    case 'CREATE_PLAYLIST':
      const newPlaylist = {
        id: Date.now().toString(),
        name: action.payload.name,
        description: action.payload.description,
        imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
        tracks: [],
        isPublic: true,
        createdAt: new Date().toISOString(),
      };
      
      const updatedPlaylists = [...state.playlists, newPlaylist];
      localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
      
      return {
        ...state,
        playlists: updatedPlaylists,
      };
    
    case 'ADD_TO_PLAYLIST':
      const track = state.tracks.find(t => t.id === action.payload.trackId);
      if (!track) return state;
      
      const playlistsWithTrack = state.playlists.map(playlist => 
        playlist.id === action.payload.playlistId
          ? { ...playlist, tracks: [...playlist.tracks, track] }
          : playlist
      );
      
      localStorage.setItem('playlists', JSON.stringify(playlistsWithTrack));
      
      return {
        ...state,
        playlists: playlistsWithTrack,
      };
    
    case 'REMOVE_FROM_PLAYLIST':
      const playlistsWithoutTrack = state.playlists.map(playlist => 
        playlist.id === action.payload.playlistId
          ? { ...playlist, tracks: playlist.tracks.filter(t => t.id !== action.payload.trackId) }
          : playlist
      );
      
      localStorage.setItem('playlists', JSON.stringify(playlistsWithoutTrack));
      
      return {
        ...state,
        playlists: playlistsWithoutTrack,
      };
    
    case 'UPDATE_USER_PROFILE':
      const updatedUser = { ...state.user, ...action.payload };
      return {
        ...state,
        user: updatedUser,
      };
    
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Auto-add to recently played when track changes
  useEffect(() => {
    if (state.currentTrack) {
      dispatch({ type: 'ADD_TO_RECENTLY_PLAYED', payload: state.currentTrack.id });
    }
  }, [state.currentTrack]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
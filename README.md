# 🎵 Spotify 2.0 Clone

A modern, full-featured music streaming application built with React.js that replicates and enhances the Spotify experience with additional features and a sleek user interface.

![Spotify 2.0 Clone](https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1200)

## ✨ Features

### 🎧 Core Music Experience
- **Full-Featured Music Player** with play, pause, next, previous, shuffle, and repeat
- **Circular Volume Knob** with smooth animations and visual feedback
- **Progress Bar** with click-to-seek functionality
- **Real-time Audio Playback** using HTML5 Audio API
- **Synced Lyrics Display** with real-time highlighting

### 🏠 Smart Navigation
- **Home Page** with personalized sections:
  - Your Listening (recently played tracks)
  - Your Favourites (liked songs)
  - Recommended tracks based on listening behavior
  - Genre-based filtering
- **Advanced Search** with live suggestions and categorized results
- **Library Management** for playlists and liked songs

### 🎵 Playlist Management
- **Create Custom Playlists** with names and descriptions
- **Add/Remove Songs** to/from playlists
- **Playlist View** with full track listings and controls
- **Persistent Storage** using localStorage

### 👤 User Profile & Settings
- **Profile Management**: Edit name, email, country, subscription plan
- **Notification Settings**: Control alerts for new releases, concerts, friend activity
- **Privacy Controls**: Private sessions, friend activity visibility
- **Playback Preferences**: Autoplay, streaming quality, download settings
- **Multi-language Support**: Choose from 8+ languages

### 🎨 Modern UI/UX
- **Dark Spotify Theme** with black, gray, and green accents
- **Responsive Design** optimized for mobile and desktop
- **Smooth Animations** and hover effects throughout
- **Grid Layouts** for albums with interactive play buttons
- **Fixed Navigation** with sidebar and bottom player

## 🚀 Tech Stack

- **Frontend**: React.js (JavaScript)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Storage**: localStorage for persistence

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ani-room/spotify-clone
   cd spotify-2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.jsx     # Left navigation sidebar
│   ├── TopNav.jsx      # Top navigation bar
│   ├── Player.jsx      # Bottom music player
│   ├── VolumeKnob.jsx  # Circular volume control
│   ├── TrackList.jsx   # Song list component
│   ├── AlbumCard.jsx   # Album display card
│   ├── GenreFilter.jsx # Genre selection chips
│   └── LyricsPanel.jsx # Synced lyrics display
├── pages/              # Main application pages
│   ├── Home.jsx        # Homepage with recommendations
│   ├── Search.jsx      # Search functionality
│   ├── Library.jsx     # User's music library
│   ├── Playlist.jsx    # Individual playlist view
│   └── Settings.jsx    # User profile & settings
├── context/            # React Context for state management
│   └── AppContext.jsx  # Global application state
├── data/               # Mock data and constants
│   └── mockData.js     # Sample tracks, albums, artists
└── App.jsx             # Main application component
```

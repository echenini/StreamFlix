import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import MovieGrid from '../components/MovieGrid';
import VideoPlayer from '../components/VideoPlayer';

interface Movie {
  id: string;
  title: string;
  video: string;
  poster: string;
  duration?: string;
  genre?: string;
}

// Sample movies data - modify this array to add/remove movies
const moviesData: Movie[] = [
  {
    id: '1',
    title: 'Inception',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://placehold.co/400x600',
    duration: '2h 28m',
    genre: 'Sci-Fi'
  },
  {
    id: '2',
    title: 'The Dark Knight',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop',
    duration: '2h 32m',
    genre: 'Action'
  },
  {
    id: '3',
    title: 'Interstellar',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop',
    duration: '2h 49m',
    genre: 'Sci-Fi'
  },
  {
    id: '4',
    title: 'Pulp Fiction',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
    duration: '2h 34m',
    genre: 'Crime'
  },
  {
    id: '5',
    title: 'The Matrix',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    poster: 'https://placehold.co/400x600',
    duration: '2h 16m',
    genre: 'Sci-Fi'
  },
  {
    id: '6',
    title: 'Goodfellas',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    poster: 'https://placehold.co/400x600',
    duration: '2h 26m',
    genre: 'Crime'
  }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const filteredMovies = useMemo(() => {
    return moviesData.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (movie.genre && movie.genre.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const handlePlayMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsPlayerOpen(true);
  };

  const handleDownloadMovie = (movie: Movie) => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = movie.video;
    link.download = `${movie.title}.mp4`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Downloading ${movie.title}...`);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-zinc-950' : 'bg-white'} transition-colors duration-300`}>
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        darkMode={darkMode}
        onThemeToggle={() => setDarkMode(!darkMode)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-100 mb-2">
            {searchTerm ? `Search Results for "${searchTerm}"` : 'Featured Movies'}
          </h2>
          <p className="text-slate-400">
            {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''} available
          </p>
        </div>
        
        <MovieGrid
          movies={filteredMovies}
          onPlay={handlePlayMovie}
          onDownload={handleDownloadMovie}
        />
      </main>
      
      <VideoPlayer
        movie={selectedMovie}
        isOpen={isPlayerOpen}
        onClose={handleClosePlayer}
        onDownload={handleDownloadMovie}
      />
      
      <footer className="bg-zinc-900 border-t border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-red-600 text-xl font-bold mb-2">StreamFlix</h3>
              <p className="text-slate-400 text-sm">Premium streaming experience</p>
            </div>
            
            <div className="flex space-x-6 text-slate-400 text-sm">
              <a href="#" className="hover:text-slate-100 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-100 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-100 transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-6 pt-6 text-center text-slate-500 text-sm">
            © 2025 StreamFlix. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
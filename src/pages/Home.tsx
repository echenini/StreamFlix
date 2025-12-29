import React, { useState, useMemo, useEffect } from 'react';
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

export default function Home() {
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  // Load movies from local JSON file
  useEffect(() => {
    fetch('/video/movies.json')
      .then(res => res.json())
      .then(data => setMoviesData(data))
      .catch(err => console.error('Error loading movies:', err));
  }, []);

  const filteredMovies = useMemo(() => {
    return moviesData.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (movie.genre && movie.genre.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, moviesData]);

  const handlePlayMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsPlayerOpen(true);
  };

  const handleDownloadMovie = (movie: Movie) => {
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

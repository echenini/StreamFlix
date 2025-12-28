import React from 'react';
import MovieCard from './MovieCard';

interface Movie {
  id: string;
  title: string;
  video: string;
  poster: string;
  duration?: string;
  genre?: string;
}

interface MovieGridProps {
  movies: Movie[];
  onPlay: (movie: Movie) => void;
  onDownload: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onPlay, onDownload }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-slate-400 text-xl mb-2">No movies found</h3>
        <p className="text-slate-500">Try adjusting your search terms</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onPlay={onPlay}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
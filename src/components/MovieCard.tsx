import React from 'react';
import { Play, Download, Clock } from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  video: string;
  poster: string;
  duration?: string;
  genre?: string;
}

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onDownload: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPlay, onDownload }) => {
  return (
    <div className="group relative bg-zinc-800 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/20">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onPlay(movie)}
            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
            aria-label={`Play ${movie.title}`}
          >
            <Play className="w-8 h-8 ml-1" fill="currentColor" />
          </button>
        </div>
        
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onDownload(movie)}
            className="bg-zinc-900/80 hover:bg-zinc-800 text-white p-2 rounded-full backdrop-blur-sm"
            aria-label={`Download ${movie.title}`}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
        
        {movie.duration && (
          <div className="absolute bottom-2 left-2 bg-zinc-900/80 text-white px-2 py-1 rounded text-xs flex items-center space-x-1 backdrop-blur-sm">
            <Clock className="w-3 h-3" />
            <span>{movie.duration}</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-slate-100 font-semibold text-lg mb-1 line-clamp-2">{movie.title}</h3>
        {movie.genre && (
          <p className="text-slate-400 text-sm">{movie.genre}</p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
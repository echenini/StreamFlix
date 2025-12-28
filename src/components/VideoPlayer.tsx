import React, { useRef, useEffect } from 'react';
import { X, Download } from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  video: string;
  poster: string;
  duration?: string;
  genre?: string;
}

interface VideoPlayerProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (movie: Movie) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ movie, isOpen, onClose, onDownload }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !videoRef.current) return;
      
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          if (videoRef.current.paused) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
          break;
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          videoRef.current.currentTime -= 10;
          break;
        case 'ArrowRight':
          e.preventDefault();
          videoRef.current.currentTime += 10;
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <button
          onClick={() => onDownload(movie)}
          className="bg-zinc-900/80 hover:bg-zinc-800 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
          aria-label={`Download ${movie.title}`}
        >
          <Download className="w-5 h-5" />
        </button>
        <button
          onClick={onClose}
          className="bg-zinc-900/80 hover:bg-zinc-800 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
          aria-label="Close player"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="absolute top-4 left-4 z-10">
        <h2 className="text-white text-xl font-semibold bg-zinc-900/80 px-4 py-2 rounded-lg backdrop-blur-sm">
          {movie.title}
        </h2>
      </div>
      
      <video
        ref={videoRef}
        src={movie.video}
        controls
        autoPlay
        className="w-full h-full object-contain"
        poster={movie.poster}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
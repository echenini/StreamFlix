import React from 'react';
import { Search, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  darkMode: boolean;
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, darkMode, onThemeToggle }) => {
  return (
    <header className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur-md border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-red-600">StreamFlix</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-slate-100 hover:text-red-500 transition-colors">Home</a>
              <a href="#" className="text-slate-400 hover:text-red-500 transition-colors">Movies</a>
              <a href="#" className="text-slate-400 hover:text-red-500 transition-colors">TV Shows</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 bg-zinc-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent w-64"
              />
            </div>
            
            <button
              onClick={onThemeToggle}
              className="p-2 text-slate-400 hover:text-slate-100 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
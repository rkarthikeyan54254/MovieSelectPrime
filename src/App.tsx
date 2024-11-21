import React, { useState, useEffect } from 'react';
import { Clapperboard, Film, RefreshCw, Heart } from 'lucide-react';
import { LanguageSelector } from './components/LanguageSelector';
import { DecadeSelector } from './components/DecadeSelector';
import { RegionSelector } from './components/RegionSelector';
import { MovieCard } from './components/MovieCard';
import { fetchMoviesByLanguage } from './services/tmdb';
import type { Movie } from './types/movie';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedDecade, setSelectedDecade] = useState('Latest');
  const [selectedRegion, setSelectedRegion] = useState('IN');
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [unusedMovies, setUnusedMovies] = useState<Movie[]>([]);
  const [usedMovies, setUsedMovies] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const loadMovies = async () => {
    setIsLoading(true);
    const fetchedMovies = await fetchMoviesByLanguage(selectedLanguage, selectedDecade, selectedRegion);
    setMovies(fetchedMovies);
    setUnusedMovies(shuffleArray([...fetchedMovies]));
    setUsedMovies(new Set());
    
    if (fetchedMovies.length > 0) {
      const randomMovie = fetchedMovies[Math.floor(Math.random() * fetchedMovies.length)];
      setCurrentMovie(randomMovie);
      setUsedMovies(new Set([randomMovie.id]));
    } else {
      setCurrentMovie(null);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    loadMovies();
  }, [selectedLanguage, selectedDecade, selectedRegion]);

  const handleShuffle = () => {
    if (movies.length === 0) return;

    if (usedMovies.size >= movies.length) {
      setUsedMovies(new Set());
      setUnusedMovies(shuffleArray([...movies]));
    }

    const availableMovies = unusedMovies.filter(movie => !usedMovies.has(movie.id));
    if (availableMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableMovies.length);
      const selectedMovie = availableMovies[randomIndex];
      setCurrentMovie(selectedMovie);
      setUsedMovies(new Set([...usedMovies, selectedMovie.id]));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-4 md:py-8 px-3 md:px-4">
      <header className="container mx-auto text-center mb-8 md:mb-12">
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-3 md:mb-4">
          <Film className="w-8 h-8 md:w-10 md:h-10 text-blue-400 transform -rotate-12" />
          <h1 className="text-3xl md:text-5xl font-bold text-gradient">Movie Select Prime</h1>
          <Clapperboard className="w-8 h-8 md:w-10 md:h-10 text-purple-400 transform rotate-12" />
        </div>
        
        <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
          (re)Discover your next favorite movie with us! No more endless scrolling – just click and enjoy!
        </p>
        
        <div className="flex flex-col items-center space-y-4 md:space-y-6 max-w-md mx-auto px-4">
          <RegionSelector
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
          />
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
          <DecadeSelector
            selectedDecade={selectedDecade}
            onDecadeChange={setSelectedDecade}
          />
          
          <button
            onClick={handleShuffle}
            disabled={isLoading || movies.length === 0}
            className="btn-primary w-full md:w-48"
          >
            <RefreshCw className={`w-4 h-4 md:w-5 md:h-5 ${isLoading ? 'animate-spin' : ''}`} />
            Shuffle Movie
          </button>
        </div>
      </header>

      <main className="container mx-auto mt-6 md:mt-8 px-2 md:px-4">
        {isLoading ? (
          <div className="text-center text-lg md:text-xl">Loading...</div>
        ) : currentMovie ? (
          <MovieCard movie={currentMovie} />
        ) : (
          <div className="text-center text-lg md:text-xl">
            No movies found for the selected criteria.
          </div>
        )}
      </main>

      <footer className="container mx-auto mt-8 md:mt-12 text-center text-gray-400 space-y-3 md:space-y-4 px-4">
        <p className="text-sm md:text-base">Data provided by TMDB. Available on Prime Video.</p>
        <p className="text-xs md:text-sm">Movie Select Prime™ - All rights reserved © {new Date().getFullYear()}</p>
        <p className="flex items-center justify-center gap-2 text-sm">
          Made with <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500 fill-current" /> and AI
        </p>
      </footer>
    </div>
  );
}
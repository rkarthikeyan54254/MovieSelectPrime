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

function App() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 px-4">
      <header className="container mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Film className="w-10 h-10 text-blue-400 transform -rotate-12" />
          <h1 className="text-5xl font-bold text-gradient">Movie Select Prime</h1>
          <Clapperboard className="w-10 h-10 text-purple-400 transform rotate-12" />
        </div>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover your next favorite movie with AI-powered recommendations. No more endless scrolling – just click and enjoy!
        </p>
        
        <div className="flex flex-col items-center space-y-6 max-w-md mx-auto">
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
            className="btn-primary w-48"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            Shuffle Movie
          </button>
        </div>
      </header>

      <main className="container mx-auto mt-8">
        {isLoading ? (
          <div className="text-center text-xl">Loading...</div>
        ) : currentMovie ? (
          <MovieCard movie={currentMovie} />
        ) : (
          <div className="text-center text-xl">
            No movies found for the selected criteria.
          </div>
        )}
      </main>

      <footer className="container mx-auto mt-12 text-center text-gray-400 space-y-4">
        <p>Data provided by TMDB. Available on Prime Video.</p>
        <p className="text-sm">Movie Select Prime™ - All rights reserved © {new Date().getFullYear()}</p>
        <p className="flex items-center justify-center gap-2">
          Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> and AI
        </p>
      </footer>
    </div>
  );
}

export default App;
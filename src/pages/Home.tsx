import React, { useState, useEffect, useCallback } from 'react';
import { Clapperboard, Film, RefreshCw } from 'lucide-react';
import { LanguageSelector } from '../components/LanguageSelector';
import { DecadeSelector } from '../components/DecadeSelector';
import { RegionSelector } from '../components/RegionSelector';
import { GenreSelector } from '../components/GenreSelector';
import { SortSelector } from '../components/SortSelector';
import { SearchBar } from '../components/SearchBar';
import { MovieCard } from '../components/MovieCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { fetchMoviesByLanguage, searchMovies } from '../services/tmdb';
import type { Movie } from '../types/movie';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedDecade, setSelectedDecade] = useState('Latest');
  const [selectedRegion, setSelectedRegion] = useState('IN');
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>(undefined);
  const [selectedSort, setSelectedSort] = useState('popularity.desc');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [unusedMovies, setUnusedMovies] = useState<Movie[]>([]);
  const [usedMovies, setUsedMovies] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const loadMovies = useCallback(async () => {
    setIsLoading(true);
    let fetchedMovies: Movie[] = [];
    
    if (searchQuery) {
      fetchedMovies = await searchMovies(searchQuery, selectedRegion);
    } else {
      fetchedMovies = await fetchMoviesByLanguage(
        selectedLanguage, 
        selectedDecade, 
        selectedRegion,
        selectedSort,
        selectedGenre
      );
    }
    
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
  }, [selectedLanguage, selectedDecade, selectedRegion, selectedGenre, selectedSort, searchQuery]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const handleShuffle = () => {
    if (movies.length === 0) return;

    if (usedMovies.size >= movies.length) {
      setUsedMovies(new Set());
      const shuffled = shuffleArray([...movies]);
      setUnusedMovies(shuffled);
      const first = shuffled[0];
      setCurrentMovie(first);
      setUsedMovies(new Set([first.id]));
      return;
    }

    const availableMovies = unusedMovies.filter(movie => !usedMovies.has(movie.id));
    if (availableMovies.length > 0) {
      const nextMovie = availableMovies[0];
      setCurrentMovie(nextMovie);
      setUsedMovies(new Set([...usedMovies, nextMovie.id]));
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="space-y-8 md:space-y-12">
      <header className="text-center space-y-6 md:space-y-8">
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-3 md:mb-4">
          <Film className="w-8 h-8 md:w-10 md:h-10 text-blue-500 transform -rotate-12" />
          <h1 className="text-3xl md:text-5xl font-bold text-gradient">Movie Select Prime</h1>
          <Clapperboard className="w-8 h-8 md:w-10 md:h-10 text-purple-500 transform rotate-12" />
        </div>
        
        <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto px-4">
          (re)Discover your next favorite movie with us! No more endless scrolling – just click and enjoy!
        </p>

        <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
        
        {!searchQuery && (
          <div className="flex flex-col items-center space-y-6 w-full max-w-4xl mx-auto px-4">
            <div className="space-y-4 w-full">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Region</h3>
              <RegionSelector selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} />
            </div>
            
            <div className="space-y-4 w-full">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Language</h3>
              <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
            </div>

            <div className="space-y-4 w-full">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Decade</h3>
              <DecadeSelector selectedDecade={selectedDecade} onDecadeChange={setSelectedDecade} />
            </div>

            <div className="space-y-4 w-full">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Genre</h3>
              <GenreSelector selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />
            </div>

            <div className="space-y-4 w-full">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Sort By</h3>
              <SortSelector selectedSort={selectedSort} onSortChange={setSelectedSort} />
            </div>
          </div>
        )}
        
        <div className="flex justify-center">
          <button
            onClick={handleShuffle}
            disabled={isLoading || movies.length === 0}
            className="btn-primary w-full md:w-64"
          >
            <RefreshCw className={`w-4 h-4 md:w-5 md:h-5 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Fetching Movies...' : 'Shuffle Movie'}
          </button>
        </div>
      </header>

      <main className="px-2 md:px-4">
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <RefreshCw className="w-8 h-8 text-purple-500 animate-spin" />
              <p className="text-lg font-medium text-secondary">Finding great movies for you...</p>
            </div>
            <SkeletonCard />
          </div>
        ) : currentMovie ? (
          <MovieCard movie={currentMovie} />
        ) : (
          <div className="text-center py-20 bg-gray-100 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-lg md:text-xl text-secondary">
              No movies found for the selected criteria. Try changing your filters!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
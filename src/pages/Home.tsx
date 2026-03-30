import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Filter, Settings2 } from 'lucide-react';
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
  const [showFilters, setShowFilters] = useState(false);
  
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

  return (
    <div className="space-y-12 md:space-y-20 animate-fade-in">
      <header className="max-w-5xl mx-auto text-center space-y-8 md:space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
            PICK YOUR <br />
            <span className="text-gradient-chic italic">CINEMA.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto font-medium">
            (re)Discover high-fidelity cinema curated for your mood.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
          <div className="w-full md:max-w-md">
            <SearchBar onSearch={setSearchQuery} onClear={() => setSearchQuery('')} />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`chic-btn-secondary flex items-center gap-2 ${showFilters ? 'bg-purple-500/20' : ''}`}
          >
            <Settings2 className="w-5 h-5" />
            Preferences
          </button>
        </div>

        {showFilters && !searchQuery && (
          <div className="chic-glass rounded-[2rem] p-8 md:p-12 space-y-10 text-left animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-text-secondary">Region</label>
                <RegionSelector selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-text-secondary">Language</label>
                <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-text-secondary">Decade</label>
                <DecadeSelector selectedDecade={selectedDecade} onDecadeChange={setSelectedDecade} />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-text-secondary">Genre</label>
                <GenreSelector selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-text-secondary">Sort By</label>
                <SortSelector selectedSort={selectedSort} onSortChange={setSelectedSort} />
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-center pt-4">
          <button
            onClick={handleShuffle}
            disabled={isLoading || movies.length === 0}
            className="chic-btn-primary px-12 py-5 text-xl flex items-center gap-3 animate-breath group"
          >
            <RefreshCw className={`w-6 h-6 group-hover:rotate-180 transition-transform duration-500 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Scanning...' : 'Shuffle Choice'}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto pb-20">
        {isLoading ? (
          <div className="space-y-8">
            <SkeletonCard />
          </div>
        ) : currentMovie ? (
          <div className="spotlight-reveal">
            <MovieCard movie={currentMovie} />
          </div>
        ) : (
          <div className="chic-glass rounded-[3rem] py-32 text-center border-dashed">
            <p className="text-xl md:text-2xl font-bold text-text-secondary">
              The screen is dark. <br />
              <span className="text-sm font-normal">Try adjusting your preferences to find a match.</span>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
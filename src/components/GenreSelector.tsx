import React, { useEffect, useState } from 'react';
import { fetchGenres } from '../services/tmdb';
import type { Genre } from '../types/movie';

interface GenreSelectorProps {
  selectedGenre: number | undefined;
  onGenreChange: (genreId: number | undefined) => void;
}

export function GenreSelector({ selectedGenre, onGenreChange }: GenreSelectorProps) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const loadGenres = async () => {
      const fetchedGenres = await fetchGenres();
      setGenres(fetchedGenres);
    };
    loadGenres();
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onGenreChange(undefined)}
        className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
          selectedGenre === undefined
            ? 'bg-white text-black'
            : 'chic-glass text-text-secondary'
        }`}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onGenreChange(genre.id)}
          className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
            selectedGenre === genre.id
              ? 'bg-white text-black shadow-lg shadow-white/10'
              : 'chic-glass text-text-secondary hover:bg-white/5'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}
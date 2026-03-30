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
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full">
      <button
        onClick={() => onGenreChange(undefined)}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base ${
          selectedGenre === undefined
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        All Genres
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onGenreChange(genre.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base ${
            selectedGenre === genre.id
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}
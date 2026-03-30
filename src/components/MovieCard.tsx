import React from 'react';
import { ExternalLink, Star, Calendar, Globe, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const releaseYear = new Date(movie.release_date).getFullYear();
  const rating = Math.round(movie.vote_average * 10) / 10;

  return (
    <div className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl overflow-hidden shadow-xl dark:shadow-2xl backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.01] mx-auto max-w-4xl border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative group overflow-hidden">
          <img 
            src={posterUrl} 
            alt={movie.title}
            loading="lazy"
            className="w-full h-[450px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white drop-shadow-2xl">
              {movie.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/90 backdrop-blur-md rounded-full text-white shadow-lg font-bold">
                <Star className="w-4 h-4" fill="currentColor" />
                <span>{rating}</span>
              </div>
              
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white shadow-lg font-semibold">
                <Calendar className="w-4 h-4" />
                <span>{releaseYear}</span>
              </div>
              
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/50 backdrop-blur-md rounded-full text-white shadow-lg font-semibold">
                <Globe className="w-4 h-4" />
                <span>{movie.original_language.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary">Synopsis</h3>
              <p className="text-base md:text-lg leading-relaxed text-secondary italic">
                "{movie.overview}"
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Link
              to={`/movie/${movie.id}`}
              className="flex items-center justify-center gap-2 w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
            >
              <Info className="w-5 h-5" />
              More Details & Trailer
            </Link>

            <a
              href={movie.watch_providers?.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#00A8E1] hover:bg-[#0096C8] text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
            >
              <ExternalLink className="w-5 h-5" />
              Watch on Prime Video
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
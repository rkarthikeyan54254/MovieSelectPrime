import React from 'react';
import { ExternalLink, Star, Calendar, Globe } from 'lucide-react';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const releaseYear = new Date(movie.release_date).getFullYear();
  const rating = Math.round(movie.vote_average * 10) / 10;

  return (
    <div className="bg-gray-800/50 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] mx-auto max-w-4xl">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative group">
          <img 
            src={posterUrl} 
            alt={movie.title}
            className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Always visible gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80" />
          
          {/* Movie info container */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white drop-shadow-lg">
              {movie.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 md:gap-3 text-sm">
              {/* Rating badge */}
              <div className="flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 bg-yellow-500 bg-opacity-30 backdrop-blur-md rounded-full text-white shadow-lg">
                <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" fill="currentColor" />
                <span className="font-semibold">{rating}</span>
              </div>
              
              {/* Year badge */}
              <div className="flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 bg-white bg-opacity-20 backdrop-blur-md rounded-full text-white shadow-lg">
                <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                <span className="font-semibold">{releaseYear}</span>
              </div>
              
              {/* Language badge */}
              <div className="flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 bg-purple-500 bg-opacity-30 backdrop-blur-md rounded-full text-white shadow-lg">
                <Globe className="w-3 h-3 md:w-4 md:h-4 text-purple-300" />
                <span className="font-semibold">{movie.original_language.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-5 md:p-8">
          <div className="space-y-4 md:space-y-6">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-white">Synopsis</h3>
              <p className="text-base md:text-lg leading-relaxed text-white">
                {movie.overview}
              </p>
            </div>
            
            <a
              href={movie.watch_providers?.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#00A8E1] text-white py-3 px-6 rounded-lg font-semibold 
                      hover:bg-[#0096C8] transition-all duration-300 flex items-center justify-center gap-2
                      shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
              Watch on Prime Video
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
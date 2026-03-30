import React from 'react';
import { ExternalLink, Star, Calendar, Globe, Info, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  const releaseYear = new Date(movie.release_date).getFullYear();
  const rating = Math.round(movie.vote_average * 10) / 10;

  return (
    <div className="relative group chic-glass rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-purple-500/10 border-0">
      <div className="flex flex-col lg:flex-row">
        {/* Cinematic Poster Section */}
        <div className="w-full lg:w-[45%] relative aspect-[2/3] lg:aspect-auto">
          <img 
            src={posterUrl} 
            alt={movie.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent lg:bg-gradient-to-r" />
          
          <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 z-20 flex flex-wrap gap-3">
             <div className="flex items-center gap-1.5 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full text-white border border-white/10 font-bold text-sm">
                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                <span>{rating}</span>
              </div>
              <div className="flex items-center gap-1.5 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full text-white border border-white/10 font-bold text-sm">
                <Calendar className="w-4 h-4" />
                <span>{releaseYear}</span>
              </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-[55%] p-8 lg:p-16 flex flex-col justify-center space-y-10 bg-bg-secondary/30">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-text-primary">
              {movie.title}
            </h2>
            <p className="text-xl lg:text-2xl leading-relaxed text-text-secondary font-medium line-clamp-4">
              {movie.overview}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={`/movie/${movie.id}`}
              className="chic-btn-primary px-10 py-5 text-lg flex items-center justify-center gap-3 shadow-2xl"
            >
              <Info className="w-6 h-6" />
              Detailed View
            </Link>

            <a
              href={movie.watch_providers?.link}
              target="_blank"
              rel="noopener noreferrer"
              className="chic-btn-secondary px-10 py-5 text-lg flex items-center justify-center gap-3"
            >
              <Play className="w-6 h-6 fill-current" />
              Stream Now
            </a>
          </div>

          <div className="pt-8 border-t border-glass-border flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-chic-gray bg-gray-800" />
              ))}
            </div>
            <p className="text-sm font-bold text-text-secondary uppercase tracking-widest">
              Available on Prime Video
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
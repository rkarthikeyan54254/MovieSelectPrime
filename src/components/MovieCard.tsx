import React from 'react';
import { Star, Calendar, Info, Play } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getDirectStreamingLink, PROVIDERS } from '../services/tmdb';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  const releaseYear = new Date(movie.release_date).getFullYear();
  const rating = Math.round(movie.vote_average * 10) / 10;
  
  // Find the primary provider for branding
  const flatrate = movie.watch_providers?.flatrate || [];
  const primaryProvider = flatrate[0];
  
  // Get region from URL or context (default to IN for search links if not easily available)
  // In a real app, we might pass this down or use a store. 
  // For now, we'll try to infer from common logic or default.
  const region = 'IN'; 

  const watchUrl = primaryProvider 
    ? getDirectStreamingLink(movie.title, primaryProvider.provider_id, region)
    : movie.watch_providers?.link;

  const providerName = primaryProvider?.provider_name || 'Streaming';
  
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
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="chic-btn-secondary px-10 py-5 text-lg flex items-center justify-center gap-3 border-2 border-transparent hover:border-white/20 transition-all"
              style={{ 
                backgroundColor: primaryProvider ? 'rgba(255, 255, 255, 0.05)' : undefined,
                color: 'var(--text-primary)'
              }}
            >
              <Play className="w-6 h-6 fill-current" />
              Watch on {providerName}
            </a>
          </div>

          <div className="pt-8 border-t border-glass-border flex flex-col gap-4">
             <p className="text-xs font-black text-text-secondary uppercase tracking-[0.2em]">
              Available on
            </p>
            <div className="flex flex-wrap gap-4">
              {flatrate.map((provider) => (
                <div key={provider.provider_id} className="flex items-center gap-2 group/icon">
                  <img 
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                    alt={provider.provider_name}
                    title={provider.provider_name}
                    className="w-8 h-8 rounded-lg shadow-lg grayscale group-hover/icon:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Star, Calendar, Clock, 
  ExternalLink, Play, Users, Film, Info
} from 'lucide-react';
import { fetchMovieDetails, getDirectStreamingLink } from '../services/tmdb';
import { VideoPlayer } from '../components/VideoPlayer';
import type { Movie } from '../types/movie';

export function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      if (id) {
        setIsLoading(true);
        const details = await fetchMovieDetails(parseInt(id));
        setMovie(details);
        setIsLoading(false);
        window.scrollTo(0, 0);
      }
    };
    loadDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 animate-fade-in">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin shadow-2xl shadow-purple-500/20" />
        <p className="text-xl font-bold tracking-tighter uppercase opacity-50">Curating Exhibit...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-32 chic-glass rounded-[3rem] max-w-2xl mx-auto">
        <h2 className="text-3xl font-black mb-6">COLLECTION ERROR.</h2>
        <Link to="/" className="chic-btn-primary px-8">Return Home</Link>
      </div>
    );
  }

  const trailer = movie.videos?.results.find(
    v => (v.type === 'Trailer' || v.type === 'Teaser') && v.site === 'YouTube'
  );

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

  // Find the region (default to IN)
  const region = 'IN'; 

  return (
    <div className="space-y-12 md:space-y-20 animate-fade-in pb-20">
      <Link to="/" className="chic-btn-secondary inline-flex items-center gap-3">
        <ArrowLeft className="w-5 h-5" />
        Back to Exhibit
      </Link>

      <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-chic-gray aspect-[21/9] hidden md:block">
        <img src={backdropUrl} alt="" className="w-full h-full object-cover opacity-60 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative md:-mt-40 px-4 md:px-0">
        {/* Left Column: Poster & Quick Info */}
        <div className="lg:col-span-4 space-y-10">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl chic-glass border-0">
            <img src={posterUrl} alt={movie.title} className="w-full h-auto" />
          </div>
          
          <div className="chic-glass rounded-[2rem] p-8 space-y-8">
            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-text-secondary flex items-center gap-3">
                <Info className="w-5 h-5" />
                Metadata
              </h3>
              <div className="grid grid-cols-2 gap-8 text-sm">
                <div className="space-y-1">
                  <p className="text-text-secondary font-bold uppercase tracking-tighter">Status</p>
                  <p className="font-black text-lg">Released</p>
                </div>
                <div className="space-y-1">
                  <p className="text-text-secondary font-bold uppercase tracking-tighter">Language</p>
                  <p className="font-black text-lg uppercase">{movie.original_language}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-text-secondary font-bold uppercase tracking-tighter">Runtime</p>
                  <p className="font-black text-lg">{movie.runtime} min</p>
                </div>
                <div className="space-y-1">
                  <p className="text-text-secondary font-bold uppercase tracking-tighter">Rating</p>
                  <div className="flex items-center gap-2 font-black text-lg">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    {Math.round(movie.vote_average * 10) / 10}
                  </div>
                </div>
              </div>
            </div>

            {movie.watch_providers && (
              <div className="space-y-8 pt-8 border-t border-glass-border">
                <h3 className="text-sm font-black uppercase tracking-widest text-text-secondary flex items-center gap-3">
                  <Play className="w-5 h-5" />
                  Streaming Hub
                </h3>
                <div className="space-y-4">
                  {(movie.watch_providers.flatrate || []).map(provider => {
                    const watchUrl = getDirectStreamingLink(movie.title, provider.provider_id, region);
                    
                    return (
                      <div key={provider.provider_id} className="group/provider">
                         <a 
                          href={watchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 rounded-2xl chic-glass hover:bg-white/5 transition-all group-hover/provider:scale-[1.02]"
                        >
                          <div className="flex items-center gap-3">
                            <img 
                              src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                              alt={provider.provider_name}
                              className="w-10 h-10 rounded-xl"
                            />
                            <span className="font-black text-sm uppercase tracking-tighter">{provider.provider_name}</span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-text-secondary opacity-0 group-hover/provider:opacity-100 transition-opacity" />
                        </a>
                      </div>
                    );
                  })}
                  
                  {!(movie.watch_providers.flatrate || []).length && (
                    <p className="text-xs font-bold text-text-secondary uppercase italic">
                      No direct stream available in this region.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Main Info & Trailer */}
        <div className="lg:col-span-8 space-y-12 lg:space-y-20">
          <div className="space-y-6">
            {movie.tagline && (
              <p className="text-purple-500 font-black uppercase tracking-[0.3em] text-xs">
                {movie.tagline}
              </p>
            )}
            <h1 className="text-6xl md:text-9xl font-black leading-[0.85] tracking-tighter text-text-primary">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-text-secondary font-bold">
              <span className="flex items-center gap-2 uppercase tracking-tighter">
                <Calendar className="w-5 h-5" />
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="flex items-center gap-2 uppercase tracking-tighter">
                <Clock className="w-5 h-5" />
                {movie.runtime} min
              </span>
              <div className="flex gap-3">
                {movie.genres?.map(genre => (
                  <span key={genre.id} className="chic-glass px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-3xl font-black tracking-tighter">OVERVIEW.</h3>
            <p className="text-2xl lg:text-3xl leading-relaxed text-text-secondary font-medium">
              {movie.overview}
            </p>
          </div>

          {trailer && (
            <div className="space-y-10">
              <h3 className="text-3xl font-black tracking-tighter">THE PREVIEW.</h3>
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-glass-border">
                <VideoPlayer videoKey={trailer.key} />
              </div>
            </div>
          )}

          {movie.credits && (
            <div className="space-y-10">
              <h3 className="text-3xl font-black tracking-tighter flex items-center gap-4">
                CAST EXHIBIT.
              </h3>
              <div className="flex overflow-x-auto pb-10 gap-8 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {movie.credits.cast.slice(0, 8).map(person => (
                  <div key={person.id} className="flex-shrink-0 w-40 space-y-4 group">
                    <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl bg-chic-gray chic-glass">
                      {person.profile_path ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w185${person.profile_path}`} 
                          alt={person.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-700">
                          <Users className="w-10 h-10" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-base font-black tracking-tighter line-clamp-1">{person.name}</p>
                      <p className="text-xs text-text-secondary font-bold uppercase tracking-widest line-clamp-1">{person.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
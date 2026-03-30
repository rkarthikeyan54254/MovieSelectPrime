import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Star, Calendar, Clock, 
  ExternalLink, Play, Users, Film 
} from 'lucide-react';
import { fetchMovieDetails } from '../services/tmdb';
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-lg font-medium text-secondary">Loading movie details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
        <Link to="/" className="text-purple-500 hover:underline">Back to Home</Link>
      </div>
    );
  }

  const trailer = movie.videos?.results.find(
    v => (v.type === 'Trailer' || v.type === 'Teaser') && v.site === 'YouTube'
  );

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="space-y-8 md:space-y-12">
      <Link to="/" className="inline-flex items-center gap-2 text-purple-500 hover:text-purple-600 font-semibold transition-colors">
        <ArrowLeft className="w-5 h-5" />
        Back to Selection
      </Link>

      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 aspect-[21/9] hidden md:block">
        <img src={backdropUrl} alt="" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative md:-mt-32">
        {/* Left Column: Poster & Quick Info */}
        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
            <img src={posterUrl} alt={movie.title} className="w-full h-auto" />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
                <Film className="w-5 h-5 text-purple-500" />
                Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-gray-500">Status</p>
                  <p className="font-semibold">Released</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">Language</p>
                  <p className="font-semibold uppercase">{movie.original_language}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">Runtime</p>
                  <p className="font-semibold">{movie.runtime} mins</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">Rating</p>
                  <div className="flex items-center gap-1 font-semibold">
                    <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                    {Math.round(movie.vote_average * 10) / 10}
                  </div>
                </div>
              </div>
            </div>

            {movie.watch_providers && (
              <div className="space-y-4 pt-4 border-t dark:border-gray-700">
                <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
                  <Play className="w-5 h-5 text-blue-500" />
                  Where to Watch
                </h3>
                <div className="flex flex-wrap gap-3">
                  {movie.watch_providers.flatrate?.map(provider => (
                    <img 
                      key={provider.provider_id}
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      title={provider.provider_name}
                      className="w-10 h-10 rounded-lg shadow-sm"
                    />
                  ))}
                </div>
                <a 
                  href={movie.watch_providers.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#00A8E1] hover:bg-[#0096C8] text-white rounded-xl font-bold transition-all text-sm"
                >
                  Stream Now <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Main Info & Trailer */}
        <div className="lg:col-span-2 space-y-8 md:space-y-12">
          <div className="space-y-4">
            {movie.tagline && (
              <p className="text-purple-500 font-bold uppercase tracking-widest text-sm">
                {movie.tagline}
              </p>
            )}
            <h1 className="text-4xl md:text-6xl font-black text-primary leading-tight">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-secondary">
              <span className="flex items-center gap-1.5 font-semibold">
                <Calendar className="w-5 h-5" />
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <Clock className="w-5 h-5" />
                {movie.runtime} min
              </span>
              <div className="flex gap-2">
                {movie.genres?.map(genre => (
                  <span key={genre.id} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs font-bold">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">Overview</h3>
            <p className="text-lg md:text-xl leading-relaxed text-secondary">
              {movie.overview}
            </p>
          </div>

          {trailer && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary">Trailer</h3>
              <VideoPlayer videoKey={trailer.key} />
            </div>
          )}

          {movie.credits && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-2 text-primary">
                <Users className="w-6 h-6 text-purple-500" />
                Top Cast
              </h3>
              <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
                {movie.credits.cast.slice(0, 10).map(person => (
                  <div key={person.id} className="flex-shrink-0 w-32 space-y-3">
                    <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-md bg-gray-100 dark:bg-gray-800">
                      {person.profile_path ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w185${person.profile_path}`} 
                          alt={person.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Users className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold line-clamp-1">{person.name}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{person.character}</p>
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
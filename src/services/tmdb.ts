import axios, { AxiosError } from 'axios';
import type { Movie, TMDBResponse, Genre } from '../types/movie';

const TMDB_API_KEY = '800e51d97755c2994e7aba7143888ef0';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const PROVIDERS = {
  'IN': [
    { id: 8, name: 'Netflix', color: '#E50914' },
    { id: 119, name: 'Amazon Prime', color: '#00A8E1' },
    { id: 232, name: 'Zee5', color: '#8230C6' }
  ],
  'US': [
    { id: 8, name: 'Netflix', color: '#E50914' },
    { id: 9, name: 'Amazon Prime', color: '#00A8E1' }
  ]
};

function getDateRangeForDecade(decade: string): { start_date: string; end_date: string } {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();

  switch (decade) {
    case '70s':
      return { start_date: '1970-01-01', end_date: '1979-12-31' };
    case '80s':
      return { start_date: '1980-01-01', end_date: '1989-12-31' };
    case '90s':
      return { start_date: '1990-01-01', end_date: '1999-12-31' };
    case '2K':
      return { start_date: '2000-01-01', end_date: '2009-12-31' };
    case 'Latest':
      return {
        start_date: `${currentYear - 2}-${currentMonth.toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`,
        end_date: `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`
      };
    default:
      return { start_date: '1970-01-01', end_date: `${currentYear}-12-31` };
  }
}

export async function fetchGenres(): Promise<Genre[]> {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
      params: { api_key: TMDB_API_KEY }
    });
    return response.data.genres;
  } catch (error) {
    console.error('Failed to fetch genres', error);
    return [];
  }
}

export async function fetchMoviesByLanguage(
  language: string,
  decade: string = 'Latest',
  region: string = 'IN',
  sortBy: string = 'popularity.desc',
  withGenre?: number,
  providerIds: number[] = [8, 119, 232] // Default to all selected for IN
): Promise<Movie[]> {
  try {
    const languageCode = getLanguageCode(language);
    const { start_date, end_date } = getDateRangeForDecade(decade);
    const providersString = providerIds.join('|');

    const response = await axios.get<TMDBResponse>(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        with_watch_providers: providersString,
        watch_region: region,
        with_original_language: languageCode,
        'primary_release_date.gte': start_date,
        'primary_release_date.lte': end_date,
        sort_by: sortBy,
        with_genres: withGenre,
        page: 1,
      },
    });

    const movies = response.data.results;
    const moviesWithProviders = await Promise.all(
      movies.map(async (movie) => {
        const watchProviders = await fetchWatchProviders(movie.id, region);
        return { ...movie, watch_providers: watchProviders };
      })
    );

    // Filter to ensure the movie is available on at least one of the selected providers
    return moviesWithProviders.filter((movie) => 
      movie.watch_providers?.flatrate?.some(
        provider => providerIds.includes(provider.provider_id)
      )
    );
  } catch (error) {
    const errorMessage = error instanceof AxiosError 
      ? `API Error: ${error.message}`
      : 'An unexpected error occurred';
    console.error(errorMessage);
    return [];
  }
}

export async function fetchMovieDetails(movieId: number, region: string = 'IN'): Promise<Movie | null> {
  try {
    const response = await axios.get<Movie>(`${TMDB_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,
        append_to_response: 'credits,videos'
      }
    });
    const watchProviders = await fetchWatchProviders(movieId, region);
    return { ...response.data, watch_providers: watchProviders };
  } catch (error) {
    console.error('Failed to fetch movie details', error);
    return null;
  }
}

export async function searchMovies(query: string, region: string = 'IN'): Promise<Movie[]> {
  try {
    const response = await axios.get<TMDBResponse>(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query,
        region
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Search failed', error);
    return [];
  }
}

async function fetchWatchProviders(movieId: number, region: string) {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${movieId}/watch/providers`,
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );
    return response.data.results[region];
  } catch (error) {
    console.error('Failed to fetch watch providers', error);
    return null;
  }
}

function getLanguageCode(language: string): string {
  const languageCodes: Record<string, string> = {
    'English': 'en',
    'Hindi': 'hi',
    'Tamil': 'ta',
    'Telugu': 'te'
  };
  return languageCodes[language] || 'en';
}

export function getDirectStreamingLink(title: string, providerId: number, region: string) {
  const encodedTitle = encodeURIComponent(title);
  
  // Mapping of common provider search URLs
  const searchUrls: Record<number, string> = {
    8: `https://www.netflix.com/search?q=${encodedTitle}`, // Netflix
    119: `https://www.primevideo.com/search/?phrase=${encodedTitle}`, // Prime Video IN
    9: `https://www.amazon.com/s?k=${encodedTitle}+prime+video`, // Prime Video US
    232: `https://www.zee5.com/search?q=${encodedTitle}` // Zee5
  };

  return searchUrls[providerId] || `https://www.google.com/search?q=${encodedTitle}+watch+online`;
}
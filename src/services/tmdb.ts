import axios, { AxiosError } from 'axios';
import type { Movie, TMDBResponse } from '../types/movie';

const TMDB_API_KEY = '800e51d97755c2994e7aba7143888ef0';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const PROVIDER_IDS = {
  'IN': 119, // Prime Video India
  'US': 9    // Prime Video US
};

function getDateRangeForDecade(decade: string): { start_date: string; end_date: string } {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();

  switch (decade) {
    case '70s':
      return {
        start_date: '1970-01-01',
        end_date: '1979-12-31'
      };
    case '80s':
      return {
        start_date: '1980-01-01',
        end_date: '1989-12-31'
      };
    case '90s':
      return {
        start_date: '1990-01-01',
        end_date: '1999-12-31'
      };
    case '2K':
      return {
        start_date: '2000-01-01',
        end_date: '2009-12-31'
      };
    case 'Latest':
      return {
        start_date: `${currentYear - 2}-${currentMonth.toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`,
        end_date: `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`
      };
    default:
      return {
        start_date: '1970-01-01',
        end_date: `${currentYear}-12-31`
      };
  }
}

export async function fetchMoviesByLanguage(
  language: string,
  decade: string = 'Latest',
  region: string = 'IN'
): Promise<Movie[]> {
  try {
    const languageCode = getLanguageCode(language);
    const { start_date, end_date } = getDateRangeForDecade(decade);
    const providerId = PROVIDER_IDS[region as keyof typeof PROVIDER_IDS];

    const response = await axios.get<TMDBResponse>(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        with_watch_providers: providerId,
        watch_region: region,
        with_original_language: languageCode,
        'primary_release_date.gte': start_date,
        'primary_release_date.lte': end_date,
        sort_by: 'popularity.desc',
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

    return moviesWithProviders.filter((movie) => movie.watch_providers?.flatrate?.some(
      provider => provider.provider_id === providerId
    ));
  } catch (error) {
    const errorMessage = error instanceof AxiosError 
      ? `API Error: ${error.message}`
      : 'An unexpected error occurred';
    console.error(errorMessage);
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
    const errorMessage = error instanceof AxiosError 
      ? `Failed to fetch watch providers: ${error.message}`
      : 'An unexpected error occurred while fetching watch providers';
    console.error(errorMessage);
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
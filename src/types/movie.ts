export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  original_language: string;
  vote_average: number;
  vote_count: number;
  runtime?: number;
  tagline?: string;
  genres?: Array<{ id: number; name: string }>;
  watch_providers?: {
    link: string;
    flatrate?: Array<WatchProvider>;
    buy?: Array<WatchProvider>;
    rent?: Array<WatchProvider>;
  };
  credits?: {
    cast: Array<CastMember>;
  };
  videos?: {
    results: Array<MovieVideo>;
  };
}

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}
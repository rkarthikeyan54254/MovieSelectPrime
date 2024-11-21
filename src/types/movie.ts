export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  original_language: string;
  vote_average: number;
  watch_providers?: {
    link: string;
    flatrate?: Array<{ provider_id: number; provider_name: string }>;
  };
}
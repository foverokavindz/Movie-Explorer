export type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface MovieFilters {
  genre?: string | number;
  year?: string | number;
  sort_by?: string;
  [key: string]: any;
}

export type Movie = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
  release_date: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  video: boolean;
  original_language: string;
  genre_ids: number[];
  media_type?: string;
};

// You might also want to create a type for the API response format
export type MovieListResponse = {
  page: number;
  results: Movie[];
  total_pages?: number;
  total_results?: number;
};

export type TimeWindow = 'day' | 'week';

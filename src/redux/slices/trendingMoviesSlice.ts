import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type {
  LoadingStatus,
  Movie,
  MovieListResponse,
  TimeWindow,
} from '../../types/movietypes';

const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDk4M2ZlYjY3N2NmNTljMWVhMjFhNDY3ODM5MDY1NiIsIm5iZiI6MTc0NjcxNzQ4NC4wNTYsInN1YiI6IjY4MWNjYjJjMjQzNzU5MDY0MDNlYzk2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6ZZ8Lvy_fHegU5JYUD7RhSGkFs_Idfu6wRxOBH_Fo_I'; // Replace with your actual API key

// Define fetch parameters type
interface FetchTrendingParams {
  timeWindow: TimeWindow;
  page: number;
}

interface TrendingMoviesState {
  movies: Movie[];
  currentPage: number;
  totalPages: number;
  timeWindow: TimeWindow;
  status: LoadingStatus;
  error: string | null;
}

const initialState: TrendingMoviesState = {
  movies: [],
  currentPage: 1,
  totalPages: 1,
  timeWindow: 'day',
  status: 'idle',
  error: null,
};

export const fetchTrendingMovies = createAsyncThunk<
  MovieListResponse,
  FetchTrendingParams,
  { rejectValue: string }
>('trendingMovies/fetchTrendingMovies', async (params, { rejectWithValue }) => {
  const { timeWindow, page } = params;

  try {
    // Use proper URL without API key in query string
    const apiUrl = `https://api.themoviedb.org/3/trending/movie/${timeWindow}?page=${page}`;

    // Use fetch with Authorization header
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch trending movies');

    const data: MovieListResponse = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

const trendingMoviesSlice = createSlice({
  name: 'trendingMovies',
  initialState,
  reducers: {
    clearTrendingMovies: (state) => {
      state.movies = [];
      state.currentPage = 1;
    },
    setTimeWindow: (state, action: PayloadAction<TimeWindow>) => {
      // When time window changes, reset to page 1 and clear movies
      if (state.timeWindow !== action.payload) {
        state.timeWindow = action.payload;
        state.movies = [];
        state.currentPage = 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchTrendingMovies.fulfilled,
        (state, action: PayloadAction<MovieListResponse>) => {
          state.status = 'succeeded';

          // If it's page 1, replace movies, otherwise append
          if (action.payload.page === 1) {
            state.movies = action.payload.results;
          } else {
            // Append new movies while avoiding duplicates
            const newMovies = action.payload.results.filter(
              (newMovie) =>
                !state.movies.some(
                  (existingMovie) => existingMovie.id === newMovie.id
                )
            );
            state.movies = [...state.movies, ...newMovies];
          }

          state.currentPage = action.payload.page;
          state.totalPages = action.payload.total_pages || 1;
        }
      )
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch trending movies';
      });
  },
});

export const { clearTrendingMovies, setTimeWindow } =
  trendingMoviesSlice.actions;
export default trendingMoviesSlice.reducer;

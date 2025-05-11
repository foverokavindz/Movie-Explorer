import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import type {
  LoadingStatus,
  Movie,
  MovieListResponse,
  TimeWindow,
} from '../../types/movietypes';
import { showToast } from '../../utils/toast';

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const API_URL = import.meta.env.VITE_TMDB_URL;

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

// This function fetches trending movies from the TMDB API based on the specified time window and page number
export const fetchTrendingMovies = createAsyncThunk<
  MovieListResponse,
  FetchTrendingParams,
  { rejectValue: string }
>('trendingMovies/fetchTrendingMovies', async (params, { rejectWithValue }) => {
  const { timeWindow, page } = params;

  try {
    const completeURL = API_URL + `/trending/movie/${timeWindow}?page=${page}`;

    const response = await axios.get<MovieListResponse>(completeURL, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred';
    return rejectWithValue(errorMessage);
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
        showToast.error(action.payload || 'Failed to fetch trending movies');
      });
  },
});

export const { clearTrendingMovies, setTimeWindow } =
  trendingMoviesSlice.actions;
export default trendingMoviesSlice.reducer;

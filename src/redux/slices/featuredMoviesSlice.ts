import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type {
  LoadingStatus,
  Movie,
  MovieListResponse,
} from '../../types/movietypes';
import axios from 'axios';

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const API_URL = import.meta.env.VITE_TMDB_URL;
interface FetchPopularParams {
  page: number;
}

interface FeaturedMoviesState {
  movies: Movie[];
  currentPage: number;
  totalPages: number;
  status: LoadingStatus;
  error: string | null;
}

const initialState: FeaturedMoviesState = {
  movies: [],
  currentPage: 1,
  totalPages: 1,
  status: 'idle',
  error: null,
};

export const fetchFeaturedMovies = createAsyncThunk<
  MovieListResponse,
  FetchPopularParams,
  { rejectValue: string }
>('featuredMovies/fetchFeaturedMovies', async (params, { rejectWithValue }) => {
  const { page } = params;
  try {
    // Use axios instead of fetch
    const response = await axios.get<MovieListResponse>(
      `${API_URL}/movie/now_playing`,
      {
        params: { page },
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred';
    return rejectWithValue(errorMessage);
  }
});

const featuredMoviesSlice = createSlice({
  name: 'featuredMovies',
  initialState,
  reducers: {
    clearFeaturedMovies: (state) => {
      state.movies = [];
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchFeaturedMovies.fulfilled,
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
      .addCase(fetchFeaturedMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch featured movies';
      });
  },
});

export const { clearFeaturedMovies } = featuredMoviesSlice.actions;
export default featuredMoviesSlice.reducer;

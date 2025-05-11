import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import {
  type LoadingStatus,
  type Movie,
  type MovieListResponse,
} from '../../types/movietypes';
import axios from 'axios';
import { showToast } from '../../utils/toast';

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const API_URL = import.meta.env.VITE_TMDB_URL;

interface FetchKeywordParams {
  keyword: string;
  genre?: string;
  year?: string;
  ratings?: number | null;
  page: number;
}

interface BrowseMoviesState {
  movies: Movie[];
  currentPage: number;
  totalPages: number;
  status: LoadingStatus;
  error: string | null;
  searchTerm: string;
  searchGenre: string;
  searchYear: string;
  searchRatings: number | null;
}

const initialState: BrowseMoviesState = {
  movies: [],
  currentPage: 1,
  totalPages: 1,
  status: 'idle',
  error: null,
  searchTerm: '',
  searchGenre: '',
  searchYear: '',
  searchRatings: 0,
};

// This function fetches movies from the TMDB API based on the specified keyword and other filters
export const fetchBrowseMovies = createAsyncThunk<
  MovieListResponse,
  FetchKeywordParams,
  { rejectValue: string }
>('browseMovies/fetchBrowseMovies', async (params, { rejectWithValue }) => {
  const { keyword, page, genre, ratings, year } = params;
  try {
    let completeURL = API_URL + `/discover/movie?page=${page}`;

    // Add keyword search if provided
    if (keyword && keyword.trim() !== '') {
      completeURL =
        API_URL +
        `/search/movie?query=${encodeURIComponent(keyword)}&page=${page}`;
    }

    // Add other filter parameters if provided
    if (genre && genre !== 'All') {
      completeURL += `&with_genres=${genre}`;
    }

    if (year && year !== 'All') {
      // specify release year with release_date parameters
      completeURL += `&primary_release_year=${year}`;
    }

    if (ratings && ratings > 0) {
      // For ratings filter
      completeURL += `&vote_average.gte=${ratings}`;
    }

    // Sort by popularity
    completeURL += '&sort_by=popularity.desc';

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

//
const browseMoviesSlice = createSlice({
  name: 'browseMovies',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.movies = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.status = 'idle';
      state.error = null;
      state.searchTerm = '';
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrowseMovies.pending, (state) => {
        state.status = 'loading';
        showToast.loading('Searching...');
      })
      .addCase(
        fetchBrowseMovies.fulfilled,
        (state, action: PayloadAction<MovieListResponse>) => {
          showToast.success('Movies loaded successfully');
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
      .addCase(fetchBrowseMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch movies';
        showToast.error(
          action.payload || 'Failed to fetch movies, please try again'
        );
      });
  },
});

export const { clearSearchResults, setPage, setSearchKeyword } =
  browseMoviesSlice.actions;
export default browseMoviesSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  Movie,
  MovieResponse,
  MovieFilters,
  LoadingStatus,
} from '../../types/movietypes';

interface BrowseMoviesState {
  movies: Movie[];
  currentPage: number;
  totalPages: number;
  filters: MovieFilters;
  status: LoadingStatus;
  error: string | null;
}

interface FetchBrowseMoviesArgs {
  page?: number;
  filters?: MovieFilters;
}

const initialState: BrowseMoviesState = {
  movies: [],
  currentPage: 1,
  totalPages: 1,
  filters: {},
  status: 'idle',
  error: null,
};

export const fetchBrowseMovies = createAsyncThunk<
  MovieResponse,
  FetchBrowseMoviesArgs,
  { rejectValue: string }
>(
  'browseMovies/fetchBrowseMovies',
  async (
    { page = 1, filters = {} }: FetchBrowseMoviesArgs,
    { rejectWithValue }
  ) => {
    try {
      // Replace with your actual API call
      // Add query parameters for pagination and filters
      const queryParams = new URLSearchParams({
        page: page.toString(),
        ...Object.entries(filters).reduce((acc, [key, value]) => {
          acc[key] = value?.toString() || '';
          return acc;
        }, {} as Record<string, string>),
      }).toString();

      const response = await fetch(`YOUR_API_URL/movies?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch movies');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

const browseMoviesSlice = createSlice({
  name: 'browseMovies',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<MovieFilters>) => {
      state.filters = action.payload;
      state.currentPage = 1; // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrowseMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchBrowseMovies.fulfilled,
        (state, action: PayloadAction<MovieResponse>) => {
          state.status = 'succeeded';
          state.movies =
            action.payload.results || (action.payload as unknown as Movie[]);
          state.totalPages = action.payload.total_pages || 1;
          state.currentPage = action.payload.page || state.currentPage;
        }
      )
      .addCase(fetchBrowseMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch movies';
      });
  },
});

export const { setFilters, clearFilters, setPage } = browseMoviesSlice.actions;
export default browseMoviesSlice.reducer;

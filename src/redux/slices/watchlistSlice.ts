import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types/movietypes';

interface WatchlistState {
  movies: Movie[];
}

const initialState: WatchlistState = {
  movies: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      // Check if movie is already in watchlist to avoid duplicates
      if (!state.movies.some((item) => item.id === movie.id)) {
        state.movies.push(movie);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;
      state.movies = state.movies.filter((movie) => movie.id !== movieId);
    },
    clearWatchlist: (state) => {
      state.movies = [];
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, clearWatchlist } =
  watchlistSlice.actions;
export default watchlistSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type MovieList = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  popularity: number;
  watchlistAdded: boolean;
};
interface WatchlistState {
  movies: MovieList[];
}

const initialState: WatchlistState = {
  movies: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<MovieList>) => {
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

import { useSelector, useDispatch } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../redux/slices/watchlistSlice';
import { fetchTrendingMovies } from '../redux/slices/trendingMoviesSlice';
import { fetchFeaturedMovies } from '../redux/slices/featuredMoviesSlice';
import { fetchBrowseMovies, setFilters, setPage } from '../redux/slices/browseMoviesSlice';
import { RootState, AppDispatch } from '../redux/store';
import { Movie, MovieFilters } from '../types/movietypes';

// Type-safe hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T => {
  return useSelector<RootState, T>(selector);
};

// Watchlist hooks
export const useWatchlist = () => {
  const watchlist = useAppSelector(state => state.watchlist.movies);
  const dispatch = useAppDispatch();
  
  const addMovie = (movie: Movie) => dispatch(addToWatchlist(movie));
  const removeMovie = (movieId: number) => dispatch(removeFromWatchlist(movieId));
  const isInWatchlist = (movieId: number) => watchlist.some(movie => movie.id === movieId);
  
  return { watchlist, addMovie, removeMovie, isInWatchlist };
};

// Trending movies hooks
export const useTrendingMovies = () => {
  const { movies, status, error } = useAppSelector(state => state.trendingMovies);
  const dispatch = useAppDispatch();
  
  const loadTrendingMovies = () => dispatch(fetchTrendingMovies());
  
  return { movies, status, error, loadTrendingMovies };
};

// Featured movies hooks
export const useFeaturedMovies = () => {
  const { movies, status, error } = useAppSelector(state => state.featuredMovies);
  const dispatch = useAppDispatch();
  
  const loadFeaturedMovies = () => dispatch(fetchFeaturedMovies());
  
  return { movies, status, error, loadFeaturedMovies };
};

// Browse movies hooks
export const useBrowseMovies = () => {
  const { movies, currentPage, totalPages, filters, status, error } = useAppSelector(state => state.browseMovies);
  const dispatch = useAppDispatch();
  
  const loadMovies = (page: number = currentPage, newFilters: MovieFilters = filters) => {
    dispatch(fetchBrowseMovies({ page, filters: newFilters }));
  };
  
  const updateFilters = (newFilters: MovieFilters) => {
    dispatch(setFilters(newFilters));
    loadMovies(1, newFilters); // Load first page with new filters
  };
  
  const changePage = (newPage: number) => {
    dispatch(setPage(newPage));
    loadMovies(newPage);
  };
  
  return { 
    movies, 
    currentPage, 
    totalPages, 
    filters,
    status, 
    error, 
    loadMovies, 
    updateFilters, 
    changePage 
  };
};

import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import MovieCardGrid from '../components/movieCardGrid';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { fetchFeaturedMovies } from '../redux/slices/featuredMoviesSlice';
import SectionHeading from '../components/sectionHeading';

const GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'War',
];

const YEARS = Array.from({ length: 74 }, (_, i) => 2030 - i);

const BrowseMovies = () => {
  // const [movies, setMovies] = useState([
  //   {
  //     id: 1,
  //     title: 'Inception',
  //     year: 2010,
  //     genre: 'Sci-Fi',
  //     rating: 8.8,
  //     posterUrl: 'https://via.placeholder.com/300x450?text=Inception',
  //   },
  //   {
  //     id: 2,
  //     title: 'The Shawshank Redemption',
  //     year: 1994,
  //     genre: 'Drama',
  //     rating: 9.3,
  //     posterUrl: 'https://via.placeholder.com/300x450?text=Shawshank',
  //   },
  //   {
  //     id: 3,
  //     title: 'The Dark Knight',
  //     year: 2008,
  //     genre: 'Action',
  //     rating: 9.0,
  //     posterUrl: 'https://via.placeholder.com/300x450?text=Dark+Knight',
  //   },
  //   {
  //     id: 4,
  //     title: 'Pulp Fiction',
  //     year: 1994,
  //     genre: 'Crime',
  //     rating: 8.9,
  //     posterUrl: 'https://via.placeholder.com/300x450?text=Pulp+Fiction',
  //   },
  //   {
  //     id: 5,
  //     title: 'Forrest Gump',
  //     year: 1994,
  //     genre: 'Drama',
  //     rating: 8.8,
  //     posterUrl: 'https://via.placeholder.com/300x450?text=Forrest+Gump',
  //   },
  //   {
  //     id: 6,
  //     title: 'The Matrix',
  //     year: 1999,
  //     genre: 'Sci-Fi',
  //     rating: 8.7,
  //     posterUrl: 'https://via.placeholder.com/300x450?text=The+Matrix',
  //   },
  //   {
  //     id: 7,
  //     title: 'Interstellar',
  //     year: 2014,
  //     genre: 'Sci-Fi',
  //     rating: 8.6,
  //     posterUrl: 'https://via.placeholder.com/300x450?text=Interstellar',
  //   },
  //   {
  //     id: 8,
  //     title: 'The Lord of the Rings',
  //     year: 2003,
  //     genre: 'Fantasy',
  //     rating: 9.0,
  //     posterUrl: 'https://via.placeholder.com/300x450?text=LOTR',
  //   },
  // ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('All');
  const [year, setYear] = useState('All');
  const [rating, setRating] = useState([0, 10]);

  // Helper function to get color based on rating
  function getRatingColor(rating: any) {
    if (rating >= 8) return '#4CAF50';
    if (rating >= 6) return '#FFC107';
    return '#F44336';
  }
  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    console.log('Search filters:', { searchTerm, genre, year, rating });
    // Here you would typically trigger an API call with these filters
  };

  const handleRatingChange = (event: any, newValue: any) => {
    setRating(newValue);
  };

  // Filter movies based on current filter values
  // const filteredMovies = movies.filter((movie) => {
  //   return (
  //     (genre === 'All' || movie.genre === genre) &&
  //     (year === 'All' || movie.year === parseInt(year as string, 10)) &&
  //     movie.rating >= rating[0] &&
  //     movie.rating <= rating[1] &&
  //     (searchTerm === '' ||
  //       movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
  //   );
  // });

  const dispatch = useDispatch<AppDispatch>();
  const { movies, status, error, currentPage, totalPages } = useSelector(
    (state: RootState) => state.featuredMovies
  );

  // Fetch movies when component mounts
  useEffect(() => {
    if (status === 'idle' || status === 'failed') {
      dispatch(
        fetchFeaturedMovies({
          page: 1,
        })
      );
    }
  }, [dispatch, status]);

  // Handle time window change
  // const handleChange = (
  //   event: React.MouseEvent<HTMLElement>,
  //   newTimeWindow: TimeWindow | null
  // ) => {
  //   // Prevent deselecting both options
  //   if (newTimeWindow !== null) {
  //     dispatch(setTimeWindow(newTimeWindow));
  //     dispatch(fetchTrendingMovies({ timeWindow: newTimeWindow, page: 1 }));
  //   }
  // };

  // Load more movies function
  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      dispatch(
        fetchFeaturedMovies({
          page: currentPage + 1,
        })
      );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ fontWeight: 600, mb: 4 }}
      >
        Browse Movies
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <form onSubmit={handleSearchSubmit}>
          <Grid container spacing={3}>
            {/* Search Input */}
            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search Term:"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    px: 4,
                    bgcolor: '#8BC34A',
                    '&:hover': {
                      bgcolor: '#7CB342',
                    },
                  }}
                >
                  <SearchIcon />
                  Search
                </Button>
              </Box>
            </Grid>

            {/* Filters Row */}
            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {/* Genre Filter */}
                <FormControl sx={{ minWidth: 180, flex: 1 }}>
                  <InputLabel id="genre-label">Genre:</InputLabel>
                  <Select
                    labelId="genre-label"
                    value={genre}
                    label="Genre:"
                    onChange={(e) => setGenre(e.target.value)}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {GENRES.map((g) => (
                      <MenuItem key={g} value={g}>
                        {g}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Rating Filter */}
                <FormControl sx={{ minWidth: 180, flex: 1 }}>
                  <Typography id="rating-slider" gutterBottom>
                    Rating: {rating[0]} - {rating[1]}
                  </Typography>
                  <Box sx={{ px: 1 }}>
                    <Slider
                      value={rating}
                      onChange={handleRatingChange}
                      valueLabelDisplay="auto"
                      min={0}
                      max={10}
                      step={0.5}
                      marks={[
                        { value: 0, label: '0' },
                        { value: 5, label: '5' },
                        { value: 10, label: '10' },
                      ]}
                    />
                  </Box>
                </FormControl>

                {/* Year Filter */}
                <FormControl sx={{ minWidth: 180, flex: 1 }}>
                  <InputLabel id="year-label">Year:</InputLabel>
                  <Select
                    labelId="year-label"
                    value={year}
                    label="Year:"
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {YEARS.map((y) => (
                      <MenuItem key={y} value={y}>
                        {y}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Filter Tags/Chips */}
      <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {genre !== 'All' && (
          <Chip
            label={`Genre: ${genre}`}
            onDelete={() => setGenre('All')}
            color="primary"
            variant="outlined"
          />
        )}
        {year !== 'All' && (
          <Chip
            label={`Year: ${year}`}
            onDelete={() => setYear('All')}
            color="primary"
            variant="outlined"
          />
        )}
        {(rating[0] > 0 || rating[1] < 10) && (
          <Chip
            label={`Rating: ${rating[0]}-${rating[1]}`}
            onDelete={() => setRating([0, 10])}
            color="primary"
            variant="outlined"
          />
        )}
        {searchTerm && (
          <Chip
            label={`Search: ${searchTerm}`}
            onDelete={() => setSearchTerm('')}
            color="primary"
            variant="outlined"
          />
        )}
      </Box>

      {/* if search result cleared then show all movies */}

      <SectionHeading title="All Popular Movies" subtitle="Top Picks for You" />
      {/* Movie Grid */}
      <MovieCardGrid
        movies={movies}
        loading={status === 'loading' && movies.length === 0}
        error={error}
      />

      {/* Add Load More button if more pages exist */}
      {currentPage < totalPages && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleLoadMore}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      )}

      {/*  show search results if click on search button */}

      {/* Search results */}

      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          {/* {filteredMovies.length} movies found */} 8 movies found
        </Typography>

        <Button
          variant="outlined"
          size="medium"
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <CloseIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1" sx={{ textTransform: 'none' }}>
            Clear search results
          </Typography>
        </Button>
      </Box>

      {/* {filteredMovies.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h6" color="text.secondary">
            No movies found matching your filters.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try adjusting your search criteria.
          </Typography>
        </Box>
      )} */}
    </Container>
  );
};

export default BrowseMovies;

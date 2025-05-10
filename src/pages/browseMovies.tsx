import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Popover,
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
import {
  clearSearchResults,
  fetchBrowseMovies,
  setSearchKeyword,
} from '../redux/slices/browseMoviesSlice';
import type { Movie } from '../types/movietypes';
import TuneIcon from '@mui/icons-material/Tune';
import { useSearchParams } from 'react-router';

const GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

const YEARS = Array.from({ length: 74 }, (_, i) => 2030 - i);

const BrowseMovies = () => {
  const [genre, setGenre] = useState('All');
  const [year, setYear] = useState('All');
  const [rating, setRating] = useState([0, 10]);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [searchYear, setSearchYear] = useState('All');
  const [searchRating, setSearchRating] = useState<string | number>('');
  const [searchGenre, setSearchGenre] = useState('All');
  const [searchActive, setSearchActive] = useState(false);
  const open = Boolean(filterAnchorEl);
  const popoverId = open ? 'filter-popover' : undefined;
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();
  const {
    movies: allMovies,
    status: allMoviesStatus,
    error: allMoviesError,
    currentPage: allMoviesCurrentPage,
    totalPages: allMoviesTotalPages,
  } = useSelector((state: RootState) => state.featuredMovies);

  const {
    movies: searchResults,
    status: searchResultsStatus,
    error: searchResultsError,
    currentPage: searchResultsCurrentPage,
    totalPages: searchResultsTotalPages,
  } = useSelector((state: RootState) => state.browseMovies);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    setSearchActive(true);

    dispatch(setSearchKeyword(searchTerm));

    dispatch(
      fetchBrowseMovies({
        keyword: searchTerm,
        genre: searchGenre,
        year: searchYear,
        ratings: Number(searchRating),
        page: 1,
      })
    );
  };

  const handleRatingChange = (_: any, newValue: any) => {
    setRating(newValue);
  };

  // Filter movies based on current filter values
  const filteredMovies = (movies: Movie[]) => {
    return movies.filter((movie: Movie) => {
      return (
        (genre === 'All' || movie.genre_ids.includes(parseInt(genre, 10))) &&
        (year === 'All' ||
          (movie.release_date &&
            new Date(movie.release_date).getFullYear() ===
              parseInt(year as string, 10))) &&
        movie.vote_average >= rating[0] &&
        movie.vote_average <= rating[1]
      );
    });
  };

  // Load more movies function
  const handleAllMoviesLoadMore = () => {
    if (allMoviesCurrentPage < allMoviesTotalPages) {
      dispatch(
        fetchFeaturedMovies({
          page: allMoviesCurrentPage + 1,
        })
      );
    }
  };

  const handleSearchResultsLoadMore = () => {
    if (searchResultsCurrentPage < searchResultsTotalPages) {
      dispatch(
        fetchBrowseMovies({
          keyword: searchTerm,
          page: searchResultsCurrentPage + 1,
        })
      );
    }
  };
  const handleClearSearchResults = () => {
    dispatch(clearSearchResults());
    setSearchActive(false);
    setSearchTerm('');
  };

  // Set up component state from URL params or Redux when component mounts
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');

    if (searchFromUrl) {
      // URL has search parameter - set search term from URL
      setSearchTerm(searchFromUrl);
      setSearchActive(true);

      dispatch(
        fetchBrowseMovies({
          keyword: searchFromUrl,
          genre: searchGenre,
          year: searchYear,
          ratings: Number(searchRating),
          page: 1,
        })
      );
    }
  }, []);

  // Fetch movies when component mounts
  useEffect(() => {
    if (allMoviesStatus === 'idle' || allMoviesStatus === 'failed') {
      dispatch(
        fetchFeaturedMovies({
          page: 1,
        })
      );
    }
  }, [dispatch, allMoviesStatus]);

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
        <Grid container spacing={3}>
          {/* Search Input */}
          <Grid size={{ xs: 12 }}>
            <form onSubmit={handleSearchSubmit}>
              <Typography variant="h6" gutterBottom>
                Search Movies
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter movie title"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ px: 4 }}
                >
                  <SearchIcon />
                  Search
                </Button>
              </Box>
            </form>
          </Grid>

          {/* Filters Row */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              Search filters
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {/* Genre Filter */}

              <FormControl sx={{ minWidth: 180, flex: 1 }}>
                <InputLabel id="genre-label">Genre:</InputLabel>
                <Select
                  labelId="genre-label"
                  value={searchGenre}
                  label="Genre:"
                  onChange={(e) => setSearchGenre(e.target.value)}
                >
                  <MenuItem value="All">All</MenuItem>
                  {GENRES.map((g) => (
                    <MenuItem key={g.id} value={g.id}>
                      {g.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Rating Filter */}

              {/* Year Filter */}
              <FormControl sx={{ minWidth: 180, flex: 1 }}>
                <InputLabel id="year-label">Year:</InputLabel>
                <Select
                  labelId="year-label"
                  value={searchYear}
                  label="Year:"
                  onChange={(e) => setSearchYear(e.target.value)}
                >
                  <MenuItem value="All">All</MenuItem>
                  {YEARS.map((y) => (
                    <MenuItem key={y} value={y}>
                      {y}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 180, flex: 1 }}>
                <InputLabel id="rating-label">Rating:</InputLabel>
                <Box sx={{ width: '100%' }}>
                  <Select
                    labelId="rating-label"
                    id="rating-select"
                    value={searchRating ? searchRating : ''}
                    label="Rating:"
                    onChange={(e) => setSearchRating(Number(e.target.value))}
                    sx={{ width: '100%' }}
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                      <MenuItem key={`min-${value}`} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/*  show search results if click on search button */}

      {/* Search results */}

      {searchActive ? (
        <>
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <SectionHeading
              title="Search Results"
              subtitle={`Found ${searchResults.length} movies`}
            />

            <Button
              variant="outlined"
              size="medium"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                textTransform: 'none',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content',
              }}
            >
              <CloseIcon sx={{ mr: 1 }} />
              <Typography
                variant="subtitle1"
                sx={{}}
                onClick={handleClearSearchResults}
              >
                Clear search results
              </Typography>
            </Button>
          </Box>

          <MovieCardGrid
            movies={searchResults}
            loading={
              searchResultsStatus === 'loading' && searchResults.length === 0
            }
            error={searchResultsError}
          />
          {/* Add Load More button if more pages exist */}
          {searchResultsCurrentPage < searchResultsTotalPages && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleSearchResultsLoadMore}
                disabled={searchResultsStatus === 'loading'}
              >
                {searchResultsStatus === 'loading' ? 'Loading...' : 'Load More'}
              </Button>
            </Box>
          )}
        </>
      ) : (
        <>
          {/* if search result cleared then show all movies */}

          <Box
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <SectionHeading
              title="All Popular Movies"
              subtitle="Top Picks for You"
            />
            {/* Filter Button that opens the popover */}
            <Button
              variant="outlined"
              onClick={handleFilterClick}
              startIcon={<TuneIcon />}
              aria-describedby={popoverId}
            >
              Filters
            </Button>
          </Box>

          {/* Filter Popover */}
          <Popover
            id={popoverId}
            open={open}
            anchorEl={filterAnchorEl}
            onClose={handleFilterClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: { width: 320, p: 2 },
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Filters
            </Typography>

            {/* Genre Filter */}

            <FormControl sx={{ minWidth: 180, width: '100%', flex: 1 }}>
              <InputLabel id="genre-label">Genre:</InputLabel>
              <Select
                labelId="genre-label"
                value={genre}
                label="Genre:"
                onChange={(e) => setGenre(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                {GENRES.map((g) => (
                  <MenuItem key={g.id} value={g.id}>
                    {g.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Divider sx={{ my: 2 }} />

            {/* Year Filter */}

            <FormControl sx={{ minWidth: 180, width: '100%', flex: 1 }}>
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
            <Divider sx={{ my: 2 }} />
            {/* Rating Filter */}
            <FormControl sx={{ minWidth: 180, width: '100%', flex: 1 }}>
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
            <Box
              sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  setGenre('All');
                  setYear('All');
                  setRating([0, 10]);
                }}
              >
                Reset All
              </Button>
            </Box>
          </Popover>

          {/* Filter Tags/Chips */}
          <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {genre !== 'All' && (
              <Chip
                label={`Genre: ${
                  GENRES.find((g) => g.id === parseInt(genre))?.name
                }`}
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
          </Box>

          {/* Movie Grid */}
          <MovieCardGrid
            movies={filteredMovies(allMovies)}
            loading={allMoviesStatus === 'loading' && allMovies.length === 0}
            error={allMoviesError}
          />

          {/* Add Load More button if more pages exist */}
          {allMoviesCurrentPage < allMoviesTotalPages && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleAllMoviesLoadMore}
                disabled={allMoviesStatus === 'loading'}
              >
                {allMoviesStatus === 'loading' ? 'Loading...' : 'Load More'}
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default BrowseMovies;

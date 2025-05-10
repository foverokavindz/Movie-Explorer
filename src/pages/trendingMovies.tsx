import {
  Box,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from '@mui/material';
import MovieCardGrid from '../components/movieCardGrid';
import SectionHeading from '../components/sectionHeading';
import { useEffect } from 'react';
import type { TimeWindow } from '../types/movietypes';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import {
  fetchTrendingMovies,
  setTimeWindow,
} from '../redux/slices/trendingMoviesSlice';

const TrendingMovies = () => {
  // Use AppDispatch instead of plain dispatch
  const dispatch = useDispatch<AppDispatch>();
  const { movies, status, error, currentPage, totalPages, timeWindow } =
    useSelector((state: RootState) => state.trendingMovies);

  // Fetch movies when component mounts
  useEffect(() => {
    if (status === 'idle' || status === 'failed') {
      dispatch(
        fetchTrendingMovies({
          timeWindow,
          page: 1,
        })
      );
    }
  }, [dispatch, status, timeWindow]);

  // Handle time window change
  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newTimeWindow: TimeWindow | null
  ) => {
    // Prevent deselecting both options
    if (newTimeWindow !== null) {
      dispatch(setTimeWindow(newTimeWindow));
      dispatch(fetchTrendingMovies({ timeWindow: newTimeWindow, page: 1 }));
    }
  };

  // Load more movies function
  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      dispatch(
        fetchTrendingMovies({
          timeWindow,
          page: currentPage + 1,
        })
      );
    }
  };

  return (
    <Container sx={{ mb: 8 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
          alignItems: 'center',
        }}
      >
        <SectionHeading title="Trending Movies" subtitle="Top Picks for You" />

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <ToggleButtonGroup
            color="primary"
            value={timeWindow} // Use Redux state, not local state
            exclusive
            onChange={handleChange}
            aria-label="Time Window"
          >
            <ToggleButton
              value="day"
              sx={{
                whiteSpace: 'nowrap',
                minWidth: 'fit-content',
                textTransform: 'none',
              }}
            >
              Today
            </ToggleButton>
            <ToggleButton
              value="week"
              sx={{
                whiteSpace: 'nowrap',
                minWidth: 'fit-content',
                textTransform: 'none',
              }}
            >
              This Week
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          justifyContent: 'flex-start',
          mb: 4,
          mt: -2,
        }}
      >
        <ToggleButtonGroup
          color="primary"
          value={timeWindow} // Use Redux state, not local state
          exclusive
          onChange={handleChange}
          aria-label="Time Window"
        >
          <ToggleButton
            value="day"
            sx={{
              whiteSpace: 'nowrap',
              minWidth: 'fit-content',
              textTransform: 'none',
            }}
          >
            Today
          </ToggleButton>
          <ToggleButton
            value="week"
            sx={{
              whiteSpace: 'nowrap',
              minWidth: 'fit-content',
              textTransform: 'none',
            }}
          >
            This Week
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

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
    </Container>
  );
};

export default TrendingMovies;

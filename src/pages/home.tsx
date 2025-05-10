import { Box, Button, Container } from '@mui/material';
import HeroSection from '../components/heroSection';
import SectionHeading from '../components/sectionHeading';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link as RouterLink, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../redux/slices/trendingMoviesSlice';
import MovieCardSlider from '../components/movieCardSlider';
import { fetchFeaturedMovies } from '../redux/slices/featuredMoviesSlice';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    movies: trendingMovies,
    status: trendingMoviesStatus,
    error: trendingMoviesError,
    timeWindow,
  } = useSelector((state: RootState) => state.trendingMovies);

  const {
    movies: featuredMovies,
    status: featuredMoviesStatus,
    error: featuredMoviesError,
  } = useSelector((state: RootState) => state.featuredMovies);

  const handleSearchKeywordChange = (value: any) => {
    setSearchTerm(value);
  };

  const handleSearchSubmit = (keyword: string) => {
    if (keyword.trim() !== '') {
      // Navigate to browse page with search query param
      navigate(`/browse-movies?search=${encodeURIComponent(keyword)}`);
    }
  };
  // Fetch movies when component mounts
  useEffect(() => {
    if (trendingMoviesStatus === 'idle' || trendingMoviesStatus === 'failed') {
      dispatch(
        fetchTrendingMovies({
          timeWindow,
          page: 1,
        })
      );
    }
  }, [dispatch, trendingMoviesStatus, timeWindow]);

  // Fetch featured  when component mounts
  useEffect(() => {
    if (featuredMoviesStatus === 'idle' || featuredMoviesStatus === 'failed') {
      dispatch(
        fetchFeaturedMovies({
          page: 1,
        })
      );
    }
  }, [dispatch, featuredMoviesStatus]);

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ mb: 8 }}>
        <HeroSection
          searchTerm={searchTerm}
          onChangeKeyword={handleSearchKeywordChange}
          onSubmit={handleSearchSubmit}
        />
      </Container>
      <Container sx={{ mb: 8 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 2,
            alignItems: 'center',
          }}
        >
          <SectionHeading
            title="Trending Movies"
            subtitle="Top Picks for You"
          />

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button
              role={undefined}
              variant="contained"
              tabIndex={-1}
              endIcon={<ArrowOutwardIcon />}
              sx={{
                whiteSpace: 'nowrap',
                minWidth: 'fit-content',
                textTransform: 'none',
              }}
              to="/trending"
              component={RouterLink}
            >
              View more
            </Button>
          </Box>
        </Box>

        <MovieCardSlider
          movies={trendingMovies}
          loading={trendingMoviesStatus === 'loading'}
          error={trendingMoviesError}
        />
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            mt: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Button
            role={undefined}
            variant="contained"
            tabIndex={-1}
            endIcon={<ArrowOutwardIcon />}
            sx={{
              whiteSpace: 'nowrap',
              minWidth: 'fit-content',
              textTransform: 'none',
            }}
            to="/trending"
            component={RouterLink}
          >
            View more
          </Button>
        </Box>
      </Container>
      <Container sx={{ mb: 8 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 2,
            alignItems: 'center',
          }}
        >
          <SectionHeading
            title="Featured Movies"
            subtitle="Top Picks for You"
          />

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button
              role={undefined}
              variant="contained"
              tabIndex={-1}
              endIcon={<ArrowOutwardIcon />}
              sx={{
                whiteSpace: 'nowrap',
                minWidth: 'fit-content',
                textTransform: 'none',
              }}
              to="/browse-movies"
              component={RouterLink}
            >
              View more
            </Button>
          </Box>
        </Box>
        {/* Movie card slider */}
        <MovieCardSlider
          movies={featuredMovies}
          loading={featuredMoviesStatus === 'loading'}
          error={featuredMoviesError}
        />
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            mt: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Button
            role={undefined}
            variant="contained"
            tabIndex={-1}
            endIcon={<ArrowOutwardIcon />}
            sx={{
              whiteSpace: 'nowrap',
              minWidth: 'fit-content',
              textTransform: 'none',
            }}
            to="/browse-movies"
            component={RouterLink}
          >
            View more
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Home;

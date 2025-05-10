import { Box, Container } from '@mui/material';
import SectionHeading from '../components/sectionHeading';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import MovieCardGrid from '../components/movieCardGrid';

const Watchlists = () => {
  const { movies } = useSelector((state: RootState) => state.watchlist);

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
        <SectionHeading title="Watchlists" subtitle="Your movie collection" />
      </Box>

      {/* Movie Grid */}
      <MovieCardGrid movies={movies} />
    </Container>
  );
};

export default Watchlists;

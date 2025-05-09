import { CircularProgress, Alert, Box } from '@mui/material';
import MovieCard from './movieCard';

function MovieCardSlider({ movies, loading, error }: any) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        Error loading movies: {error.message}
      </Alert>
    );
  }

  if (movies.length === 0) {
    return (
      <Alert severity="info" sx={{ my: 2 }}>
        No movies found.
      </Alert>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 2,
          '&::-webkit-scrollbar': {
            height: 8,
            display: 'none',
          },
          '&:hover::-webkit-scrollbar': {
            display: 'block',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: 4,
          },
        }}
      >
        {movies.map((movie: any) => (
          <Box key={movie.id} sx={{ minWidth: 250, maxWidth: 250 }}>
            <MovieCard movie={movie} />
          </Box>
        ))}
      </Box>
    </>
  );
}

export default MovieCardSlider;

import { Grid, CircularProgress, Alert, Box } from '@mui/material';
import MovieCard from './movieCard';

function MovieCardGrid({ movies, loading, error }: any) {
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
      <Grid
        container
        spacing={3}
        sx={{
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        {movies.map((movie: any) => (
          <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default MovieCardGrid;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate, useParams } from 'react-router';
import { MoreVert, PlaylistAdd } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  getMovieDetails,
  getMovieCast,
  getMovieTrailer,
} from '../services/moviesService';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { addToWatchlist } from '../redux/slices/watchlistSlice';
import { getGenreName } from '../utils/movieData';

// Interfaces for component state
interface MovieDetailsState {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string | null;
  releaseYear: string;
  runtime: string;
  voteAverage: number;
  genres: number[];
  overview: string;
  popularity: number;
  watchlistAdded?: boolean;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profilePath: string;
}

const MovieDetails = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movieDetails, setMovieDetails] = useState<MovieDetailsState | null>(
    null
  );
  const [cast, setCast] = useState<CastMember[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Separate state objects for each type of data

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!movieId) return;

      try {
        setLoading(true);

        // Fetch movie details
        const details = await getMovieDetails(parseInt(movieId));

        setMovieDetails({
          id: details.id,
          backdropPath: details.backdrop_path,
          title: details.title,
          posterPath: details.poster_path
            ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
            : '',
          releaseYear: details.release_date,
          runtime: `${Math.floor(details.runtime / 60)}h ${
            details.runtime % 60
          }m`,
          voteAverage: details.vote_average,
          genres: details.genres.map((genre) => genre.id),
          overview: details.overview,
          popularity: details.popularity,
        });

        // Fetch cast
        const castData = await getMovieCast(parseInt(movieId));

        setCast(
          castData.slice(0, 8).map((actor) => ({
            id: actor.id,
            name: actor.name,
            character: actor.character,
            profilePath: actor.profile_path
              ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
              : '',
          }))
        );

        // Fetch trailer
        const trailerKey = await getMovieTrailer(parseInt(movieId));

        if (trailerKey) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailerKey}`);
        }
      } catch (err) {
        console.error('Error fetching movie data:', err);
        setError('Failed to load movie data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddToWatchlist = () => {
    if (movieDetails) {
      dispatch(
        addToWatchlist({
          id: movieDetails.id,
          title: movieDetails.title,
          poster_path: movieDetails.posterPath,
          release_date: movieDetails.releaseYear,
          vote_average: movieDetails.voteAverage,
          genre_ids: movieDetails.genres,
          popularity: movieDetails.popularity,
          watchlistAdded: true,
          overview: movieDetails.overview,
          backdrop_path: movieDetails.backdropPath,
        })
      );
    }
    handleClose();
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h5" color="error" gutterBottom>
          {error}
        </Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  if (!movieDetails) {
    return (
      <Container sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Movie not found
        </Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ mb: 1, mt: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              whiteSpace: 'nowrap',
              minWidth: 'fit-content',
              textTransform: 'none',
            }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>

          <Box>
            <Tooltip title="Options">
              <IconButton
                onClick={handleClick}
                size="large"
                aria-controls={open ? 'options-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <MoreVert />
              </IconButton>
            </Tooltip>
            <Menu
              id="options-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleAddToWatchlist}>
                <PlaylistAdd sx={{ mr: 1 }} />
                Add to Watch List
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Container>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: 'start',
            alignItems: 'flex-start',
          }}
        >
          {/* Movie Poster and Trailer Button */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Card elevation={3}>
                <CardMedia
                  component="img"
                  height={isMobile ? 400 : 550}
                  image={movieDetails.posterPath}
                  alt={movieDetails.title}
                  sx={{ objectFit: 'cover' }}
                />
              </Card>
              {trailerUrl && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PlayArrowIcon />}
                  size="large"
                  fullWidth
                  component="a"
                  href={trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Trailer
                </Button>
              )}
            </Box>
          </Grid>

          {/* Movie Details */}
          <Grid size={{ xs: 12, md: 8 }} sx={{ px: 2 }}>
            {/* Title and Metadata */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" component="h1" gutterBottom>
                {movieDetails.title}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon fontSize="small" />
                  <Typography variant="body1">
                    {movieDetails.releaseYear}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="body1">
                    {movieDetails.runtime}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StarIcon fontSize="small" color="warning" />
                  <Typography variant="body1">
                    {movieDetails.voteAverage}/10
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {movieDetails.genres.map((genre) => (
                  <Chip
                    key={genre}
                    label={getGenreName(genre)}
                    variant="outlined"
                    size="medium"
                  />
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Movie Description */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Synopsis
              </Typography>
              <Typography variant="body1" paragraph>
                {movieDetails.overview}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Cast */}
            <Box>
              <Typography variant="h5" component="h2" gutterBottom>
                Cast
              </Typography>
              <Box sx={{ overflow: 'auto', pb: 2 }}>
                <Box
                  sx={{ display: 'flex', gap: 2, py: 1 }}
                  className="cast-scroll"
                >
                  {cast.length === 0 && (
                    <Alert severity="info" sx={{ my: 2 }}>
                      No cast information available.
                    </Alert>
                  )}
                  {cast.map((actor) => (
                    <Card
                      key={actor.id}
                      sx={{
                        minWidth: 150,
                        maxWidth: 150,
                        boxShadow: 2,
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.03)',
                          boxShadow: 3,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height={180}
                        image={actor.profilePath || '/placeholder-person.jpg'}
                        alt={actor.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <Box sx={{ p: 1.5 }}>
                        <Typography
                          variant="subtitle2"
                          fontWeight="bold"
                          noWrap
                        >
                          {actor.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                        >
                          {actor.character}
                        </Typography>
                      </Box>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MovieDetails;

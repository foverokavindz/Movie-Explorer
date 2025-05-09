import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Chip,
  IconButton,
  CardActionArea,
  Stack,
  Tooltip,
  useTheme,
  alpha,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

type MovieCardProps = {
  movie: {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
    popularity: number;
  };
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const theme = useTheme();

  // Default movie data if not provided
  const defaultMovie = {
    id: 1,
    title: 'Dune: Part Two',
    poster_path: '/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
    vote_average: 8.2,
    release_date: '2024-02-28',
    genre_ids: [878, 12], // Sci-fi and adventure
  };

  // Use provided movie data or defaults
  const movieData = movie || defaultMovie;

  // Format release date to get just the year
  const releaseYear = new Date(movieData.release_date).getFullYear();

  // Convert TMDB rating (0-10) to MUI Rating (0-5)
  const rating = movieData.vote_average / 2;

  // Map genre IDs to genre names (simplified)
  const genreMap: { [key: number]: string } = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Sci-Fi',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  // Get the primary genre (or default)
  const primaryGenre =
    movieData.genre_ids && movieData.genre_ids.length > 0
      ? genreMap[movieData.genre_ids[0] as number] || 'Movie'
      : 'Movie';

  // Poster URL (TMDB format)
  const posterUrl = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;

  return (
    <Card
      sx={{
        maxWidth: { xs: '100%', sm: 345 },
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: theme.shadows[1],
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardActionArea>
          {/* Movie Poster */}
          <CardMedia
            component="img"
            height="400"
            image={posterUrl}
            alt={movieData.title}
            sx={{
              objectFit: 'cover',
            }}
          />

          {/* Play button overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.2)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0,
              transition: 'all 0.3s ease',
              '&:hover': {
                opacity: 1,
              },
            }}
          >
            <IconButton
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(3px)',
                color: 'white',
                p: 2,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.7),
                },
              }}
            >
              <PlayCircleOutlineIcon fontSize="large" />
            </IconButton>
          </Box>

          {/* Genre chip */}
          <Chip
            label={primaryGenre}
            size="small"
            color="primary"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />

          {/* Action buttons */}
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              display: 'flex',
              gap: 1,
            }}
          >
            <Tooltip title="Add to watchlist">
              <IconButton
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(3px)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.7),
                  },
                }}
              >
                <BookmarkIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </Box>
        </CardActionArea>
      </Box>

      {/* Movie Info */}
      <CardContent sx={{ p: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: 700,
            fontSize: '1.1rem',
            mb: 0.5,
            // Limit to two lines
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            lineHeight: 1,
          }}
        >
          {movieData.title}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
          <Rating value={rating} precision={0.5} size="small" readOnly />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            {movieData.vote_average.toFixed(1)}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            {releaseYear}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MovieCard;

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
  Menu,
  MenuItem,
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { MoreVert, PlaylistAdd, PlaylistRemove } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import type { AppDispatch } from '../redux/store';
import {
  addToWatchlist,
  removeFromWatchlist,
} from '../redux/slices/watchlistSlice';
import { getGenreName } from '../utils/movieData';

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
    watchlistAdded?: boolean;
  };
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddToWatchlist = () => {
    dispatch(addToWatchlist({ ...movie, watchlistAdded: true }));
    handleClose();
  };

  const handleRemoveFromWatchlist = () => {
    dispatch(removeFromWatchlist(movie.id));
    handleClose();
  };

  const handleCardClick = () => {
    navigate(`/movie-details/${movie.id}`);
  };

  // Format release date to get just the year
  const releaseYear = new Date(movie.release_date).getFullYear();

  // Convert TMDB rating (0-10) to MUI Rating (0-5)
  const rating = movie.vote_average / 2;

  // Poster URL (TMDB format)
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

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
        <CardActionArea onClick={handleCardClick}>
          {/* Movie Poster */}
          <CardMedia
            component="img"
            height="400"
            image={posterUrl}
            alt={movie.title}
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
              onClick={(e) => {
                e.stopPropagation();
                // Add trailer playing logic here if needed
              }}
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
            label={getGenreName(movie.genre_ids[0])}
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
            <Tooltip title="Options">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(e);
                }}
                size="large"
                aria-controls={open ? 'options-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(3px)',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.7),
                  },
                }}
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
              {movie.watchlistAdded ? (
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromWatchlist();
                  }}
                >
                  <PlaylistRemove sx={{ mr: 1 }} />
                  Remove from Watch List
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToWatchlist();
                  }}
                >
                  <PlaylistAdd sx={{ mr: 1 }} />
                  Add to Watch List
                </MenuItem>
              )}
            </Menu>
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
          {movie.title}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
          <Rating value={rating} precision={0.5} size="small" readOnly />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            {movie.vote_average.toFixed(1)}
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

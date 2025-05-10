import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
  Rating,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';

const MovieBanner = ({ movie }: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Example movie data (you would replace this with your actual data)
  const featuredMovie = movie || {
    title: 'Thunderbolts*',
    overview:
      'After finding themselves ensnared in a death trap, seven disillusioned castoffs must embark on a dangerous mission that will force them to confront the darkest corners of their pasts.',
    backdrop_path: '/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg',
    vote_average: 7.5,
    release_date: '2025-04-30',
  };

  // TMDB backdrop URL (large size for banner)
  const backdropUrl = `https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`;

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        height: { xs: '450px', sm: '500px', md: '100vh' },
        width: '100%',
        borderRadius: 0,
        overflow: 'hidden',
        mb: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Backdrop Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${backdropUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: {
              xs: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.85) 100%)',
              sm: 'linear-gradient(to right, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.4) 100%)',
            },
          },
        }}
      />

      {/* Content Overlay */}
      <Container
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
          py: { xs: 2, sm: 3, md: 4 },
          maxWidth: { xs: '100%', md: '80%' },
          pl: { xs: 2, sm: 3, md: 6 },
          pr: { xs: 2, sm: 3, md: 0 },
        }}
      >
        <Box sx={{ maxWidth: { xs: '100%', sm: '70%', md: '50%' } }}>
          <Typography
            variant={isMobile ? 'h4' : 'h2'}
            component="h1"
            color="common.white"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
              lineHeight: { xs: 1.2, md: 1.3 },
            }}
          >
            {featuredMovie.title}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: { xs: 1.5, md: 2 },
            }}
          >
            <Rating
              value={featuredMovie.vote_average / 2}
              precision={0.5}
              readOnly
              size={isMobile ? 'small' : 'medium'}
              sx={{ color: 'primary.main' }}
            />
            <Typography
              variant={isMobile ? 'body2' : 'body1'}
              color="common.white"
              sx={{ ml: 1 }}
            >
              {featuredMovie.vote_average.toFixed(1)}
            </Typography>
            <Typography
              variant={isMobile ? 'body2' : 'body1'}
              color="common.white"
              sx={{ ml: 2 }}
            >
              {new Date(featuredMovie.release_date).getFullYear()}
            </Typography>
          </Box>

          <Typography
            variant={isMobile ? 'body2' : 'body1'}
            color="common.white"
            sx={{
              mb: { xs: 2.5, sm: 3, md: 4 },
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: { xs: 2, sm: 3 },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              lineHeight: { xs: 1.5, md: 1.6 },
            }}
          >
            {featuredMovie.overview}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1.5, sm: 2 },
              width: '100%',
            }}
          >
            <Button
              variant="contained"
              size={isMobile ? 'medium' : 'large'}
              startIcon={<PlayArrowIcon />}
              fullWidth={isMobile}
              sx={{
                borderRadius: 50,
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.5 },
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Watch Trailer
            </Button>
            <Button
              variant="outlined"
              size={isMobile ? 'medium' : 'large'}
              startIcon={<AddIcon />}
              fullWidth={isMobile}
              sx={{
                borderRadius: 50,
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.5 },
                borderColor: 'common.white',
                color: 'common.white',
                '&:hover': {
                  borderColor: 'common.white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Add to Watchlist
            </Button>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default MovieBanner;

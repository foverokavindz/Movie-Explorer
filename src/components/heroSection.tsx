import {
  Box,
  Typography,
  InputBase,
  Button,
  useTheme,
  useMediaQuery,
  Container,
  Paper,
  alpha,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '400px', sm: '450px', md: '500px' },
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage:
            'url("https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: {
              xs: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.85) 100%)',
              sm: 'linear-gradient(to right, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.4) 100%)',
            },
          },
        }}
      />

      {/* Content Container */}
      <Container
        maxWidth="lg"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          position: 'relative',
          zIndex: 2,
          pt: { xs: 4, md: 5 },
          pb: { xs: 6, md: 8 },
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        {/* Text Content */}
        <Box
          sx={{
            mb: { xs: 3, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h1"
            color="common.white"
            fontWeight="700"
            sx={{ mb: 1 }}
          >
            Welcome
          </Typography>

          <Typography
            variant={isMobile ? 'body1' : 'h6'}
            color="common.white"
            sx={{
              maxWidth: '800px',
              mb: { xs: 3, md: 4 },
              fontWeight: 400,
              opacity: 0.9,
            }}
          >
            Millions of movies here, let's explore now.
          </Typography>
        </Box>

        {/* Search Bar */}
        <Paper
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '900px',
            borderRadius: 50,
            px: 0.5,
            py: 0.5,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <InputBase
            sx={{
              flex: 1,
              ml: 3,
              fontSize: { xs: '1rem', md: '1.1rem' },
              py: { xs: 0.5, md: 0.75 },
            }}
            placeholder="Search for a movie......"
            inputProps={{ 'aria-label': 'search movies' }}
          />
          <Button
            variant="contained"
            disableElevation
            startIcon={!isMobile && <SearchIcon />}
            sx={{
              borderRadius: 50,
              px: { xs: 3, md: 4 },
              py: { xs: 1, md: 1.2 },
              textTransform: 'none',
              fontSize: { xs: '0.9rem', md: '1rem' },
              backgroundColor: '#01b4e4', // TMDB-like teal color
              '&:hover': {
                backgroundColor: '#0099c9',
              },
            }}
          >
            {isMobile ? <SearchIcon /> : 'Search'}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default HeroSection;

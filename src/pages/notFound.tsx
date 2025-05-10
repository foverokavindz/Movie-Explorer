import { Link } from 'react-router';
import { Box, Button, Container, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
          py: 4,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{ mb: 4 }}
        >
          The page you are looking for doesn't exist.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          size="large"
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;

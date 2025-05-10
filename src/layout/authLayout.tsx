import { Suspense } from 'react';
import { Outlet } from 'react-router';
import {
  Box,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { VideoStable as AdbIcon } from '@mui/icons-material';

const AuthLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
        px: 2,
        py: { xs: 2, sm: 4 },
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          px: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 5,
          }}
        >
          <AdbIcon sx={{ mr: 1, height: '100%', alignSelf: 'center' }} />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              lineHeight: 1,
            }}
          >
            Movie Explorer
          </Typography>
        </Box>
        <Paper
          elevation={3}
          sx={{
            mt: { xs: 2, sm: 4, md: 6 },
            p: { xs: 2, sm: 3, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: { xs: 1, sm: 2 },
          }}
        >
          <Suspense fallback={<LoadingFallback isMobile={isMobile} />}>
            <Outlet />
          </Suspense>
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;

const LoadingFallback = ({ isMobile }: { isMobile: boolean }) => (
  <Box display="flex" justifyContent="center" alignItems="center" p={2}>
    <CircularProgress size={isMobile ? 30 : 40} />
  </Box>
);

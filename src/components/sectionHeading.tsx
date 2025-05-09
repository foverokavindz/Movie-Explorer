import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

const SectionHeading = ({ title, subtitle, align = 'left' }: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: '100%',
        mb: { xs: 2, sm: 3, md: 4 },
        mt: { xs: 2, sm: 3, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
      }}
    >
      {/* Main Title */}
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        component="h2"
        fontWeight="700"
        color="text.primary"
        align={align}
        sx={{
          zIndex: 2,
          display: 'inline-block',
        }}
      >
        {title}
      </Typography>

      {/* Optional Subtitle */}
      {subtitle && (
        <Typography variant="body1" color="text.secondary" align={align}>
          {subtitle}
        </Typography>
      )}

      {/* Horizontal Line */}
      {/* <Box
        sx={{
          height: '2px',
          width: '100%',
          backgroundColor: theme.palette.divider,
        }}
      /> */}
    </Box>
  );
};

export default SectionHeading;

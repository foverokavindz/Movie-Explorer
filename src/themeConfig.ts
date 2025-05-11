// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

// Define common theme properties
const commonThemeProps = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 11,
          textTransform: 'none' as 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 11,
        },
      },
    },
  },
};

// Define light theme
export const lightTheme: ThemeOptions = {
  ...commonThemeProps,
  palette: {
    mode: 'light',
    primary: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#b71c1c',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
  },
};

// Define dark theme
export const darkTheme: ThemeOptions = {
  ...commonThemeProps,
  palette: {
    mode: 'dark',
    primary: {
      main: '#B62B2BFF',
      light: '#ff867f',
      dark: '#c50e29',
    },
    secondary: {
      main: '#ce93d8',
      light: '#f3e5f5',
      dark: '#ab47bc',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
};

// Create and export themes
export const lightModeTheme = createTheme(lightTheme);
export const darkModeTheme = createTheme(darkTheme);

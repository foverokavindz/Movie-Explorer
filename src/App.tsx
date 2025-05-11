import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router';
import { router } from './routes/routes';
import { Fab, Tooltip } from '@mui/material';
import { useThemeContext } from './context/theme';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function App() {
  const { themeMode, toggleThemeMode } = useThemeContext();
  return (
    <>
      {/* Toast notifications */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{}}
        toastOptions={{
          // Custom styling based on theme mode
          style: {
            background: themeMode === 'dark' ? '#333' : '#fff',
            color: themeMode === 'dark' ? '#fff' : '#333',
          },
          // Default toast duration
          duration: 3000,
          // Custom success/error styles
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: 'white',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          },
        }}
      />
      {/* Main application router */}
      <RouterProvider router={router} />

      {/* Theme toggle button */}
      <Tooltip
        title={
          themeMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        }
      >
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
          onClick={toggleThemeMode}
          aria-label="toggle theme"
        >
          {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </Fab>
      </Tooltip>
    </>
  );
}

export default App;

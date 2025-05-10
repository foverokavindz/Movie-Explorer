import { createBrowserRouter, Navigate } from 'react-router';
import ProtectedRoute from './protectedRoute';
import AppLayout from '../layout/appLayout';
import AuthLayout from '../layout/authLayout';
import Login from '../pages/auth/login';
import Home from '../pages/home';
import MovieDetails from '../pages/movieDetails';
import TrendingMovies from '../pages/trendingMovies';
import BrowseMovies from '../pages/browseMovies';
import Watchlists from '../pages/bookmarks';
import NotFound from '../pages/notFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/home" replace /> },
          { path: 'home', element: <Home /> },
          { path: 'trending', element: <TrendingMovies /> },
          { path: 'browse-movies', element: <BrowseMovies /> },
          { path: 'movie-details/:movieId', element: <MovieDetails /> },
          { path: 'watchlists', element: <Watchlists /> },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      { path: 'login', element: <Login /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

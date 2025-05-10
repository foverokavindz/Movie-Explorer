import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import type { RootState } from '../redux/store';

const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  //   const { isAuthenticated } = useAuth();

  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

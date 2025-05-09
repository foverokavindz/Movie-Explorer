import { Suspense } from 'react';
import { Outlet } from 'react-router';
import NavBar from '../components/navBar';

const AppLayout = () => {
  return (
    <main>
      <NavBar />
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default AppLayout;

const LoadingFallback = () => (
  <div className="flex items-center justify-center p-5">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
  </div>
);

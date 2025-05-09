import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router';
import { router } from './routes/routes';

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

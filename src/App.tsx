import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/Login';
import HeaderLayout from './pages/HeaderLayout';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useGetAuthUserQuery } from './features/api/auth';
import { useAppDispatch } from './features/hooks';
import { setUser } from './features/userSlice/userSlice';
import { Loader2 } from 'lucide-react';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HeaderLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
]);

function App() {
  const dispatch = useAppDispatch();
  const { data: authUser, isLoading } = useGetAuthUserQuery();

  useEffect(() => {
    if (authUser) {
      dispatch(setUser(authUser));
    }
  }, [authUser, dispatch]);

  if (isLoading)
    return (
      <div>
        {' '}
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        Loading...
      </div>
    );

  return (
    <>
      <RouterProvider router={router}></RouterProvider>;
      <Toaster />
    </>
  );
}

export default App;

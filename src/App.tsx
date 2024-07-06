import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/Login';
import HeaderLayout from './pages/HeaderLayout';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HeaderLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

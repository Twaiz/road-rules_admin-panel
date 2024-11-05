import { lazy } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

const AppLayout = lazy(() => import('@/Ui/AppLayout'));
const PageNotFound = lazy(() => import('@/Pages/PageNotFound'));

const Login = lazy(() => import('@/Pages/Login'));
const Menu = lazy(() => import('@/Pages/Menu'));

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Navigate replace to="menu" />,
      },
      {
        path: 'login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      //? Начало - Для примера PrivateRoute ?\\\
      {
        path: 'menu',
        element: (
          <PrivateRoute>
            <Menu />
          </PrivateRoute>
        ),
      },
      //? Конец ?\\\
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);

const Routing = () => {
  return <RouterProvider router={router} />;
};

export default Routing;

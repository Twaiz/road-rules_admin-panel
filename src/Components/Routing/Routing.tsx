import { lazily } from 'react-lazily';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

const { AppLayout } = lazily(() => import('@/Ui'));
const { PageNotFound, Login, Menu } = lazily(() => import('@/Pages'));

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

export { Routing };

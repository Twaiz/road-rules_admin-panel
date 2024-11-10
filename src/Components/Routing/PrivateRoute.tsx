import React from 'react';
import { Navigate } from 'react-router-dom';

import { generalStore } from '@/Stores';

interface IPrivateRoute {
  children: React.ReactElement;
}

const PrivateRoute = (props: IPrivateRoute) => {
  const { children } = props;

  const isAuth = generalStore.isAuth;

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

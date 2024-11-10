import React from 'react';
import { Navigate } from 'react-router-dom';

import { generalStore } from '@/Stores';

interface IPublicRoute {
  children: React.ReactElement;
}

const PublicRoute = (props: IPublicRoute) => {
  const { children } = props;

  const isAuth = generalStore.isAuth;

  return !isAuth ? children : <Navigate to="menu" replace />;
};

export default PublicRoute;

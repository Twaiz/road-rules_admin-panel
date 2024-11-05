import React from 'react';
import { Navigate } from 'react-router-dom';

interface IPublicRoute {
  children: React.ReactElement;
}

const PublicRoute = (props: IPublicRoute) => {
  const { children } = props;

  const isAuth = false; //? Позже состояние будет динамическое ?\\

  return !isAuth ? children : <Navigate to="menu" replace />;
};

export default PublicRoute;

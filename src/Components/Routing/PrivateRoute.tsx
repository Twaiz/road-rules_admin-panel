import React from 'react';
import { Navigate } from 'react-router-dom';

interface IPrivateRoute {
  children: React.ReactElement;
}

const PrivateRoute = (props: IPrivateRoute) => {
  const { children } = props;

  const isAuth = true; //? Позже состояние будет динамическое ?\\

  return isAuth ? children : <Navigate to="login" replace />;
};

export default PrivateRoute;

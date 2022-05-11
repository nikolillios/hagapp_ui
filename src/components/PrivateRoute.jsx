import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

import AuthService from 'services/auth.service';

export const PrivateRoute = ({ component: Component, ...rest }) => {

  const navigate = useNavigate();
  return (<Route {...rest} render={props => {
    const currentUser = AuthService.currentUser();
    if (!currentUser.token) {
      // not logged in so redirect to login page with the return url
      navigate("/login");
      return <div />
    }

    // authorised so return component
    return <Component {...props} />
  }} />);
}
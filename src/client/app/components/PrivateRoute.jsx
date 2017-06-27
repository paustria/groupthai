import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { auth } from 'utils/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = auth.getAuth();

  return (
    <Route
      {...rest}
      render={props => (
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
};

export default PrivateRoute;

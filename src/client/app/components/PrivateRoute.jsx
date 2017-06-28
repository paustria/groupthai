import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, user, ...rest }) =>
  (
    <Route
      {...rest}
      render={props => (
        user ? (
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

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.app.user,
});

export default connect(mapStateToProps)(PrivateRoute);

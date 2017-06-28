import 'muicss/dist/css/mui.min.css';
import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
import { connect } from 'react-redux';
import Jobs from 'app/jobs/components/Jobs';
import app from 'app';
import Home from './Home';
import Nav from './Nav';
import Login from './Login';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';

injectTapEventPlugin();

const App = ({ user, fetchUser }) => {
  if (!user) {
    fetchUser();
  }

  return (
    <MuiThemeProvider>
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Login} />
            <Route exact path="/jobs" component={Jobs} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

App.propTypes = {
  fetchUser: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.app.user,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(app.actions.fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

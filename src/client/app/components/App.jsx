import 'muicss/dist/css/mui.min.css';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Redirect,
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
import { connect } from 'react-redux';
import Jobs from 'app/jobs/components/Jobs';
import Home from './Home';
import Nav from './Nav';
import Login from './Login';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';

injectTapEventPlugin();

const App = () => (
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


const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(App);

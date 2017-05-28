import React from 'react';
import {
  Redirect,
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
import { connect } from 'react-redux';
injectTapEventPlugin();

import 'muicss/dist/css/mui.min.css';

import Home from './Home';
import Nav from './Nav';
import Login from './Login';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import Jobs from 'app/jobs/components/Jobs';
import {auth} from 'utils/auth';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = auth.getAuth();

  return (
    <Route {...rest} render={props => (
      isLoggedIn ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}/>
  );
};

const App = () => (
  <MuiThemeProvider>
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Login}/>
          <Route exact path="/jobs" component={Jobs} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    </BrowserRouter>
  </MuiThemeProvider>
);


const mapStateToProps = state => ({
  state: state
});

export default connect(mapStateToProps)(App);

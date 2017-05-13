import React from 'react';
import {
    Redirect,
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';

import Home from './Home';
import Nav from './Nav';
import Login from './Login';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import auth from 'utils/auth';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = auth.loggedIn();

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
    <BrowserRouter>
        <div>
            <Nav />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login}/>
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <Route component={NotFound}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default App;

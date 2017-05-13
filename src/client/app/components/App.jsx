import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import Home from './Home';
import Nav from './Nav';
import Login from './Login';
import Dashboard from './Dashboard';
import NotFound from './NotFound';

const App = () => (
    <BrowserRouter>
        <div>
            <Nav />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default App;

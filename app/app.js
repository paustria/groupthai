import React from 'react';
import ReactDom from 'react-dom';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {browserHistory, IndexRedirect, Route, Router} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import App from 'components/App';
import Home from 'components/pages/Home';
import Login from 'components/pages/Login';
import NotFound from 'components/pages/NotFound';
import Dashboard from 'components/pages/Dashboard';
import { homeReducer } from 'reducers/reducers';

import './stylesheets/core.scss';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(homeReducer);

// store.subscribe(() => {
//     console.log('state', store.getState());
// });

function checkAuth(nextState, replace) {
    let { loggedIn } = store.getState();
    // check if the path isn't dashboard
    // that way we can apply specific logic
    // to display/render the path we want to
    if (nextState.location.pathname !== '/dashboard') {
        if (loggedIn) {
            if (nextState.location.state && nextState.location.pathname) {
                replace(nextState.location.pathname);
            } else {
                replace('/');
            }
        }
    } else {
        // If the user is already logged in, forward them to the homepage
        if (!loggedIn) {
            if (nextState.location.state && nextState.location.pathname) {
                replace(nextState.location.pathname);
            } else {
                replace('/');
            }
        }
    }
}

ReactDom.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/" component={Home} />
                <Route onEnter={checkAuth}>
                    <Route path="/login" component={Login} />
                    <Route path="/dashboard" component={Dashboard} />
                </Route>
            </Route>
            <Route path="*" component={NotFound}/>
        </Router>
    </Provider>,
    document.getElementById('app')
);

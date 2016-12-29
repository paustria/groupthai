import React from 'react';
import ReactDom from 'react-dom';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {browserHistory, IndexRedirect, Route, Router} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import App from './components/App';

require('./stylesheets/core.scss');

ReactDom.render(
        <Router>
            <Route path='/' component={App}>
            </Route>
            <Route path="*" component={App}/>
        </Router>,
    document.getElementById('app')
);

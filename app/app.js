import React from 'react';
import ReactDom from 'react-dom';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {browserHistory, IndexRedirect, Route, Router} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import Home from './components/Home';

ReactDom.render(
        <Router>
            <Route path='/' component={Home}>
            </Route>
            <Route path="*" component={Home}/>
        </Router>,
    document.getElementById('app'));

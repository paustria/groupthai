import React from 'react';
import ReactDom from 'react-dom';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import App from 'app/components/App';
import reducer from 'app/reducers';

import './stylesheets/core.scss';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

store.subscribe(() => {
    console.log('state', store.getState());
});

ReactDom.render(
    <Provider store={store}>
        <App></App>
    </Provider>,
    document.getElementById('app')
);

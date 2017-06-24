import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import App from 'app/components/App';
import reducer from 'app/reducers';

import './stylesheets/core.scss';

require('font-awesome-webpack');

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [
  thunkMiddleware,
];
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(...middleware),
));

store.subscribe(() => {
  console.log('state', store.getState());
});

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AppRouter from './routes/app_routes';
import reducers from './reducers';

import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <AppRouter />
  </Provider>
  , document.getElementById("root"));

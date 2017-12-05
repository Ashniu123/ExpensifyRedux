import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppRouter from './routes/app_routes';
import reducers from './reducers';

import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
  , document.getElementById("root"));

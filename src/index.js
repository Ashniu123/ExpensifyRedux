import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AppRouter from './routes/app_routes';
import reducers from './reducers';

import { startSetExpenses } from './actions/expenses';
import { setTextFilter } from './actions/filters';

const store = applyMiddleware(thunk)(createStore)(reducers); // create store with middleware

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <AppRouter />
    </Provider>
    , document.getElementById("root"));  
});
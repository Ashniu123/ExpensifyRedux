import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AppRouter, { history } from './routes/app_routes';
import LoadingPage from './components/loading_page';
import reducers from './reducers';

import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';

import { firebase } from './firebase/firebase';
import registerServiceWorker from './registerServiceWorker';

import '../style/styles.scss';

const store = createStore(reducers, applyMiddleware(thunk)); // create store with middleware

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(
      <Provider store={store}>
        <AppRouter />
      </Provider>
      , document.getElementById("root"));
    hasRendered = true;
  }
};

registerServiceWorker();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
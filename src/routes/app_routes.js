import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import LoginPage from '../containers/login-page';
import ExpenseDashboardPage from '../components/expense_dashboard_page';
import AddExpensePage from '../containers/add_expense_page';
import EditExpensePage from '../containers/edit_expense_page';
import HelpPage from '../components/help_page';
import NotFoundPage from '../components/page_not_found';
import Header from '../containers/header';
import PrivateRoute from './private-route';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={LoginPage} exact={true}/>
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

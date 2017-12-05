import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

import ExpenseDashboardPage from '../components/expense_dashboard_page';
import AddExpensePage from '../containers/add_expense_page';
import EditExpensePage from '../containers/edit_expense_page';
import HelpPage from '../components/help_page';
import NotFoundPage from '../components/page_not_found';
import Header from '../components/header';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={ExpenseDashboardPage} exact={true} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;

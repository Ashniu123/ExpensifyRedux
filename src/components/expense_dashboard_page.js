import React from 'react';

import ExpenseList from '../containers/expense_list';
import ExpenseListFilters from '../containers/expense_list_filters';
import ExpenseSummary from '../containers/expense-summary';

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseSummary />
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;

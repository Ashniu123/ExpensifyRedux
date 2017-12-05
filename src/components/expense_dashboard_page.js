import React from 'react';

import ExpenseList from '../containers/expense_list';
import ExpenseListFilters from '../containers/expense_list_filters';

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;

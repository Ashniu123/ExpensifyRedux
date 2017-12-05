import { combineReducers } from 'redux';

import ExpensesReducer from './r_expenses';
import FilterReducer from './r_filters';

const rootReducer = combineReducers({
  expenses: ExpensesReducer,
  filter: FilterReducer
});

export default rootReducer;

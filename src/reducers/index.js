import { combineReducers } from 'redux';

import ExpensesReducer from './r_expenses';
import FilterReducer from './r_filters';
import AuthReducer from './r_auth';

const rootReducer = combineReducers({
  expenses: ExpensesReducer,
  filter: FilterReducer,
  auth: AuthReducer
});

export default rootReducer;

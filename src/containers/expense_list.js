import React from 'react';
import { connect } from 'react-redux';

import ExpenseListItem from './expense_list_item';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No Expenses</p>
            ) : (
                props.expenses.map((expense) => {
                    return <ExpenseListItem key={expense.id} {...expense} />
                })
            )
        }
    </div>
);

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        expenses: selectExpenses(state.expenses, state.filter)
    };
}

export default connect(mapStateToProps)(ExpenseList);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import selectExpensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';

export class ExpenseSummary extends Component {
    render() {
        const expensesWord = this.props.expenseCount === 1 ? 'expense' : 'expenses';
        const formattedTotalExpense = numeral(this.props.expenseTotal/100).format('$0,0.00');

        return (
            <div>
                <h3>Viewing {this.props.expenseCount} {expensesWord} totalling {formattedTotalExpense}</h3>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filter);
    return {
        expenseCount: visibleExpenses.length,
        expenseTotal: selectExpensesTotal(visibleExpenses)
    }
};

export default connect(mapStateToProps)(ExpenseSummary);
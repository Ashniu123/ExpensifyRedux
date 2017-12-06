import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

import selectExpensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';

export class ExpenseSummary extends Component {
    render() {
        const expensesWord = this.props.expenseCount === 1 ? 'expense' : 'expenses';
        const formattedTotalExpense = numeral(this.props.expenseTotal/100).format('$0,0.00');

        return (
            <div className="page-header">
                <div className="content-container">
                    <h3 className="page-header__title">
                        Viewing <strong>{this.props.expenseCount}</strong> {expensesWord} totalling <strong>{formattedTotalExpense}</strong>
                    </h3>
                    <div className="page-header__actions">
                        <Link className="button" to="/create">Add Expense</Link>
                    </div>
                </div>
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
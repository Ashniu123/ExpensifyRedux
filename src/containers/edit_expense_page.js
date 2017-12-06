import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExpenseForm from '../components/expense_form';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(expense) {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  }

  handleClick(e) {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
              <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm expense={this.props.expense} onSubmit={this.handleSubmit} />
          <button className="button button__secondary" onClick={this.handleClick}>Remove Expense</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
  startEditExpense: (id, updates) => dispatch(startEditExpense(id, updates)),
  startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

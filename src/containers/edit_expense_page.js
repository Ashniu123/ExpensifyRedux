import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExpenseForm from '../components/expense_form';
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpensePage extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(expense) {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  }

  handleClick(e) {
    this.props.removeExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <ExpenseForm expense={this.props.expense} onSubmit={this.handleSubmit} />
        <button onClick={this.handleClick}>Remove</button>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
  editExpense: (id, updates) => dispatch(editExpense(id, updates)),
  removeExpense: (id) => dispatch(removeExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

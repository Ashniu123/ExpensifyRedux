import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { removeExpense } from '../actions/expenses';

export const ExpenseListItem = ({id, description, amount, createdAt}) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h4>{description}</h4>
        </Link>
        <p>{amount} - {createdAt}</p>
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: state.expenses
    };
};

export default connect(mapStateToProps)(ExpenseListItem);
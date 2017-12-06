import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

export const ExpenseListItem = ({id, description, amount, createdAt}) => (
    <Link className="list-item" to={`/edit/${id}`}>
        <div >
            <h4 className="list-item__title">{description}</h4>
            <span className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>
        </div>
        <h4 className="list-item__data">{numeral(amount / 100).format('$0,0.00')}</h4>
    </Link>
);

const mapStateToProps = (state) => {
    return {
        expenses: state.expenses
    };
};

export default connect(mapStateToProps)(ExpenseListItem);
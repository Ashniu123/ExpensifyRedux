import React, { Component } from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class ExpenseForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            note: props.expense ? props.expense.note : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleFocusChange = this.handleFocusChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleAmountChange(e) {
        if (!e.target.value || /^\d{1,}(\.\d{0,2})?$/.test(e.target.value)) {
            this.setState({
                amount: e.target.value
            });
        }
    }

    handleNoteChange(e) {
        this.setState({
            note: e.target.value
        });
    }

    handleDateChange(createdAt) {
        if (createdAt) {
            this.setState({ createdAt });
        }
    }

    handleFocusChange({ focused }) {
        this.setState({ calendarFocused: focused });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        if (this.state.description && this.state.amount) {
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount) * 100,
                note: this.state.note,
                createdAt: this.state.createdAt.valueOf()
            });
            this.setState({ error: '' });
        } else {
            this.setState({ error: 'Please provide description and amount!' });
        }
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleFormSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input className="text-input" type="text" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange} autoFocus />
                <input className="text-input" type="text" placeholder="Amount" value={this.state.amount} onChange={this.handleAmountChange} />
                <SingleDatePicker date={this.state.createdAt} onDateChange={this.handleDateChange}
                    focused={this.state.calendarFocused} onFocusChange={this.handleFocusChange}
                    numberOfMonths={1} isOutsideRange={(day) => false}
                />
                <textarea className="textarea" placeholder="Add a note for your expense...(optional)" value={this.state.note} onChange={this.handleNoteChange}></textarea>
                <input className="button" type="submit" value="Save Expense" />
            </form>
        );
    }
}

export default ExpenseForm;
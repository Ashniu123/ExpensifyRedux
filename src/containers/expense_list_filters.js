import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            calendarFocused: null
        };

        this.handleSortByChange = this.handleSortByChange.bind(this);
        this.handleFocusChange = this.handleFocusChange.bind(this);
        this.handleDatesChange = this.handleDatesChange.bind(this);
        this.handleTextFilterChange = this.handleTextFilterChange.bind(this);
    }

    handleSortByChange(e) {
        switch (e.target.value) {
            case "date": this.props.sortByDate();
                break;
            case "amount": this.props.sortByAmount();
                break;
            default: break;
        }
    }

    handleDatesChange({ startDate, endDate }) {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }

    handleFocusChange(focused) {
        this.setState({ calendarFocused: focused });
    }

    handleTextFilterChange(event) {
        this.props.setTextFilter(event.target.value);
    }

    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input className="text-input" type="text" placeholder="Search Expenses..." value={this.props.filter.text} onChange={this.handleTextFilterChange} />
                    </div>
                    <div className="input-group__item">
                        <select className="select" value={this.props.filter.sortBy} onChange={this.handleSortByChange}>
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.filter.startDate}
                            endDate={this.props.filter.endDate}
                            onDatesChange={this.handleDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.handleFocusChange}
                            numberOfMonths={1} isOutsideRange={(day) => false}
                            showClearDates={true}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        filter: state.filter
    };
};

const mapDispatchToProps = (dispatch) => ({
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setTextFilter: (text) => dispatch(setTextFilter(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)


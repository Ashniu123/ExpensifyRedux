import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import { ExpenseListFilters } from '../../src/containers/expense_list_filters';
import { filter, altFilter } from '../fixtures/filters';

let wrapper, setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(<ExpenseListFilters
        filter={filter}
        setTextFilter={setTextFilter}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        sortByAmount={sortByAmount}
        sortByDate={sortByDate}
    />);
});

test('should render ExpenseListFilters component correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters component with alt data correctly', () => {
    wrapper.setProps({
        filter: altFilter
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change correctly', () => {
    wrapper.find('input').simulate('change', {
        target: { value: 'blah' }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith('blah');
});

test('should sortByDate correctly', () => {
    wrapper.setProps({
        filter: altFilter
    });
    wrapper.find('select').simulate('change', {
        target: { value: 'date' }
    });
    expect(sortByDate).toHaveBeenLastCalledWith();
});

test('should sortByAmount correctly', () => {
    wrapper.find('select').simulate('change', {
        target: { value: 'amount' }
    });
    expect(sortByAmount).toHaveBeenLastCalledWith();
});

test('should handle date changes', () => {
    const startDate = moment(0).add(2, 'years');
    const endDate = moment(0).add(6, 'years');

    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate });
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes', () => {
    const calendarFocused = 'endDate';
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
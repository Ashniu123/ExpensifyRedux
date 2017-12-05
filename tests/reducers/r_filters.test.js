import moment from 'moment';

import filtersReducer from '../../src/reducers/r_filters';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, {
        type: '@@INIT'
    });

    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {
        type: 'SORT_BY_AMOUNT'
    });

    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = { type: 'SORT_BY_DATE' };
    const state = filtersReducer(currentState, action)
    expect(state.sortBy).toBe('date');
});

test('should setText filter', () => {
    const state = filtersReducer(undefined, {
        type: 'SET_TEXT_FILTER',
        text: 'blah blah'
    });

    expect(state.text).toBe('blah blah');
});

test('should setStartDate filter', () => {
    const state = filtersReducer(undefined, {
        type: 'SET_START_DATE',
        startDate: 0
    });

    expect(state.startDate).toBe(0);
});

test('should setEndDate filter', () => {
    const state = filtersReducer(undefined, {
        type: 'SET_END_DATE',
        endDate: 0
    });

    expect(state.endDate).toBe(0);
});
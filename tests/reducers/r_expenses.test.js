import expensesReducer from '../../src/reducers/r_expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by ID', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([
        expenses[0],
        expenses[2]
    ]);
});

test('should not remove expense if ID not found ', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});

test('should add expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            id: '4',
            description: 'Water Bill',
            note: '',
            amount: 19900,
            createdAt: 1000
        }
    }
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([
        ...expenses,
        action.expense
    ]);
});

test('should edit an expense if ID found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            note: 'blah'
        }
    }
    const state = expensesReducer(expenses, action);

    expect(state[1].note).toBe('blah');
});

test('should not edit an expense if ID not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            note: 'blah'
        }
    }
    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import database from '../../src/firebase/firebase';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../src/actions/expenses';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

test('should setup removeExpense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should setup editExpense action object', () => {
    const action = editExpense('123abc', { note: 'New note value' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    });
});

test('should setup addExpense action object with provided values', () => {
    const action = addExpense(expenses[1]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[1]
    });
});

test('should add expense to the database and store', (done) => { // done added since test is async
    const store = createMockStore({});
    const { description, amount, note, createdAt } = expenses[1];
    const expenseData = { description, amount, note, createdAt };

    // Async operation
    store.dispatch(startAddExpense(expenseData)).then(() => { //Promise chaining
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        //To prevent callback hell
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to the database and store', () => {
    const store = createMockStore({});
    const expenseData = { description: '', amount: 0, note: '', createdAt: 0 }; // Defaults

    // Async operation
    store.dispatch(startAddExpense({})).then(() => { //Promise chaining
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        //To prevent callback hell
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

// test('should setup addExpense action object with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense:  {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     });
// });
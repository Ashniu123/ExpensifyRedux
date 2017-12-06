import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import database from '../../src/firebase/firebase';
import { startAddExpense, addExpense, editExpense, removeExpense, startRemoveExpense, setExpenses, startSetExpenses, startEditExpense } from '../../src/actions/expenses';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);
const uid = 'sometestuid';
const defaultAuthState = { auth: { uid } };

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup removeExpense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should remove expense from firebase and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[1].id;

    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });

        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
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

test('should update expense in firebase and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const { id } = expenses[1];
    const updates = { note: 'New note value' };

    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });

        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().note).toBe(updates.note);
        done();
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
    const store = createMockStore(defaultAuthState);
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
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to the database and store', (done) => {
    const store = createMockStore(defaultAuthState);
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
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should setup setExpense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});
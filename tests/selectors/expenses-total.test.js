import { shallow } from 'enzyme';

import selectExpensesTotal from '../../src/selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
    const total = selectExpensesTotal([]);
    expect(total).toBe(0);
});

test('should correctly add up a single expense', () => {
    const total = selectExpensesTotal([expenses[1]]);
    expect(total).toBe(expenses[1].amount);
});

test('should correctly add up multiple expense', () => {
    const total = selectExpensesTotal(expenses);
    expect(total).toBe(105419);
});
import React from 'react';
import { shallow } from 'enzyme';

import { ExpenseList } from '../../src/containers/expense_list';
import expenses from '../fixtures/expenses';

test('should render ExpenseList with expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={expenses}/>);
    
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseList with no expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={[]}/>);

    expect(wrapper).toMatchSnapshot();
});
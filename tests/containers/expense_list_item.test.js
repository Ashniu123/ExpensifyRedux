import React from 'react';
import { shallow } from 'enzyme';

import { ExpenseListItem } from '../../src/containers/expense_list_item';
import expenses from '../fixtures/expenses';

test('should render ExpenseListItem with an expense', () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>);

    expect(wrapper).toMatchSnapshot();
});
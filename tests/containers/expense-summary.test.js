import React from 'react';
import { shallow } from 'enzyme';

import { ExpenseSummary } from '../../src/containers/expense-summary';

test('should render ExpenseSummary with single expense', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={1} expenseTotal={100} />)
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary with multiple expenses', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={10} expenseTotal={2022230} />)
    expect(wrapper).toMatchSnapshot();
});
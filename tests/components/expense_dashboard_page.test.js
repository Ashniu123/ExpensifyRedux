import React from 'react';
import { shallow } from 'enzyme';

import ExpenseDashboardPage from '../../src/components/expense_dashboard_page';

test('should render ExpenseDashboardPage component correctly', () => {
    const wrapper = shallow(<ExpenseDashboardPage />);

    expect(wrapper).toMatchSnapshot();
});
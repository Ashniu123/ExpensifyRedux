import React from 'react';
import { shallow } from 'enzyme';

import PageNotFound from '../../src/components/page_not_found';

test('should render PageNotFound component correctly', () => {
    const wrapper = shallow(<PageNotFound />);

    expect(wrapper).toMatchSnapshot();
});
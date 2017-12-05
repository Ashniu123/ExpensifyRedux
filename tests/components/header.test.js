// import ReactShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import { shallow } from 'enzyme';

import Header from '../../src/components/header';

test('should render header correctly', () => {
    // old way of ..  react-test-renderer/shallow  
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();

    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();

});

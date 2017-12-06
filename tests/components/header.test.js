// import ReactShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import { shallow } from 'enzyme';

import { Header } from '../../src/containers/header';

let startLogout, wrapper;

beforeEach(() => {
    startLogout = jest.fn();
    wrapper = shallow(<Header startLogout={startLogout}/>);    
});

test('should render header correctly', () => {
    // old way of ..  react-test-renderer/shallow  
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled(); 
});

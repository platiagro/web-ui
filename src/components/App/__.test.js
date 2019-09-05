import React from 'react';

import { shallow } from 'enzyme';

import App from '.';

describe('App component', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('toggle side menu without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().sideMenuCollapsed).toEqual(false);
    wrapper.instance().toggleSideMenu();
    expect(wrapper.state().sideMenuCollapsed).toEqual(true);
  });
});

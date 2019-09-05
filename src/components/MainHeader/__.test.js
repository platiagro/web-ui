import React from 'react';

import { shallow } from 'enzyme';

import MainHeader from '.';

describe('MainHeader component', () => {
  it('renders without crashing', () => {
    shallow(<MainHeader />);
  });

  it('renders without crashing with menu icon unfold', () => {
    shallow(<MainHeader sideMenuCollapsed />);
  });

  it('default sideMenuTriggerFunction prop', () => {
    const defaultValue = MainHeader.defaultProps.sideMenuTriggerFunction();
    expect(defaultValue).toBe('No function in sideMenuTriggerFunction');
  });
});

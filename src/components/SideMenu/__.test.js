import React from 'react';

import { shallow } from 'enzyme';

import SideMenu from '.';

describe('SideMenu component', () => {
  it('renders without crashing', () => {
    shallow(<SideMenu />);
  });
});

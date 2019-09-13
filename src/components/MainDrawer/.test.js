import React from 'react';

import { shallow } from 'enzyme';

import MainDrawer from '.';

describe('MainDrawer component', () => {
  it('renders without crashing', () => {
    shallow(<MainDrawer />);
  });

  it('renders html correctly', () => {
    const mainDrawerShalowed = shallow(<MainDrawer />);

    expect(mainDrawerShalowed).toMatchSnapshot();
  });
});

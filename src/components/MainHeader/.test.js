import React from 'react';

import { shallow } from 'enzyme';

import MainHeader from '.';

describe('MainHeader component', () => {
  it('renders without crashing', () => {
    shallow(<MainHeader />);
  });

  it('renders html correctly', () => {
    const mainHeaderShalowed = shallow(<MainHeader />);

    expect(mainHeaderShalowed).toMatchSnapshot();
  });
});

import React from 'react';

import { shallow } from 'enzyme';

import MainFooter from '.';

describe('MainFooter component', () => {
  it('renders without crashing', () => {
    shallow(<MainFooter />);
  });

  it('renders html correctly', () => {
    const mainFooterShalowed = shallow(<MainFooter />);

    expect(mainFooterShalowed).toMatchSnapshot();
  });
});

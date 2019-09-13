import React from 'react';

import { shallow } from 'enzyme';

import MainContent from '.';

describe('MainContent component', () => {
  it('renders without crashing', () => {
    shallow(<MainContent />);
  });

  it('renders html correctly', () => {
    const mainContentShalowed = shallow(<MainContent />);

    expect(mainContentShalowed).toMatchSnapshot();
  });
});

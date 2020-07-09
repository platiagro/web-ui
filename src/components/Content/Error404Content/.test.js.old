import React from 'react';

import { shallow } from 'enzyme';

import E404 from '.';

describe('Page E404 should', () => {
  it('renders without crashing', () => {
    shallow(<E404 />);
  });

  it('renders html correctly', () => {
    const e404Shallowed = shallow(<E404 />);

    expect(e404Shallowed).toMatchSnapshot();
  });
});

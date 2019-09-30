import React from 'react';

import { shallow } from 'enzyme';

import Projects from '.';

describe('Page Projects should', () => {
  it('renders without crashing', () => {
    shallow(<Projects />);
  });

  it('renders html correctly', () => {
    const projectsShallowed = shallow(<Projects />);

    expect(projectsShallowed).toMatchSnapshot();
  });
});

import React from 'react';

import { shallow } from 'enzyme';

import ExperimentsTabs from '.';

describe('ExperimentsTabs component should', () => {
  it('renders without crashing', () => {
    shallow(
      <ExperimentsTabs />
    );
  });

  it('renders html correctly', () => {
    const experimentsTabsShallowed = shallow(
      <ExperimentsTabs />
    );

    expect(experimentsTabsShallowed).toMatchSnapshot();
  });
});

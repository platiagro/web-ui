import React from 'react';

import { shallow } from 'enzyme';

import App from '.';

describe('App component', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders html correctly', () => {
    const appShalowed = shallow(<App />);

    expect(appShalowed).toMatchSnapshot();
  });
});

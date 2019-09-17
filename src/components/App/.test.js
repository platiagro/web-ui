import React from 'react';

import { shallow } from 'enzyme';

import App from '.';

describe('App component should', () => {
  it('renders without crashing', () => {
    const location = {
      pathname: '/',
    };

    shallow(<App location={location} />);
  });

  it('renders html correctly with valid route', () => {
    const location = {
      pathname: '/',
    };

    const appShalowed = shallow(<App location={location} />);

    expect(appShalowed).toMatchSnapshot();
  });

  it('renders html correctly with invalid route', () => {
    const location = {
      pathname: '/xyz-invalid-url-path',
    };

    const appShalowed = shallow(<App location={location} />);

    expect(appShalowed).toMatchSnapshot();
  });
});

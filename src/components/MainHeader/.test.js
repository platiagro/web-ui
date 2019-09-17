import React from 'react';

import { shallow } from 'enzyme';

import MainHeader from '.';

import mainRoutes from '../../routes/main';

describe('MainHeader component should', () => {
  it('renders without crashing', () => {
    shallow(<MainHeader selectedKeys={['/']} mainRoutes={mainRoutes} />);
  });

  it('renders html correctly', () => {
    const mainHeaderShalowed = shallow(
      <MainHeader selectedKeys={['/']} mainRoutes={mainRoutes} />
    );

    expect(mainHeaderShalowed).toMatchSnapshot();
  });
});

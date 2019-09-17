import React from 'react';

import { shallow } from 'enzyme';

import MainContent from '.';

import mainRoutes from '../../routes/main';

describe('MainContent component', () => {
  it('renders without crashing', () => {
    const title = mainRoutes[0].title;
    const subTitle = mainRoutes[0].subTitle;

    shallow(
      <MainContent title={title} subTitle={subTitle} mainRoutes={mainRoutes} />
    );
  });

  it('renders html correctly', () => {
    const title = mainRoutes[0].title;
    const subTitle = mainRoutes[0].subTitle;

    const mainContentShalowed = shallow(
      <MainContent title={title} subTitle={subTitle} mainRoutes={mainRoutes} />
    );

    expect(mainContentShalowed).toMatchSnapshot();
  });
});

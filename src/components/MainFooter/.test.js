import React from 'react';

import { shallow } from 'enzyme';

import MainFooter from '.';

describe('MainFooter component', () => {
  it('is expected render without crashing', () => {
    shallow(<MainFooter />);
  });

  it('is expected to render a copyright message with the current year.', () => {
    const wrapper = shallow(<MainFooter />);
    const year = new Date().getFullYear();

    expect(wrapper.text()).toContain(year);
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(<MainFooter />);

    expect(wrapper).toMatchSnapshot();
  });
});

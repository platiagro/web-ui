import React from 'react';
import { shallow } from 'enzyme';
import InfoHelper from '..';

describe('InfoHelper component', () => {
  it('is expected render without crashing', () => {
    shallow(<InfoHelper />);
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(<InfoHelper />);
    expect(wrapper).toMatchSnapshot();
  });
});

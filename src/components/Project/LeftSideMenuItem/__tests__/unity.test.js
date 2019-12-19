import React from 'react';
import { shallow } from 'enzyme';
import LeftSideMenuItem from '..';

describe('LeftSideMenuItem component', () => {
  it('is expected render without crashing', () => {
    shallow(<LeftSideMenuItem title='title' disabled />);
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(
      <LeftSideMenuItem title='title' disabled={false} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const wrapper = shallow(
      <LeftSideMenuItem title='title' disabled={false} />
    );
    const div = wrapper.find('div');
    div.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});

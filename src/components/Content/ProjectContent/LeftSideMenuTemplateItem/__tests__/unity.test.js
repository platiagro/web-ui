import React from 'react';
import { shallow } from 'enzyme';
import LeftSideMenuTemplateItem from '..';

const handleClick = jest.fn();

describe('LeftSideMenuTemplateItem component', () => {
  it('is expected render without crashing', () => {
    shallow(
      <LeftSideMenuTemplateItem
        handleClick={handleClick}
        template={{ disabled: false }}
        disabled={false}
      />
    );
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(
      <LeftSideMenuTemplateItem
        handleClick={handleClick}
        template={{ disabled: true }}
        disabled
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick', () => {
    const wrapper = shallow(
      <LeftSideMenuTemplateItem
        handleClick={handleClick}
        template={{ disabled: false }}
      />
    );
    const div = wrapper.find('div');
    div.simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });
});

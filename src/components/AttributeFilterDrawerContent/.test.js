import React from 'react'

import { shallow, mount } from 'enzyme'

import { Select } from 'antd';
import _ from 'lodash';

import AttributeFilterDrawerContent from '.';
import ResultsDrawer from '../ResultsDrawer';
import ResultsButtonBar from '../ResultsButtonBar';

const { Option } = Select;

const setFilterFunc = (e) => {
};

describe('AttributeFilterDrawerContent component', () => {

  it('is expected render without crashing', () => {
    shallow(<AttributeFilterDrawerContent
      parameter={['{"uuid":"uuid", "name":"name"}']}
      dataSets={['']}
      setFilter={setFilterFunc}
    />);
  });

  it('is expected to be of type Div', () => {
    const wrapper = shallow(<AttributeFilterDrawerContent
      parameter={['']}
      dataSets={['']}
      setFilter={setFilterFunc}
    />);

    expect(wrapper.is('div')).toBeTruthy();
  });

  it('Div child is expected to have a Select child', () => {
    const wrapper = shallow(<AttributeFilterDrawerContent
      parameter={['']}
      dataSets={['']}
      setFilter={setFilterFunc}
    />);

    expect(
      wrapper
        .children('div')
        .children(Select)
        .exists()
    ).toBeTruthy();
  });

  it('Select child is expected to have a Option child', () => {
    const wrapper = shallow(<AttributeFilterDrawerContent
      parameter={['']}
      dataSets={[{ "uuid": "uuid", "name": "name" }]}
      setFilter={setFilterFunc}
    />);

    expect(
      wrapper
        .children('div')
        .children(Select)
        .children(Option)
        .exists()
    ).toBeTruthy();
  });

  it('Div child is expected to have a ResultsDrawer child and ResultsButtonBar button', () => {
    const wrapper = mount(<AttributeFilterDrawerContent
      parameter={['']}
      dataSets={['']}
      setFilter={setFilterFunc}
      runStatus={'Failed'}
      taskStatus={'Succeeded'}
    />);

    expect(
      wrapper
        .children('div')
        .children(ResultsDrawer)
        .exists()
    ).toBeTruthy();

    expect(
      wrapper
        .children('div')
        .children(ResultsButtonBar)
        .exists()
    ).toBeTruthy();
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(<AttributeFilterDrawerContent
      parameter={['']}
      dataSets={['']}
      setFilter={setFilterFunc}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});

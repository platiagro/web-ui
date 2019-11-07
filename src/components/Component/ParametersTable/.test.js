import React from 'react';

import { shallow, mount } from 'enzyme'

import { act } from 'react-dom/test-utils';

import { Popconfirm, Table, Tag } from 'antd';

import ParametersTable from '.';

const parameters = [
  {
      name: "param1",
      type: "int",
      required: true,
      default: "1",
      details: "detalhes"
  },
  {
      name: "param2",
      type: "string",
      required: false,
      default: "string",
      details: "detalhes"
  }
];

const onDelete = () => {}

describe('ParametersTable component', () => {

  it('is expected render without crashing', () => {
    shallow(<ParametersTable 
      parameterList={[]}
      onDelete = {onDelete} />);
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(
    <ParametersTable 
      parameterList={[]}
      onDelete = {onDelete} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('is expected to exist Table', () => {
    const wrapper = mount(
      <ParametersTable 
        parameterList={parameters}
        onDelete = {onDelete} />
    );

    expect(
      wrapper
        .find(Table)
        .exists()
    ).toBeTruthy();
  });
});

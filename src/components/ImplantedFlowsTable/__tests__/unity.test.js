import React from 'react';
import { Table } from 'antd';
import { shallow, mount } from 'enzyme';
import ImplantedFlowsTable from '..';

const implatedFlows = [
  {
    key: 'key',
    flowName: 'flowName',
    url: 'url',
    created: 'created',
    action: 'action',
  },
];

describe('ImplantedFlowsTable component', () => {
  it('is expected render without crashing', () => {
    shallow(<ImplantedFlowsTable flowList={implatedFlows} />);
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(<ImplantedFlowsTable flowList={implatedFlows} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('is expected to exist Table', () => {
    const wrapper = mount(<ImplantedFlowsTable flowList={implatedFlows} />);
    expect(wrapper.find(Table).exists()).toBeTruthy();
  });
});

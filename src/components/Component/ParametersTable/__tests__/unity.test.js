import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Popconfirm, Table } from 'antd';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ParametersTable from '..';

const component = {
  uuid: '1',
  createdAt: new Date(),
  name: 'AutoML',
  parameters: [
    { name: 'b', type: 'int', required: true },
    { name: 'a', type: 'int', required: false },
  ],
};

const initialState = {
  component: {
    details: component,
  },
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

describe('ParametersTable component', () => {
  it('is expected render without crashing', () => {
    shallow(
      <Provider store={store}>
        <ParametersTable />
      </Provider>
    );
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ParametersTable />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('is expected to exist Table', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ParametersTable />
      </Provider>
    );
    expect(wrapper.find(Table).exists()).toBeTruthy();
  });

  it('sort records', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ParametersTable />
      </Provider>
    );

    const renderedNames = () => {
      return wrapper.find('TableRow').map((row) => row.props().record.name);
    };

    const sorter = wrapper.find('.ant-table-column-sorters');

    // ascend name
    sorter.simulate('click');
    expect(renderedNames()).toEqual(['a', 'b']);

    // descend name
    sorter.simulate('click');
    expect(renderedNames()).toEqual(['b', 'a']);
  });

  it('onDeleteComponent should be called', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ParametersTable />
      </Provider>
    );

    const popconfirm = wrapper.find(Popconfirm);
    const triggerNode = popconfirm.at(0).find('[href="#"]');
    triggerNode.simulate('click');
    expect(wrapper.find('.ant-btn-primary').simulate('click')).toBeTruthy();
  });
});

import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Button, Form, Modal } from 'antd';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import NewParameterModal from '../../NewParameterModal';
import NewParameterForm from '..';

const component = {
  uuid: '1',
  createdAt: '2019-11-05T17:16:53.000Z',
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

describe('NewParameterForm component', () => {
  it('is expected render without crashing', () => {
    shallow(
      <Provider store={store}>
        <NewParameterForm />
      </Provider>
    );
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <NewParameterForm />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render self and subcomponents', () => {
    const wrapper = mount(
      <Provider store={store}>
        <NewParameterForm />
      </Provider>
    );

    expect(wrapper.find('Form(NewParameterForm)').exists()).toBeTruthy();
    expect(wrapper.find(NewParameterForm).exists()).toBeTruthy();
    expect(wrapper.find(NewParameterModal).exists()).toBeTruthy();
  });

  it('submit should be called', () => {
    const wrapper = mount(
      <Provider store={store}>
        <NewParameterForm />
      </Provider>
    );

    const button = wrapper.find(Button);
    expect(button.simulate('click')).toBeTruthy();
  });
});

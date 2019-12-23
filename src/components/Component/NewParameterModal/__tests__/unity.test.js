import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Input, Modal, Select } from 'antd';
import NewParameterModal from '..';

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
const onCancel = () => {};

describe('NewParameterModal component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('is expected render without crashing', () => {
    shallow(
      <Provider store={store}>
        <NewParameterModal visible onCancel={onCancel} />
      </Provider>
    );
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <NewParameterModal visible onCancel={onCancel} />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render self and subcomponents', () => {
    const wrapper = mount(
      <Provider store={store}>
        <NewParameterModal visible onCancel={onCancel} />
      </Provider>
    );

    expect(wrapper.find('Form(NewParameterModal)').exists()).toBeTruthy();
    expect(wrapper.find(NewParameterModal).exists()).toBeTruthy();
    expect(wrapper.find(Modal).exists()).toBeTruthy();
  });

  it('onOk should be called', () => {
    // work around to ignore console log antd
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const wrapper = mount(
      <Provider store={store}>
        <NewParameterModal visible onCancel={onCancel} />
      </Provider>
    );

    const event = { preventDefault: () => {} };
    const modal = wrapper.find(Modal).instance();
    const spyHandleOk = jest.spyOn(modal, 'handleOk');
    modal.handleOk(event);
    expect(spyHandleOk).toHaveBeenCalled();
  });

  it('onCancel should be called', () => {
    const wrapper = mount(
      <Provider store={store}>
        <NewParameterModal visible onCancel={onCancel} />
      </Provider>
    );

    const modal = wrapper.find(Modal).instance();
    const spyHandleCancel = jest.spyOn(modal, 'handleCancel');
    modal.handleCancel();
    expect(spyHandleCancel).toHaveBeenCalled();
  });

  it('handleSubmit', () => {
    // mock dispatch response
    store.dispatch = jest.fn().mockImplementation(() => {
      return Promise.resolve(true);
    });

    const wrapper = mount(
      <Provider store={store}>
        <NewParameterModal visible onCancel={onCancel} />
      </Provider>
    );

    // change input value
    wrapper
      .find(Input)
      .at(0)
      .simulate('change', {
        target: { value: 'name' },
      });

    // change select value
    wrapper.find(Select).simulate('click');
    wrapper
      .find('MenuItem')
      .at(0)
      .simulate('click');

    const event = { preventDefault: () => {} };
    const modal = wrapper.find(Modal).instance();
    modal.handleOk(event);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});

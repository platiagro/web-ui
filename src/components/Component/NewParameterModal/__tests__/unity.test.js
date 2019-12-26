import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Form, Input, message, Modal, Select, Switch } from 'antd';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
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

const setupShallow = () => {
  const wrapper = shallow(
    <NewParameterModal visible onCancel={onCancel} store={store} />
  );
  return wrapper
    .dive()
    .dive()
    .dive();
};

const setupMount = () => {
  const wrapper = mount(
    <Provider store={store}>
      <NewParameterModal visible onCancel={onCancel} />
    </Provider>
  );
  return wrapper;
};

describe('NewParameterModal component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('is expected render without crashing', () => {
    setupShallow();
  });

  it('is expected render html correctly', () => {
    const wrapper = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render self and subcomponents', () => {
    const wrapper = setupShallow();
    expect(wrapper.find(Modal).exists()).toBeTruthy();
    expect(wrapper.find(Form).exists()).toBeTruthy();
    expect(wrapper.find(Input).exists()).toBeTruthy();
    expect(wrapper.find(Select).exists()).toBeTruthy();
    expect(wrapper.find(Switch).exists()).toBeTruthy();
  });

  it('onOk should be called', () => {
    // work around to ignore console log antd
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const wrapper = setupMount();
    const event = { preventDefault: () => {} };
    const modal = wrapper.find(Modal).instance();
    const spyHandleOk = jest.spyOn(modal, 'handleOk');
    modal.handleOk(event);
    expect(spyHandleOk).toHaveBeenCalled();
  });

  it('onCancel should be called', () => {
    const wrapper = setupMount();
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

    const wrapper = setupMount();

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

import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Modal } from 'antd';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import NewComponentModal from '..';

const initialState = {
  components: {
    componentList: [],
    modalIsVisible: false,
    loading: false,
    error: null,
  },
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('NewComponentModal component', () => {
  it('is expected render without crashing', () => {
    shallow(
      <Provider store={store}>
        <NewComponentModal />
      </Provider>
    );
  });

  it('is expected render html correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <NewComponentModal />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render self and subcomponents', () => {
    const wrapper = mount(
      <Provider store={store}>
        <NewComponentModal />
      </Provider>
    );

    expect(wrapper.find('Form(NewComponentModal)').exists()).toBeTruthy();
    expect(wrapper.find(NewComponentModal).exists()).toBeTruthy();
    expect(wrapper.find(Modal).exists()).toBeTruthy();
  });

  it('onOk should be called', () => {
    const wrapper = mount(
      <Provider store={store}>
        <NewComponentModal />
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
        <NewComponentModal />
      </Provider>
    );

    const modal = wrapper.find(Modal).instance();
    const spyHandleCancel = jest.spyOn(modal, 'handleCancel');
    modal.handleCancel();
    expect(spyHandleCancel).toHaveBeenCalled();
  });
});

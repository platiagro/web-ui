import React from 'react';
import thunk from 'redux-thunk';
import { Form, Input, Modal } from 'antd';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import NewProjectModal from '..';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  projects: {
    modalIsVisible: false,
  },
});

const setupShallow = () => {
  const wrapper = shallow(<NewProjectModal store={store} />);
  return wrapper
    .dive()
    .dive()
    .dive();
};

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('NewProjectModal component', () => {
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
  });

  it('Modal onCancel', () => {
    store.dispatch = jest.fn();
    const wrapper = setupShallow();
    const modal = wrapper.find(Modal);
    const modalProps = modal.props();
    modalProps.onCancel();
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'PROJECTS_TOGGLE_MODAL',
    });
  });

  it('Modal onOk without input', () => {
    // work around to ignore console log error antd
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const spyConsoleWarn = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});
    const wrapper = setupShallow();
    const event = { preventDefault: () => {} };
    const input = wrapper.find(Input);
    input.simulate('change', '');
    wrapper.update();
    const modal = wrapper.find(Modal);
    const modalProps = modal.props();
    modalProps.onOk(event);
    expect(spyConsoleWarn).toHaveBeenCalled();
  });

  it('Modal onOk with input', () => {
    store.dispatch = jest.fn();
    const wrapper = setupShallow();
    const event = { preventDefault: () => {} };
    const modal = wrapper.find(Modal);
    const modalProps = modal.props();
    modalProps.onOk(event);
    expect(store.dispatch).toHaveBeenCalled();
  });
});

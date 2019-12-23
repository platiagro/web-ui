import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Form, Input, Select } from 'antd';
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
  afterEach(() => {
    jest.clearAllMocks();
  });

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

  it('toggleModal', () => {
    const wrapper = mount(
      <Provider store={store}>
        <NewParameterForm />
      </Provider>
    );
    wrapper.find('[href="#"]').simulate('click');
    const props = wrapper.find(NewParameterModal).props();
    expect(props.visible).toBeTruthy();
  });

  it('handleSubmit', () => {
    // mock dispatch response
    store.dispatch = jest.fn().mockImplementation(() => {
      return Promise.resolve(true);
    });

    const wrapper = mount(
      <Provider store={store}>
        <NewParameterForm />
      </Provider>
    );

    // change input value
    wrapper.find(Input).simulate('change', {
      target: { value: 'name' },
    });

    // change select value
    wrapper.find(Select).simulate('click');
    wrapper
      .find('MenuItem')
      .at(0)
      .simulate('click');

    const preventDefault = jest.fn();
    const form = wrapper.find(Form);
    form.props().onSubmit({ preventDefault });
    expect(preventDefault).toBeCalled();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});

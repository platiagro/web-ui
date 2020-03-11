import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Layout, Row, Col } from 'antd';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import NewProjectModal from '../../../components/Project/NewProjectModal';
import Root from '..';

const { Content } = Layout;

const initialState = {
  projects: {
    modalIsVisible: false,
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

describe('Root component', () => {
  it('is expected render without crashing', () => {
    shallow(
      <Provider store={store}>
        <Root />
      </Provider>
    );
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Root />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render self and subcomponents', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Root />
      </Provider>
    );

    expect(wrapper.find(Layout).exists()).toBeTruthy();
    expect(wrapper.find(NewProjectModal).exists()).toBeTruthy();
    expect(wrapper.find(Content).exists()).toBeTruthy();
    expect(wrapper.find(Row).exists()).toBeTruthy();
    expect(wrapper.find(Col).exists()).toBeTruthy();
  });
});

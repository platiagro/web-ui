import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import { Button } from 'antd';
import ContentHeader from '../../../components/ContentHeader';
import ProjectsTable from '../../../components/Project/ProjectsTable';
import NewProjectModal from '../../../components/Project/NewProjectModal';
import Projects from '..';

const projects = [
  {
    uuid: '01',
    name: 'test01',
  },
];

const initialState = {
  projects: {
    projectsList: [],
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

describe('Projects page', () => {
  it('is expected render without crashing', () => {
    shallow(
      <Provider store={store}>
        <Projects />
      </Provider>
    );
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Projects />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render self and subProjects', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Projects />
      </Provider>
    );

    expect(wrapper.find(ContentHeader).exists()).toBeTruthy();
    expect(wrapper.find(NewProjectModal).exists()).toBeTruthy();
  });

  it('onToggleModal', () => {
    // mock dispatch
    store.dispatch = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <Projects />
      </Provider>
    );

    const button = wrapper.find(Button);
    button.simulate('click');
    expect(store.dispatch).toBeCalled();
  });
});

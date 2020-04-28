import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { Table } from 'antd';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ProjectsTable from '..';

const projects = [
  {
    uuid: 'uuid',
    name: 'name',
    createdAt: '2019-12-20T16:38:42.000Z',
  },
];

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  projects: {
    projectsList: projects,
  },
});

const setupShallow = () => {
  const wrapper = shallow(<ProjectsTable store={store} />);
  return wrapper.dive().dive();
};

const setupMount = () => {
  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <ProjectsTable />
      </Router>
    </Provider>
  );
  return wrapper;
};

describe('ComponentTable component', () => {
  it('is expected render without crashing', () => {
    setupShallow();
  });

  it('is expected render html correctly', () => {
    const wrapper = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it('is expected to exist Table', () => {
    const wrapper = setupMount();
    expect(wrapper.find(Table).exists()).toBeTruthy();
  });
});

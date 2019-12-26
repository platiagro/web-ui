import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { Popconfirm, Table } from 'antd';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ComponentsTable from '..';

const components = [
  {
    uuid: '9014c0e6-534b-4e7d-a8db-cd5c9d8ee540',
    createdAt: '2019-11-05T17:16:53.000Z',
    updatedAt: null,
    name: 'teste 2',
    file: '',
  },
  {
    uuid: '58af2581-de59-40ea-8051-cf28a9c3f5b1',
    createdAt: '2019-11-04T17:16:48.000Z',
    updatedAt: null,
    name: 'teste 1',
    file: '',
  },
  {
    uuid: '80b35439-d45b-4ae1-b437-8069a5663510',
    createdAt: '2019-11-07T17:16:43.000Z',
    updatedAt: null,
    name: 'teste ',
    file: '',
  },
];

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  components: {
    componentList: components,
  },
});

const setupShallow = () => {
  const wrapper = shallow(<ComponentsTable store={store} />);
  return wrapper.dive().dive();
};

const setupMount = () => {
  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <ComponentsTable />
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
    const wrapper = setupShallow();
    expect(wrapper.find(Table).exists()).toBeTruthy();
  });

  it('sort records', () => {
    const wrapper = setupMount();

    const renderedNames = () => {
      return wrapper.find('TableRow').map((row) => row.props().record.name);
    };

    const sorters = wrapper.find('.ant-table-column-sorters');

    // ascend name
    sorters.at(0).simulate('click');
    expect(renderedNames()).toEqual(['teste ', 'teste 1', 'teste 2']);

    // descend name
    sorters.at(0).simulate('click');
    expect(renderedNames()).toEqual(['teste 2', 'teste 1', 'teste ']);

    // ascend create date
    sorters.at(1).simulate('click');
    expect(renderedNames()).toEqual(['teste 1', 'teste 2', 'teste ']);

    // descend create date
    sorters.at(1).simulate('click');
    expect(renderedNames()).toEqual(['teste ', 'teste 2', 'teste 1']);
  });

  it('onDeleteComponent should be called', () => {
    const wrapper = setupMount();
    const popconfirm = wrapper.find(Popconfirm);
    const triggerNode = popconfirm.at(0).find('[href="#"]');
    triggerNode.simulate('click');
    expect(wrapper.find('.ant-btn-primary').simulate('click')).toBeTruthy();
  });
});

import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ComponentsTable from '../../../components/Component/ComponentsTable';
import ContentHeader from '../../../components/ContentHeader';
import NewComponentModal from '../../../components/Component/NewComponentModal';
import Components from '..';

const componentsList = [
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

describe('Components page', () => {
  it('is expected render without crashing', () => {
    shallow(
      <Provider store={store}>
        <Components />
      </Provider>
    );
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Components />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render self and subcomponents', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Components />
      </Provider>
    );

    expect(wrapper.find(ContentHeader).exists()).toBeTruthy();
    expect(wrapper.find(NewComponentModal).exists()).toBeTruthy();
  });
});

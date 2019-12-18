import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ContentHeader from '../../../components/ContentHeader';
import ComponentsParametersTable from '../../../components/Component/ParametersTable';
import ComponentsUpload from '../../../components/Component/ComponentsUpload';
import NewParameterForm from '../../../components/Component/NewParameterForm';
import EditableTitle from '../../../components/EditableTitle';
import ComponentDetail from '..';

const component = {
  uuid: '1',
  createdAt: new Date(),
  name: 'AutoML',
  parameters: [{ name: 'automl_time_limit', type: 'int', required: true }],
};

const namespaces = [
  {
    namespace: 'anonymous',
    role: 'contributor',
    user: 'anonymous@kubeflow.org',
  },
];

const initialState = {
  component: {
    details: component,
    namespaces,
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

describe('ComponentDetail page', () => {
  it('is expected render without crashing', () => {
    shallow(
      <Provider store={store}>
        <ComponentDetail />
      </Provider>
    );
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ComponentDetail />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render self and subComponentDetail', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ComponentDetail match={{ params: { componentId: component.uuid } }} />
      </Provider>
    );

    expect(wrapper.find(ContentHeader).exists()).toBeTruthy();
    expect(wrapper.find(EditableTitle).exists()).toBeTruthy();
    expect(wrapper.find(NewParameterForm).exists()).toBeTruthy();
    expect(wrapper.find(ComponentsUpload).exists()).toBeTruthy();
    expect(wrapper.find(ComponentsParametersTable).exists()).toBeTruthy();
  });
});

import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Input, Collapse, Empty } from 'antd';
import LeftSideMenuTemplateItem from '../../LeftSideMenuTemplateItem';
import LeftSideMenuConnected, { LeftSideMenu } from '..';

const { Panel } = Collapse;
const experimentsList = [{ uuid: '1', runStatus: 'teste' }];
const onGetPipelines = jest.fn();

jest.mock('react-router-dom', () => ({
  useParams: () => ({
    projectId: '1',
    experimentId: '1',
  }),
}));

describe('LeftSideMenu component', () => {
  it('is expected render without crashing', () => {
    shallow(
      <LeftSideMenu
        experimentsList={experimentsList}
        onGetPipelines={onGetPipelines}
      />
    );
  });

  it('is expected render with redux without crashing', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({
      project: {
        uuid: '1',
        name: 'teste',
        experimentsList,
      },
    });

    mount(
      <Provider store={store}>
        <LeftSideMenuConnected />
      </Provider>
    );
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(
      <LeftSideMenu
        experimentsList={experimentsList}
        onGetPipelines={onGetPipelines}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('handleClick', () => {
    const onUpdateExperiment = jest.fn();
    const wrapper = shallow(
      <LeftSideMenu
        experimentsList={experimentsList}
        onGetPipelines={onGetPipelines}
        onUpdateExperiment={onUpdateExperiment}
      />
    );
    const templateItems = wrapper.find(LeftSideMenuTemplateItem);
    const templateItemsProps = templateItems.at(0).props();
    const { template } = templateItemsProps;
    templateItemsProps.handleClick(template);
    expect(onUpdateExperiment).toHaveBeenCalled();
  });

  it('handleFilter', () => {
    const wrapper = shallow(
      <LeftSideMenu
        experimentsList={[{ uuid: '1', runStatus: 'Deployed' }]}
        onGetPipelines={onGetPipelines}
      />
    );
    const input = wrapper.find(Input);
    input.simulate('change', {
      currentTarget: { value: 'testee' },
    });
    expect(wrapper.find(Empty).exists()).toBeTruthy();
    input.simulate('change', {
      currentTarget: { value: 'Auto' },
    });
    expect(wrapper.find(Panel).exists()).toBeTruthy();
  });
});

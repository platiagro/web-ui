import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import ContentHeader from '../../../components/ContentHeader';
import ImplantedFlowsTable from '../../../components/ImplantedFlowsTable';
import NewProjectModal from '../../../components/Project/NewProjectModal';
import ImplantedFlows from '..';

const implatedFlows = [
  {
    key: 'key',
    flowName: 'flowName',
    url: 'url',
    created: 'created',
    action: 'action',
  },
];

describe('ImplantedFlows component', () => {
  it('is expected render without crashing', () => {
    shallow(<ImplantedFlows />);
  });

  it('is expected render body with empty html correctly', () => {
    act(() => {
      const wrapper = mount(<ImplantedFlows />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});

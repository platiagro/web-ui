import React from 'react';
import { shallow, mount } from 'enzyme';
import nock from 'nock';
import ImplantedFlowsTable from '../../../components/ImplantedFlowsTable';
import { URL } from '../../../services/pipelinesApi';
import ImplantedFlows from '..';

const deploy = {
  id: '8fc17806-76f0-4e9e-b54d-8e37b68686b0',
  name: 'projeto01 - projeto01_1',
  created_at: '2019-12-13T14:09:12Z',
  status: 'Succeeded',
  pipeline_spec: {
    pipeline_id: 'a3f683d7-1e7b-488b-9b38-f7a217f02f69',
    pipeline_name:
      '[Deployment] AutoFeaturing + Linear Regression/Logistic Regression',
    workflow_manifest: 'SeldonDeployment',
    parameters: [
      {
        name: 'deployment-name',
        value: '23218a9c-3a19-4c3d-9340-4f0284f4ffb3',
      },
      {
        name: 'experiment-id',
        value: '23218a9c-3a19-4c3d-9340-4f0284f4ffb3',
      },
      {
        name: 'target',
        value: 'Temperatura',
      },
      {
        name: 'date',
        value: 'Data',
      },
      {
        name: 'csv',
        value: 'csv',
      },
    ],
  },
};
const deployments = [deploy];

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

describe('ImplantedFlows component', () => {
  it('is expected render without crashing', () => {
    shallow(<ImplantedFlows />);
  });

  it('is expected render body with empty html correctly', async () => {
    const wrapper = shallow(<ImplantedFlows />);
    expect(wrapper).toMatchSnapshot();
  });

  it('is expected render body with empty html correctly', async () => {
    // work around to ignore console log act error
    jest.spyOn(console, 'error').mockImplementation(() => {});

    nock(URL)
      .get(`/pipeline/apis/v1beta1/runs?page_size=100`)
      .reply(200, { runs: deployments });

    const wrapper = mount(<ImplantedFlows />);
    await sleep(1000);
    wrapper.update();
    expect(wrapper.find(ImplantedFlowsTable).exists()).toBeTruthy();
  });
});

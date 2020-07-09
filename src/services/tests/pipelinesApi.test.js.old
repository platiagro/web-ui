import nock from 'nock';
import * as pipelinesServices from '../pipelinesApi';

const deploy = {
  id: '8fc17806-76f0-4e9e-b54d-8e37b68686b0',
  name: 'projeto01 - projeto01_1',
  created_at: '2019-12-13T14:09:12Z',
  scheduled_at: '1970-01-01T00:00:00Z',
  finished_at: '2019-12-13T14:10:34Z',
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

describe('pipelines API', () => {
  it('should call getPipelines success', async () => {
    nock(pipelinesServices.URL)
      .get(`/pipeline/apis/v1beta1/pipelines`)
      .reply(200, {
        pipelines: [
          {
            id: '4d6e0402-8217-40ef-abf7-d068d5fde06f',
            name: '[Training] Linear Regression/Logistic Regression',
          },
          {
            id: '49835c76-11da-467c-9ac8-d549e545d5e7',
            name: '[Teste] AutoML',
          },
        ],
      });

    const response = await pipelinesServices.getPipelines();
    expect(response).toBeTruthy();
  });

  it('should call getPipelines error', async () => {
    nock(pipelinesServices.URL)
      .get(`/pipeline/apis/v1beta1/pipelines`)
      .reply(400);

    const response = await pipelinesServices.getPipelines();
    expect(response).toEqual(undefined);
  });

  it('should call startRun success', async () => {
    nock(pipelinesServices.URL)
      .post('/pipeline/apis/v1beta1/runs')
      .reply(200);

    const response = await pipelinesServices.startRun('body');
    expect(response).toBeTruthy();
  });

  it('should call startRun error', async () => {
    nock(pipelinesServices.URL)
      .post('/pipeline/apis/v1beta1/runs')
      .reply(400);

    const response = await pipelinesServices.startRun('body');
    expect(response).toEqual(undefined);
  });

  it('should call getStatusRun success', async () => {
    const runId = 'runId';
    nock(pipelinesServices.URL)
      .get(`/pipeline/apis/v1beta1/runs/${runId}`)
      .reply(200);

    const response = await pipelinesServices.getStatusRun(runId);
    expect(response).toBeTruthy();
  });

  it('should call getStatusRun error', async () => {
    const runId = 'runId';
    nock(pipelinesServices.URL)
      .get(`/pipeline/apis/v1beta1/runs/${runId}`)
      .reply(400);

    const response = await pipelinesServices.getStatusRun(runId);
    expect(response).toEqual(undefined);
  });

  it('should call getDeployments success', async () => {
    nock(pipelinesServices.URL)
      .get('/pipeline/apis/v1beta1/runs?page_size=100')
      .reply(200, { runs: deployments });

    const response = await pipelinesServices.getDeployments();
    expect(response).toBeTruthy();
  });

  it('should call getDeployments error', async () => {
    nock(pipelinesServices.URL)
      .get('/pipeline/apis/v1beta1/runs?page_size=100')
      .reply(400);

    const response = await pipelinesServices.getDeployments();
    expect(response).toEqual(undefined);
  });
});

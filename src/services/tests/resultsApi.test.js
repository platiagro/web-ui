import nock from 'nock';
import * as resultsServices from '../resultsApi';

const datasetId = 'datasetId';
const experimentId = 'experimentId';
const task = 'task';
const headerId = 'headerId';

describe('results API', () => {
  it('should call getResultTable success', async () => {
    nock(resultsServices.URL)
      .get(`/results/${experimentId}/${task}/${headerId}`)
      .reply(200, { payload: 'payload' });

    const response = await resultsServices.getResultTable(
      experimentId,
      task,
      headerId
    );
    expect(response).toBeTruthy();
  });

  it('should call getResultTable error', async () => {
    nock(resultsServices.URL)
      .get(`/pipeline/apis/v1beta1/pipelines`)
      .reply(400);

    const response = await resultsServices.getResultTable(
      experimentId,
      task,
      headerId
    );
    expect(response).toEqual(undefined);
  });

  it('should call getDatasetTable success', async () => {
    nock(resultsServices.URL)
      .get(`/results/${experimentId}/dataset/${datasetId}`)
      .reply(200, { payload: 'payload' });

    const response = await resultsServices.getDatasetTable(
      experimentId,
      datasetId
    );
    expect(response).toBeTruthy();
  });

  it('should call getDatasetTable error', async () => {
    nock(resultsServices.URL)
      .get(`/results/${experimentId}/dataset/${datasetId}`)
      .reply(400);

    const response = await resultsServices.getDatasetTable(
      experimentId,
      datasetId
    );
    expect(response).toEqual(undefined);
  });

  it('should call getPlot success', async () => {
    nock(resultsServices.URL)
      .get(`/results/${experimentId}/type/`)
      .reply(200, { type: 'type' });

    nock(resultsServices.URL)
      .get(`/results/${experimentId}/plot/`)
      .reply(200);

    global.window = Object.create(window);
    global.window.URL.createObjectURL = () => {};
    const response = await resultsServices.getPlot(experimentId);
    expect(response).toBeTruthy();
  });

  it('should call getPlot error', async () => {
    nock(resultsServices.URL)
      .get(`/results/${experimentId}/type/`)
      .reply(400);

    const response = await resultsServices.getPlot(experimentId);
    expect(response).toEqual(undefined);
  });
});

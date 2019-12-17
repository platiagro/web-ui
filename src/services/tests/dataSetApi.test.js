import nock from 'nock';
import * as dataSetServices from '../dataSetApi';

const id = 'id';
const headerId = 'headerId';
const columnId = 'columnId';
const newType = 'newType';

describe('dataSet API', () => {
  it('should call getDataSet success', async () => {
    nock(dataSetServices.URL)
      .get(`/datasets/${id}`)
      .reply(200);

    const response = await dataSetServices.getDataSet(id);
    expect(response).toBeTruthy();
  });

  it('should call getDataSet error', async () => {
    nock(dataSetServices.URL)
      .get(`/datasets/${id}`)
      .reply(400);

    const response = await dataSetServices.getDataSet(id);
    expect(response).toEqual(undefined);
  });

  it('should call getHeader success', async () => {
    nock(dataSetServices.URL)
      .get(`/headers/${id}`)
      .reply(200);

    const response = await dataSetServices.getHeader(id);
    expect(response).toBeTruthy();
  });

  it('should call getHeader error', async () => {
    nock(dataSetServices.URL)
      .get(`/headers/${id}`)
      .reply(400);

    const response = await dataSetServices.getHeader(id);
    expect(response).toEqual(undefined);
  });

  it('should call getHeaderColumns success', async () => {
    nock(dataSetServices.URL)
      .get(`/headers/${id}/columns`)
      .reply(200);

    const response = await dataSetServices.getHeaderColumns(id);
    expect(response).toBeTruthy();
  });

  it('should call getHeaderColumns error', async () => {
    nock(dataSetServices.URL)
      .get(`/headers/${id}/columns`)
      .reply(400);

    const response = await dataSetServices.getHeaderColumns(id);
    expect(response).toEqual(undefined);
  });

  it('should call updateColumn success', async () => {
    nock(dataSetServices.URL)
      .patch(`/headers/${headerId}/columns/${columnId}`)
      .reply(200);

    const response = await dataSetServices.updateColumn(
      headerId,
      columnId,
      newType
    );
    expect(response).toBeTruthy();
  });

  it('should call updateColumn error', async () => {
    nock(dataSetServices.URL)
      .patch(`/headers/${headerId}/columns/${columnId}`)
      .reply(400);

    const response = await dataSetServices.updateColumn(
      headerId,
      columnId,
      newType
    );
    expect(response).toEqual(undefined);
  });

  it('should call uploadDataSet success', async () => {
    nock(dataSetServices.URL)
      .post(`/datasets`)
      .reply(200);

    const response = await dataSetServices.uploadDataSet('form');
    expect(response).toBeTruthy();
  });

  it('should call uploadDataSet error', async () => {
    nock(dataSetServices.URL)
      .post(`/datasets`)
      .reply(400);

    const response = await dataSetServices.uploadDataSet('form');
    expect(response).toEqual(undefined);
  });
});

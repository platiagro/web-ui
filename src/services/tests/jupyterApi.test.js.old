import nock from 'nock';
import * as componentsServices from '../componentsApi';
import * as jupyterServices from '../jupyterApi';

describe('jupyter API', () => {
  it('should call getNamespaces success', async () => {
    nock(jupyterServices.URL)
      .get(`/kubeflow/api/workgroup/env-info`)
      .reply(200);
    const response = await jupyterServices.getNamespaces();
    expect(response).toBeTruthy();
  });

  it('should call getNamespaces error', async () => {
    nock(jupyterServices.URL)
      .get(`/kubeflow/api/workgroup/env-info`)
      .reply(400);
    const response = await jupyterServices.getNamespaces();
    expect(response).toEqual(undefined);
  });

  it('should call getNotebook success', async () => {
    const namespace = 'namespace';
    nock(jupyterServices.URL)
      .get(`/jupyter/api/namespaces/${namespace}/notebooks`)
      .reply(200);
    const response = await jupyterServices.getNotebook(namespace);
    expect(response).toBeTruthy();
  });

  it('should call getNotebook error', async () => {
    const namespace = 'namespace';
    nock(jupyterServices.URL)
      .get(`/jupyter/api/namespaces/${namespace}/notebooks`)
      .reply(400);
    const response = await jupyterServices.getNotebook(namespace);
    expect(response).toEqual(undefined);
  });

  it('should call uploadFile success', async () => {
    const namespace = 'namespace';
    const notebook = 'notebook';
    const fileName = 'fileName';
    nock(componentsServices.URL)
      .post(`/components/downloadBase64`)
      .reply(200, {
        payload: 'payload',
      });

    nock(jupyterServices.URL)
      .put(`/notebook/${namespace}/${notebook}/api/contents/${fileName}`)
      .reply(200);
    const response = await jupyterServices.uploadFile(
      namespace,
      notebook,
      'filePath',
      fileName
    );
    expect(response).toBeTruthy();
  });

  it('should call uploadFile downloadBase64 error', async () => {
    const namespace = 'namespace';
    const notebook = 'notebook';
    const fileName = 'fileName';
    nock(componentsServices.URL)
      .post(`/components/downloadBase64`)
      .reply(400);
    const response = await jupyterServices.uploadFile(
      namespace,
      notebook,
      'filePath',
      fileName
    );
    expect(response).toEqual(undefined);
  });

  it('should call uploadFile error', async () => {
    const namespace = 'namespace';
    const notebook = 'notebook';
    const fileName = 'fileName';
    nock(componentsServices.URL)
      .post(`/components/downloadBase64`)
      .reply(200, {
        payload: 'payload',
      });

    nock(jupyterServices.URL)
      .put(`/notebook/${namespace}/${notebook}/api/contents/${fileName}`)
      .reply(400);
    const response = await jupyterServices.uploadFile(
      namespace,
      notebook,
      'filePath',
      fileName
    );
    expect(response).toEqual(undefined);
  });
});

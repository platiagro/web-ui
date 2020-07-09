import nock from 'nock';
import * as componentsServices from '../componentsApi';

const component_id = '1';
const component = {
  uuid: component_id,
  name: 'teste',
};
const componentList = [component];

const parameter1 = { name: 'a', type: 'int', required: true };
const parameter2 = { name: 'c', type: 'int', required: true };
const parameters = [parameter1, parameter2];

describe('components API', () => {
  it('should call getAllComponents success', async () => {
    nock(componentsServices.URL)
      .get('/components')
      .reply(200, {
        payload: [component],
      });

    const response = await componentsServices.getAllComponents();
    expect(response.data.payload).toEqual(componentList);
  });

  it('should call getAllComponents error', async () => {
    nock(componentsServices.URL)
      .get('/components')
      .reply(400);

    const response = await componentsServices.getAllComponents();
    expect(response).toEqual(undefined);
  });

  it('should call getComponent success', async () => {
    const id = 'id';
    nock(componentsServices.URL)
      .get(`/components/${id}`)
      .reply(200, {
        payload: component,
      });

    const response = await componentsServices.getComponent(id);
    expect(response.data.payload).toEqual(component);
  });

  it('should call getComponent error', async () => {
    const id = 'id';
    nock(componentsServices.URL)
      .get(`/components/${id}`)
      .reply(400);

    const response = await componentsServices.getComponent(id);
    expect(response).toEqual(undefined);
  });

  it('should call createComponent success', async () => {
    nock(componentsServices.URL)
      .post(`/components/`)
      .reply(200, {
        payload: component,
      });

    const response = await componentsServices.createComponent('newComponent');
    expect(response.data.payload).toEqual(component);
  });

  it('should call createComponent error', async () => {
    nock(componentsServices.URL)
      .post(`/components/`)
      .reply(400);

    const response = await componentsServices.createComponent('newComponent');
    expect(response).toEqual(undefined);
  });

  it('should call updateComponent success', async () => {
    const auxComponent = { ...component };
    auxComponent.name = 'newName';
    nock(componentsServices.URL)
      .patch(`/components/${component_id}`)
      .reply(200, {
        payload: auxComponent,
      });

    const response = await componentsServices.updateComponent(
      component_id,
      'newName'
    );
    expect(response.data.payload).toEqual(auxComponent);
  });

  it('should call updateComponent error', async () => {
    nock(componentsServices.URL)
      .patch(`/components/${component_id}`)
      .reply(400);

    const response = await componentsServices.updateComponent(
      component_id,
      'newName'
    );
    expect(response).toEqual(undefined);
  });

  it('should call updateParameters success', async () => {
    const auxComponent = { ...component };
    auxComponent.parameters = parameters;
    nock(componentsServices.URL)
      .patch(`/components/${component_id}`)
      .reply(200, {
        payload: auxComponent,
      });

    const response = await componentsServices.updateParameters(
      component_id,
      parameters
    );
    expect(response.data.payload).toEqual(auxComponent);
  });

  it('should call updateParameters error', async () => {
    nock(componentsServices.URL)
      .patch(`/components/${component_id}`)
      .reply(400);

    const response = await componentsServices.updateParameters(
      component_id,
      parameters
    );
    expect(response).toEqual(undefined);
  });

  it('should call deleteFiles success', async () => {
    const files = ['Teste Componente.ipynb'];
    nock(componentsServices.URL)
      .post(`/components/deleteFiles/${component_id}`)
      .reply(200);

    const response = await componentsServices.deleteFiles(component_id, files);
    expect(response).toBeTruthy();
  });

  it('should call deleteFiles error', async () => {
    nock(componentsServices.URL)
      .post(`/components/deleteFiles/${component_id}`)
      .reply(400);

    const response = await componentsServices.deleteFiles(component_id, []);
    expect(response).toEqual(undefined);
  });

  it('should call deleteComponent success', async () => {
    nock(componentsServices.URL)
      .delete(`/components/${component_id}`)
      .reply(200);
    const response = await componentsServices.deleteComponent(component_id);
    expect(response).toBeTruthy();
  });

  it('should call deleteComponent error', async () => {
    nock(componentsServices.URL)
      .delete(`/components/${component_id}`)
      .reply(400);
    const response = await componentsServices.deleteComponent(component_id);
    expect(response).toEqual(undefined);
  });

  it('should call downloadBase64 success', async () => {
    nock(componentsServices.URL)
      .post(`/components/downloadBase64`)
      .reply(200);
    const response = await componentsServices.downloadBase64('filePath');
    expect(response).toBeTruthy();
  });

  it('should call downloadBase64 error', async () => {
    nock(componentsServices.URL)
      .post(`/components/downloadBase64`)
      .reply(400);
    const response = await componentsServices.downloadBase64('filePath');
    expect(response).toEqual(undefined);
  });
});

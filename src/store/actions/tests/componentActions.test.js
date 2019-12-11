import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { URL } from '../../../services/componentsApi';
import { URL as JUPYTER_URL } from '../../../services/jupyterApi';
import * as actions from '../componentActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const component_id = '1';
const newParameter = { name: 'b', type: 'int', required: true };
const parameter = { name: 'a', type: 'int', required: true };
const parameter2 = { name: 'c', type: 'int', required: true };
const parameters = [parameter, parameter2];
const namespaces = [
  {
    namespace: 'anonymous',
    role: 'contributor',
    user: 'anonymous@kubeflow.org',
  },
];

describe('component actions', () => {
  it('should create an action COMPONENT_FETCH_DETAIL_STARTED', () => {
    const expectedAction = {
      type: actions.COMPONENT_FETCH_DETAIL_STARTED,
    };
    expect(actions.fetchStarted()).toEqual(expectedAction);
  });

  it('should create an action COMPONENT_FETCH_DETAIL', () => {
    const component = {
      uuid: component_id,
      name: 'teste',
    };
    const expectedAction = {
      type: actions.COMPONENT_FETCH_DETAIL,
      detail: component,
    };
    expect(actions.setComponentDetail(component)).toEqual(expectedAction);
  });

  it('should call COMPONENT_FETCH_DETAIL_STARTED and COMPONENT_FETCH_DETAIL when fetch component detail without file has been done', () => {
    nock(URL)
      .get(`/components/${component_id}`)
      .reply(200, {
        payload: {
          uuid: component_id,
          name: 'teste',
        },
      });

    const expectedActions = [
      { type: actions.COMPONENT_FETCH_DETAIL_STARTED },
      {
        type: actions.COMPONENT_FETCH_DETAIL,
        detail: {
          uuid: component_id,
          name: 'teste',
          file: null,
          parameters: [],
        },
      },
    ];
    const store = mockStore();
    return store.dispatch(actions.getComponentDetail(component_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should call COMPONENT_FETCH_DETAIL_STARTED and COMPONENT_FETCH_DETAIL when fetch component detail with file has been done', () => {
    const file = 's3://pipeline/components/123/Teste Componente.ipynb';
    nock(URL)
      .get(`/components/${component_id}`)
      .reply(200, {
        payload: {
          uuid: component_id,
          name: 'teste',
          file,
        },
      });

    const expectedActions = [
      { type: actions.COMPONENT_FETCH_DETAIL_STARTED },
      { type: actions.COMPONENT_FETCH_DETAIL },
    ];
    const store = mockStore();
    return store.dispatch(actions.getComponentDetail(component_id)).then(() => {
      const storeActions = store.getActions();
      delete storeActions[1].detail;
      expect(storeActions).toEqual(expectedActions);
    });
  });

  it('should create an action COMPONENT_FETCH_NAMESPACES', () => {
    const expectedAction = {
      type: actions.COMPONENT_FETCH_NAMESPACES,
      namespaces,
    };
    expect(actions.setNamespaces(namespaces)).toEqual(expectedAction);
  });

  it('should call COMPONENT_FETCH_NAMESPACES when fetch jupyter namespaces has been done', () => {
    nock(JUPYTER_URL)
      .get('/kubeflow/api/workgroup/env-info')
      .reply(200, { namespaces });

    const expectedActions = [
      { type: actions.COMPONENT_FETCH_NAMESPACES, namespaces },
    ];
    const store = mockStore();
    return store.dispatch(actions.getNamespaces()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action COMPONENT_UPDATE_FILE', () => {
    const expectedAction = {
      type: actions.COMPONENT_UPDATE_FILE,
      file: {},
    };
    expect(actions.updateComponentFile({})).toEqual(expectedAction);
  });

  it('should create an action COMPONENT_UPDATE_PARAMS', () => {
    const expectedAction = {
      type: actions.COMPONENT_UPDATE_PARAMS,
      parameters,
    };
    expect(actions.setComponentParams(parameters)).toEqual(expectedAction);
  });

  it('should call COMPONENT_UPDATE_PARAMS when add parameter has been done', () => {
    const auxNewParamenter = [...parameters, newParameter];
    nock(URL)
      .patch(`/components/${component_id}`)
      .reply(200, { payload: { parameters: auxNewParamenter } });

    const expectedActions = [
      { type: actions.COMPONENT_UPDATE_PARAMS, parameters: auxNewParamenter },
    ];
    const store = mockStore();
    return store
      .dispatch(actions.addParam(component_id, parameters, newParameter))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should not call COMPONENT_UPDATE_PARAMS when add parameter get request error', () => {
    nock(URL)
      .patch(`/components/${component_id}`)
      .reply(400);

    const expectedActions = [];
    const store = mockStore();
    return store
      .dispatch(actions.addParam(component_id, parameters, newParameter))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should not call COMPONENT_UPDATE_PARAMS when add parameter exist', () => {
    const result = actions.addParam(component_id, parameters, parameter);
    return expect(result).toEqual(false);
  });

  it('should create an action COMPONENT_UPDATE_NAME', () => {
    const expectedAction = {
      type: actions.COMPONENT_UPDATE_NAME,
      name: 'teste',
    };
    expect(actions.setComponentName('teste')).toEqual(expectedAction);
  });

  it('should call COMPONENT_UPDATE_PARAMS when delete parameter has been done', () => {
    nock(URL)
      .patch(`/components/${component_id}`)
      .reply(200, { payload: { parameters: [] } });

    const expectedActions = [
      { type: actions.COMPONENT_UPDATE_PARAMS, parameters: [] },
    ];
    const store = mockStore();
    return store
      .dispatch(actions.removeParam(component_id, parameters, parameters[0]))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should not call COMPONENT_UPDATE_PARAMS when delete parameter get request error', () => {
    nock(URL)
      .patch(`/components/${component_id}`)
      .reply(400);

    const expectedActions = [];
    const store = mockStore();
    return store
      .dispatch(actions.removeParam(component_id, parameters, parameters[0]))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should not call COMPONENT_UPDATE_PARAMS when delete parameter not exist', () => {
    const result = actions.removeParam(component_id, parameters, newParameter);
    return expect(result).toEqual(false);
  });

  it('should create an action COMPONENT_UPDATE_NAME', () => {
    const expectedAction = {
      type: actions.COMPONENT_UPDATE_NAME,
      name: 'teste',
    };
    expect(actions.setComponentName('teste')).toEqual(expectedAction);
  });

  it('should call COMPONENT_UPDATE_NAME when update component name has been done', () => {
    const newName = 'teste';
    nock(URL)
      .patch(`/components/${component_id}`)
      .reply(200);

    const expectedActions = [
      { type: actions.COMPONENT_UPDATE_NAME, name: newName },
    ];
    const store = mockStore();
    return store
      .dispatch(actions.updateComponentName({ uuid: component_id }, newName))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should not call COMPONENT_UPDATE_NAME when update component name get request error', () => {
    const newName = 'teste';
    nock(URL)
      .patch(`/components/${component_id}`)
      .reply(400);

    const expectedActions = [];
    const store = mockStore();
    return store
      .dispatch(actions.updateComponentName({ uuid: component_id }, newName))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

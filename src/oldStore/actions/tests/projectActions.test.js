import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { URL as PIPELINE_URL } from '../../../services/pipelinesApi';
import { URL } from '../../../services/projectsApi';
import * as actions from '../projectActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const projectId = '1';
const project = {
  uuid: projectId,
  name: 'teste',
  experimentList: [],
};

describe('components actions', () => {
  it('should create an action PROJECT_FETCH_DETAIL_STARTED', () => {
    const expectedAction = {
      type: actions.PROJECT_FETCH_DETAIL_STARTED,
    };
    expect(actions.fetchStarted()).toEqual(expectedAction);
  });

  it('should create an action PROJECT_FETCH_DETAIL', () => {
    const expectedAction = {
      type: actions.PROJECT_FETCH_DETAIL,
      detail: project,
    };
    expect(actions.setProjectDetail(project)).toEqual(expectedAction);
  });

  it('should call PROJECT_FETCH_DETAIL_STARTED and  PROJECT_FETCH_DETAIL when add component has been done', () => {
    nock(URL)
      .get(`/projects/${projectId}`)
      .reply(200, {
        payload: {
          uuid: projectId,
          name: 'teste',
        },
      })
      .get(`/projects/${projectId}/experiments`)
      .reply(200, {
        payload: [],
      });

    const expectedActions = [
      { type: actions.PROJECT_FETCH_DETAIL_STARTED },
      {
        type: actions.PROJECT_FETCH_DETAIL,
        detail: project,
      },
    ];
    const store = mockStore();
    return store.dispatch(actions.getProjectDetail(projectId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should call PROJECT_FETCH_DETAIL_STARTED and  PROJECT_FETCH_DETAIL when get project resquest error', () => {
    nock(URL)
      .get(`/projects/${projectId}`)
      .reply(400);

    const expectedActions = [
      { type: actions.PROJECT_FETCH_DETAIL_STARTED },
      {
        type: actions.PROJECT_FETCH_DETAIL,
        detail: {},
      },
    ];
    const store = mockStore();
    return store.dispatch(actions.getProjectDetail(projectId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should call PROJECT_FETCH_DETAIL_STARTED and  PROJECT_FETCH_DETAIL when get experiments resquest error', () => {
    nock(URL)
      .get(`/projects/${projectId}`)
      .reply(200)
      .get(`/projects/${projectId}/experiments`)
      .reply(400);

    const expectedActions = [
      { type: actions.PROJECT_FETCH_DETAIL_STARTED },
      {
        type: actions.PROJECT_FETCH_DETAIL,
        detail: {},
      },
    ];
    const store = mockStore();
    return store.dispatch(actions.getProjectDetail(projectId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action PROJECT_UPDATE_NAME', () => {
    const newName = 'newName';
    const expectedAction = {
      type: actions.PROJECT_UPDATE_NAME,
      name: newName,
    };
    expect(actions.setProjectName(newName)).toEqual(expectedAction);
  });

  it('should call PROJECT_UPDATE_NAME when get update name has been done', () => {
    const newName = 'newName';
    nock(URL)
      .patch(`/projects/${projectId}`)
      .reply(200);

    const expectedActions = [
      {
        type: actions.PROJECT_UPDATE_NAME,
        name: newName,
      },
    ];
    const store = mockStore();
    return store
      .dispatch(actions.updateProjectName({ uuid: projectId }, newName))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should not call PROJECT_UPDATE_NAME when get update name request error', () => {
    const newName = 'newName';
    nock(URL)
      .patch(`/projects/${projectId}`)
      .reply(400);

    const expectedActions = [];
    const store = mockStore();
    return store
      .dispatch(actions.updateProjectName({ uuid: projectId }, newName))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create an action PROJECT_GET_PIPELINES', () => {
    const expectedAction = {
      type: actions.PROJECT_GET_PIPELINES,
      flowDetail: {},
    };
    expect(actions.setFlowDetails({})).toEqual(expectedAction);
  });

  it('should call PROJECT_GET_PIPELINES when get pipeline has item default', () => {
    nock(PIPELINE_URL)
      .get(`/pipeline/apis/v1beta1/pipelines`)
      .reply(200, {
        pipelines: [
          {
            id: '4d6e0402-8217-40ef-abf7-d068d5fde06f',
            name: '[Training] Linear Regression/Logistic Regression',
          },
          {
            id: '49835c76-11da-467c-9ac8-d549e545d5e7',
            name: '[Training] AutoML',
          },
        ],
      });

    const items = {
      template: [
        {
          name: 'Regressão Linear / Regressão Lógistica',
          databaseName: 'Linear Regression/Logistic Regression',
          pipelineTrainId: null,
          pipelineDeployId: null,
          disabled: false,
          default: true,
          template: 1,
        },
        {
          name: 'Auto Machine Learning',
          databaseName: 'AutoML',
          pipelineTrainId: null,
          pipelineDeployId: null,
          disabled: false,
          default: false,
          template: 2,
        },
      ],
    };
    const expectedActions = [
      {
        type: actions.PROJECT_GET_PIPELINES,
        flowDetail: items.template[0],
      },
    ];
    const store = mockStore();
    return store.dispatch(actions.getPipelines(items)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not call PROJECT_GET_PIPELINES when get pipeline request error', () => {
    nock(PIPELINE_URL)
      .get(`/pipeline/apis/v1beta1/pipelines`)
      .reply(400);

    const items = {
      template: [
        {
          name: 'Regressão Linear / Regressão Lógistica',
          databaseName: 'Linear Regression/Logistic Regression',
          pipelineTrainId: null,
          pipelineDeployId: null,
          disabled: false,
          default: false,
          template: 1,
        },
      ],
    };
    const expectedActions = [];
    const store = mockStore();
    return store.dispatch(actions.getPipelines(items)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should call PROJECT_GET_PIPELINES when update experimenthas has been done', () => {
    const experimentId = '123';
    nock(URL)
      .patch(`/projects/${projectId}/experiments/${experimentId}`)
      .reply(200);

    const expectedActions = [
      {
        type: actions.PROJECT_GET_PIPELINES,
        flowDetail: {},
      },
    ];
    const store = mockStore();
    return store
      .dispatch(actions.updateExperiment(projectId, experimentId, {}, {}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

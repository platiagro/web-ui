import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';

import { ADD_LOADING, REMOVE_LOADING } from 'store/loading';
import deploymentRunsApi from 'services/DeploymentRunsApi';

import DEPLOYMENT_LOGS_TYPES from './actionTypes';
import { clearAllDeploymentLogs, getDeployExperimentLogs } from './actions';
import DeploymentLogsReducer, { initialState } from './deploymentLogsReducer';

describe('Deployment Logs Store', () => {
  const mockStore = configureStore([thunk]);
  const mockAxios = new MockAdapter(deploymentRunsApi.axiosInstance);

  const fakeDeploymentLogs = [{ uuid: '1' }, { uuid: '2' }, { uuid: '3' }];

  afterEach(() => {
    mockAxios.reset(); // Reset all request handlers
  });

  it('should have the prefix @DEPLOYMENT_LOGS in every action type', () => {
    const allActionTypesHavePrefix = Object.values(DEPLOYMENT_LOGS_TYPES).every(
      (actionType) => {
        return actionType.includes('@DEPLOYMENT_LOGS');
      }
    );

    expect(allActionTypesHavePrefix).toBe(true);
  });

  it('should set all deployment logs', () => {
    const action = {
      type: DEPLOYMENT_LOGS_TYPES.GET_DEPLOYMENT_LOGS,
      payload: fakeDeploymentLogs,
    };
    const newState = DeploymentLogsReducer(initialState, action);
    expect(newState).toMatchObject({ logs: fakeDeploymentLogs });
  });

  it('should clear all deployment logs', () => {
    const action = {
      type: DEPLOYMENT_LOGS_TYPES.CLEAR_ALL_DEPLOYMENT_LOGS,
    };
    const newState = DeploymentLogsReducer(
      { ...initialState, logs: fakeDeploymentLogs },
      action
    );
    expect(newState).toMatchObject({ logs: [] });
  });

  it('should clear deployment logs when the get logs request fails', () => {
    const action = {
      type: DEPLOYMENT_LOGS_TYPES.GET_DEPLOYMENT_LOGS_FAIL,
    };
    const newState = DeploymentLogsReducer(
      { ...initialState, logs: fakeDeploymentLogs },
      action
    );
    expect(newState).toMatchObject({ logs: [] });
  });

  it('should return the clear deployment logs action', () => {
    expect(clearAllDeploymentLogs()).toEqual({
      type: DEPLOYMENT_LOGS_TYPES.CLEAR_ALL_DEPLOYMENT_LOGS,
    });
  });

  it('should get logs and dispatch action to set in the state', async () => {
    const store = mockStore({});

    mockAxios.onAny().reply(200, {
      logs: fakeDeploymentLogs,
      total: fakeDeploymentLogs.length,
    });

    await store.dispatch(
      getDeployExperimentLogs('projectId', 'deploymentId', false, true)
    );

    const actions = store.getActions();

    expect(actions).toEqual(
      expect.arrayContaining([
        {
          type: ADD_LOADING,
          payload: { [DEPLOYMENT_LOGS_TYPES.GET_DEPLOYMENT_LOGS]: true },
        },
        {
          type: DEPLOYMENT_LOGS_TYPES.GET_DEPLOYMENT_LOGS,
          payload: fakeDeploymentLogs,
        },
        {
          type: REMOVE_LOADING,
          payload: [DEPLOYMENT_LOGS_TYPES.GET_DEPLOYMENT_LOGS],
        },
      ])
    );
  });

  it('should handle errors if the get deployment logs request fails', async () => {
    const store = mockStore({});

    mockAxios.onAny().reply(500, {
      message: 'The error message',
    });

    await store.dispatch(
      getDeployExperimentLogs('projectId', 'deploymentId', false, true)
    );

    const actions = store.getActions();

    expect(actions).toEqual(
      expect.arrayContaining([
        {
          type: DEPLOYMENT_LOGS_TYPES.GET_DEPLOYMENT_LOGS_FAIL,
        },
      ])
    );
  });
});

import DEPLOYMENT_LOGS_TYPES from '../actionTypes';
import DeploymentLogsReducer, { initialState } from '../deploymentLogsReducer';

describe('Deployment Logs Reducer', () => {
  const fakeDeploymentLogs = [{ uuid: '1' }, { uuid: '2' }, { uuid: '3' }];

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

  it('should do not modify the state', () => {
    const action = { type: 'A_RANDOM_TYPE' };
    const newState = DeploymentLogsReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});

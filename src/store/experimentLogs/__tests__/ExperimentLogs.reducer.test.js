import ExperimentLogsReducer, { initialState } from '../experimentLogsReducer';
import EXPERIMENT_LOGS_TYPES from '../actionTypes';

describe('Experiment Logs Actions', () => {
  const fakeLogs = [{ uuid: '1' }, { uuid: '2' }];

  it('should set logs in the state when the request was successful', () => {
    const action = {
      type: EXPERIMENT_LOGS_TYPES.GET_EXPERIMENT_LOGS_SUCCESS,
      payload: {
        logs: fakeLogs,
      },
    };

    const newState = ExperimentLogsReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      logs: fakeLogs,
    });
  });

  it('should clear all logs in the state', () => {
    const action = {
      type: EXPERIMENT_LOGS_TYPES.CLEAR_ALL_EXPERIMENT_LOGS,
    };

    const newState = ExperimentLogsReducer(
      { ...initialState, logs: fakeLogs },
      action
    );

    expect(newState.logs).toHaveLength(0);
  });

  it('should clear all logs when the get experiment logs request fails', () => {
    const action = {
      type: EXPERIMENT_LOGS_TYPES.GET_EXPERIMENT_LOGS_FAIL,
    };

    const newState = ExperimentLogsReducer(
      { ...initialState, logs: fakeLogs },
      action
    );

    expect(newState.logs).toHaveLength(0);
  });

  it('should set that is loading logs in the state', () => {
    const action = {
      type: EXPERIMENT_LOGS_TYPES.SET_IS_LOADING_LOGS,
      payload: {
        isLoading: true,
      },
    };

    const newState = ExperimentLogsReducer(initialState, action);
    expect(newState.isLoading).toBe(true);
  });
});

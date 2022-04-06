import { message } from 'antd';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';

import ExperimentRunsApi from 'services/ExperimentRunsApi';

import EXPERIMENT_LOGS_TYPES from '../actionTypes';

import {
  setIsLoadingLogs,
  getExperimentLogs,
  clearAllExperimentLogs,
  getExperimentLogsFailed,
  getExperimentLogsSucceed,
} from '../actions';

describe('Experiment Logs Actions', () => {
  const mockStore = configureStore([thunk]);
  const mockAxios = new MockAdapter(ExperimentRunsApi.axiosInstance);

  const fakeExperimentLogs = [{ uuid: '1' }, { uuid: '2' }];

  afterEach(() => {
    mockAxios.reset(); // Reset all request handlers
  });

  it('should create an action to clear all experiment logs', () => {
    expect(clearAllExperimentLogs()).toEqual({
      type: EXPERIMENT_LOGS_TYPES.CLEAR_ALL_EXPERIMENT_LOGS,
    });
  });

  it('should create an action to set the loading state', () => {
    expect(setIsLoadingLogs()).toEqual({
      type: EXPERIMENT_LOGS_TYPES.SET_IS_LOADING_LOGS,
      payload: {
        isLoading: false,
      },
    });

    expect(setIsLoadingLogs(true)).toEqual({
      type: EXPERIMENT_LOGS_TYPES.SET_IS_LOADING_LOGS,
      payload: {
        isLoading: true,
      },
    });
  });

  it('should create the get experiment logs request fail action', () => {
    expect(getExperimentLogsFailed()).toEqual({
      type: EXPERIMENT_LOGS_TYPES.GET_EXPERIMENT_LOGS_FAIL,
    });
  });

  it('should create the get experiment logs request success action', () => {
    expect(getExperimentLogsSucceed()).toEqual({
      type: EXPERIMENT_LOGS_TYPES.GET_EXPERIMENT_LOGS_SUCCESS,
      payload: {
        logs: [],
      },
    });

    expect(getExperimentLogsSucceed(fakeExperimentLogs)).toEqual({
      type: EXPERIMENT_LOGS_TYPES.GET_EXPERIMENT_LOGS_SUCCESS,
      payload: {
        logs: fakeExperimentLogs,
      },
    });
  });

  it('should create an async action to get experiment logs', async () => {
    const store = mockStore({});

    mockAxios.onAny().reply(200, {
      logs: fakeExperimentLogs,
      total: fakeExperimentLogs.length,
    });

    await store.dispatch(getExperimentLogs('projectId', 'experimentId', true));

    const actions = store.getActions();

    expect(actions).toEqual(
      expect.arrayContaining([
        {
          type: EXPERIMENT_LOGS_TYPES.SET_IS_LOADING_LOGS,
          payload: { isLoading: true },
        },
        {
          type: EXPERIMENT_LOGS_TYPES.GET_EXPERIMENT_LOGS_SUCCESS,
          payload: {
            logs: fakeExperimentLogs,
          },
        },
        {
          type: EXPERIMENT_LOGS_TYPES.SET_IS_LOADING_LOGS,
          payload: { isLoading: false },
        },
      ])
    );
  });

  it('should handle errors in the get experiment logs async action', async () => {
    const store = mockStore({});
    const messageSpy = jest.spyOn(message, 'error');

    mockAxios.onAny().reply(500, {
      message: 'The error message',
    });

    await store.dispatch(getExperimentLogs('projectId', 'experimentId', true));

    const actions = store.getActions();

    expect(actions).toEqual(
      expect.arrayContaining([
        {
          type: EXPERIMENT_LOGS_TYPES.SET_IS_LOADING_LOGS,
          payload: { isLoading: true },
        },
        {
          type: EXPERIMENT_LOGS_TYPES.GET_EXPERIMENT_LOGS_FAIL,
        },
        {
          type: EXPERIMENT_LOGS_TYPES.SET_IS_LOADING_LOGS,
          payload: { isLoading: false },
        },
      ])
    );

    expect(messageSpy).toHaveBeenCalled();
  });

  it('should create an async action to get experiment logs without loading', async () => {
    const store = mockStore({});

    mockAxios.onAny().reply(200, {
      logs: fakeExperimentLogs,
      total: fakeExperimentLogs.length,
    });

    await store.dispatch(getExperimentLogs('projectId', 'experimentId', false));

    const actions = store.getActions();

    expect(actions).toEqual(
      expect.arrayContaining([
        {
          type: EXPERIMENT_LOGS_TYPES.GET_EXPERIMENT_LOGS_SUCCESS,
          payload: {
            logs: fakeExperimentLogs,
          },
        },
        {
          type: EXPERIMENT_LOGS_TYPES.SET_IS_LOADING_LOGS,
          payload: { isLoading: false },
        },
      ])
    );
  });
});

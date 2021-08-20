import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';

import experimentRunsApi from 'services/ExperimentRunsApi';

import * as OPERATOR_TYPES from '../operator.actionTypes';
import { ADD_LOADING, REMOVE_LOADING } from 'store/loading';

import {
  getOperatorLogs,
  getLogsSuccess,
  getLogsFail,
  downloadOperatorResultDataset,
  selectOperator,
  deselectOperator,
} from '../operator.actions';

describe('Operator Action', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({});

  const experimentRunsMockAxios = new MockAdapter(
    experimentRunsApi.axiosInstance
  );

  beforeEach(() => {
    store.clearActions();
    experimentRunsMockAxios.reset();
  });

  const fakeOperatorLogs = { traceback: [{ uuid: '1' }, { uuid: '2' }] };
  const downloadDatasetFake = { columns: [1, 2, 3], data: [{ uuid: '1' }] };

  it('should create an async action to get operator logs', async () => {
    experimentRunsMockAxios.onGet().reply(200, fakeOperatorLogs);

    await store.dispatch(
      getOperatorLogs('projectId', 'experimentId', 'operatorId')
    );

    const actions = store.getActions();

    expect(actions).toEqual([
      {
        type: OPERATOR_TYPES.GET_OPERATOR_LOGS_SUCCESS,
        logs: fakeOperatorLogs.traceback,
      },
    ]);
  });

  it('should handle errors in get operator logs async action', async () => {
    experimentRunsMockAxios.onGet().reply(500, { message: 'Error Message' });
    await store.dispatch(
      getOperatorLogs('projectId', 'experimentId', 'operatorId')
    );
    const actions = store.getActions();

    expect(actions).toEqual([
      {
        type: OPERATOR_TYPES.GET_OPERATOR_LOGS_FAIL,
        logs: 'Error Message',
      },
    ]);
  });

  it('should create the operator logs success action', async () => {
    await store.dispatch(getLogsSuccess({ data: fakeOperatorLogs }));
    const actions = store.getActions();

    expect(actions).toEqual([
      {
        type: OPERATOR_TYPES.GET_OPERATOR_LOGS_SUCCESS,
        logs: fakeOperatorLogs.traceback,
      },
    ]);
  });

  it('should create the operator logs fail action', async () => {
    await store.dispatch(
      getLogsFail({ response: { data: { message: 'error message' } } })
    );
    const actions = store.getActions();

    expect(actions).toEqual([
      {
        type: OPERATOR_TYPES.GET_OPERATOR_LOGS_FAIL,
        logs: 'error message',
      },
    ]);
  });

  it('should create an async action to get download operator result dataset', async () => {
    experimentRunsMockAxios.onGet().reply(200, downloadDatasetFake);

    await store.dispatch(
      downloadOperatorResultDataset('projectId', 'experimentId', 'operatorId')
    );

    const actions = store.getActions();

    expect(actions).toEqual(
      expect.arrayContaining([
        {
          type: ADD_LOADING,
          payload: {
            [OPERATOR_TYPES.DOWNLOAD_OPERATOR_DATASET_RESULT_REQUEST]: true,
          },
        },
        {
          type: OPERATOR_TYPES.DOWNLOAD_OPERATOR_DATASET_RESULT_REQUEST,
        },
        {
          type: OPERATOR_TYPES.DOWNLOAD_OPERATOR_DATASET_RESULT_SUCCESS,
          downloadDataset: [
            [...downloadDatasetFake.columns],
            ...downloadDatasetFake.data,
          ],
        },
        {
          type: REMOVE_LOADING,
          payload: [OPERATOR_TYPES.DOWNLOAD_OPERATOR_DATASET_RESULT_REQUEST],
        },
      ])
    );
  });

  it('should handle errors in get download operator result dataset async action', async () => {
    experimentRunsMockAxios.onGet().reply(500, { message: 'error message' });

    await store.dispatch(
      downloadOperatorResultDataset('projectId', 'experimentId', 'operatorId')
    );

    const actions = store.getActions();

    expect(actions).toEqual(
      expect.arrayContaining([
        {
          type: ADD_LOADING,
          payload: {
            [OPERATOR_TYPES.DOWNLOAD_OPERATOR_DATASET_RESULT_REQUEST]: true,
          },
        },
        {
          type: OPERATOR_TYPES.DOWNLOAD_OPERATOR_DATASET_RESULT_REQUEST,
        },
        {
          type: OPERATOR_TYPES.DOWNLOAD_OPERATOR_DATASET_RESULT_FAIL,
        },
        {
          type: REMOVE_LOADING,
          payload: [OPERATOR_TYPES.DOWNLOAD_OPERATOR_DATASET_RESULT_REQUEST],
        },
      ])
    );
  });

  it('should create the select operator action', async () => {
    await store.dispatch(selectOperator({ uuid: '1', name: 'operator 1' }));
    const actions = store.getActions();

    expect(actions).toEqual([
      {
        type: OPERATOR_TYPES.SELECT_OPERATOR,
        operator: { uuid: '1', name: 'operator 1' },
      },
    ]);
  });

  it('should create the deselect operator action', async () => {
    await store.dispatch(deselectOperator());
    const actions = store.getActions();

    expect(actions).toEqual([
      {
        type: OPERATOR_TYPES.DESELECT_OPERATOR,
      },
    ]);
  });
});

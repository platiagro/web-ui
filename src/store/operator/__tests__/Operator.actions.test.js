import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';

import experimentRunsApi from 'services/ExperimentRunsApi';

import * as OPERATOR_TYPES from '../operator.actionTypes';
import { getOperatorLogs } from '../operator.actions';

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
});

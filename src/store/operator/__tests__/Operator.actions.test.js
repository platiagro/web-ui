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
    experimentRunsMockAxios.reset();
    jest.clearAllMocks();
  });

  const fakeOperator = {
    uuid: '1',
    name: 'Operator 1',
  };

  it('should run the get operator logs async action correctly', async () => {
    const successCallbackMock = jest.fn();
    experimentRunsMockAxios.onPost().reply(200, fakeOperator);
    await store.dispatch(getOperatorLogs(fakeOperator, successCallbackMock));
    const actions = store.getActions();

    expect(successCallbackMock).toBeCalledWith(fakeOperator);

    expect(actions).toEqual({
      type: OPERATOR_TYPES.GET_OPERATOR_LOGS_SUCCESS,
      logs: fakeOperator,
    });
  });

  it('should handle errors in the task creation async action', async () => {
    experimentRunsMockAxios.onPost().reply(500, { message: 'Error Message' });
    await store.dispatch(getOperatorLogs(fakeOperator));
    const actions = store.getActions();

    expect(actions).toEqual({
      type: OPERATOR_TYPES.GET_OPERATOR_LOGS_FAIL,
    });
  });
});

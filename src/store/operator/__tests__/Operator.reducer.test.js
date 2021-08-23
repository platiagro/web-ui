import * as OPERATOR_TYPES from '../operator.actionTypes';
import { operatorReducer, initialState } from '../operator.reducer';

describe('Operator Action Types', () => {
  it('should reset metrics in the state', () => {
    const action = {
      type: OPERATOR_TYPES.GET_OPERATOR_METRICS_REQUEST,
      metrics: [],
    };

    const newState = operatorReducer(
      { ...initialState, metrics: [{ uuid: '1' }] },
      action
    );
    expect(newState.metrics).toEqual(action.metrics);
  });

  it('should change selected operator in the state', () => {
    const action = {
      type: OPERATOR_TYPES.SELECT_OPERATOR,
      operator: {
        selected: true,
      },
    };

    const newState = operatorReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...action.operator,
    });
  });

  it('should clear selected operator in the state', () => {
    const action = {
      type: OPERATOR_TYPES.DESELECT_OPERATOR,
    };

    const newState = operatorReducer(
      {
        ...initialState,
        operator: {
          selected: true,
        },
      },
      action
    );

    expect(newState).toEqual(initialState);
  });

  it('should update operator in the state', () => {
    const action = {
      type: OPERATOR_TYPES.UPDATE_OPERATOR_SUCCESS,
      payload: {
        operators: [],
        operator: {
          name: 'name 1',
          uuid: '1',
        },
      },
    };

    const newState = operatorReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...action.payload.operator });
  });

  it('should update download dataset array in the state', () => {
    const action = {
      type: OPERATOR_TYPES.DOWNLOAD_OPERATOR_DATASET_RESULT_SUCCESS,
      downloadDataset: [{ uuid: '1' }],
    };

    const newState = operatorReducer(initialState, action);
    expect(newState.downloadDataset).toEqual(action.downloadDataset);
  });

  it('should update dataset in the state', () => {
    const action = {
      type: OPERATOR_TYPES.GET_OPERATOR_DATASET_RESULT_SUCCESS,
      result: { uuid: '1' },
    };

    const newState = operatorReducer(initialState, action);
    expect(newState.dataset).toEqual(action.result);
  });

  it('should update figures in the state', () => {
    const action = {
      type: OPERATOR_TYPES.GET_OPERATOR_FIGURES_SUCCESS,
      results: [{ uuid: '1' }],
    };

    const newState = operatorReducer(initialState, action);
    expect(newState.figures).toEqual(action.results);
  });

  it('should update metrics in the state', () => {
    const action = {
      type: OPERATOR_TYPES.GET_OPERATOR_METRICS_SUCCESS,
      metrics: [{ uuid: '1' }],
    };

    const newState = operatorReducer(initialState, action);
    expect(newState.metrics).toEqual(action.metrics);
  });

  it('should update logs in the state', () => {
    const action = {
      type: OPERATOR_TYPES.GET_OPERATOR_LOGS_SUCCESS,
      logs: [{ uuid: '1' }],
    };

    const newState = operatorReducer(initialState, action);
    expect(newState.logs).toEqual(action.logs);
  });

  it('should clear dataset in the state', () => {
    const action = {
      type: OPERATOR_TYPES.GET_OPERATOR_DATASET_RESULT_FAIL,
    };

    const newState = operatorReducer(
      { ...initialState, dataset: { uuid: '1' } },
      action
    );
    expect(newState.dataset).toEqual(initialState.dataset);
  });

  it('should clear figures in the state', () => {
    const action = {
      type: OPERATOR_TYPES.GET_OPERATOR_FIGURES_FAIL,
    };

    const newState = operatorReducer(
      { ...initialState, figures: { uuid: '1' } },
      action
    );
    expect(newState.figures).toEqual(initialState.figures);
  });

  it('should clear metrics in the state', () => {
    const action = {
      type: OPERATOR_TYPES.GET_OPERATOR_METRICS_FAIL,
    };

    const newState = operatorReducer(
      { ...initialState, metrics: { uuid: '1' } },
      action
    );
    expect(newState.metrics).toEqual([]);
  });

  it('should clear logs in the state', () => {
    const action = {
      type: OPERATOR_TYPES.GET_OPERATOR_LOGS_FAIL,
      logs: [],
    };

    const newState = operatorReducer(
      { ...initialState, logs: { uuid: '1' } },
      action
    );
    expect(newState.logs).toEqual(action.logs);
  });

  it('should update name for experiment in the state', () => {
    const action = {
      type: OPERATOR_TYPES.RENAME_EXPERIMENT_OPERATOR_SUCCESS,
      newName: 'new experiment name 1',
    };

    const newState = operatorReducer(initialState, action);
    expect(newState.name).toEqual(action.newName);
  });

  it('should update name for deployment in the state', () => {
    const action = {
      type: OPERATOR_TYPES.RENAME_DEPLOYMENT_OPERATOR_SUCCESS,
      newName: 'new deployment name 1',
    };

    const newState = operatorReducer(initialState, action);
    expect(newState.name).toEqual(action.newName);
  });
});

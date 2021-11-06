import * as PREDICTION_TYPES from '../prediction.actionTypes';
import { predictionReducer, initialState } from '../prediction.reducer';

describe('Prediction Action Types', () => {
  it('should reset predictionId, predictionResult and status in the state', () => {
    const action = {
      type: PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_REQUEST,
    };

    const newState = predictionReducer(
      {
        ...initialState,
        predictionId: 'predictionId',
        predictionResult: {},
        status: 'success',
      },
      action
    );
    expect(newState).toEqual({
      ...initialState,
      predictionId: null,
      predictionResult: null,
      status: null,
    });
  });

  it('should set predictionId and status in the state', () => {
    const action = {
      type: PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_SUCCESS,
      payload: {
        predictionId: 'predictionId',
        status: 'success',
      },
    };

    const newState = predictionReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      predictionId: action.payload.predictionId,
      status: action.payload.status,
    });
  });

  it('should reset the predictionId, predictionResult and status in the state when create request fails', () => {
    const action = {
      type: PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_FAIL,
    };

    const newState = predictionReducer(
      {
        ...initialState,
        predictionId: 'predictionId',
        status: 'started',
      },
      action
    );
    expect(newState).toEqual({
      ...initialState,
      predictionId: null,
      predictionResult: null,
      status: 'failed',
    });
  });

  it('should set predictionResult and status in the state', () => {
    const action = {
      type: PREDICTION_TYPES.FETCH_PREDICTION_SUCCESS,
      payload: {
        predictionResult: { ndarray: [1, 2, 3], names: ['a', 'b', 'c'] },
        status: 'success',
      },
    };

    const newState = predictionReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      predictionResult: action.payload.predictionResult,
      status: action.payload.status,
    });
  });

  it('should keep the state as it is', () => {
    const action = {
      type: PREDICTION_TYPES.FETCH_PREDICTION_FAIL,
    };

    const newState = predictionReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
    });
  });
});

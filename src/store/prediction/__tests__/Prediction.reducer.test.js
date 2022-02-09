import { PREDICTION_STATUS } from 'configs';

import * as PREDICTION_TYPES from '../prediction.actionTypes';
import { predictionReducer, initialState } from '../prediction.reducer';

describe('Prediction Reducer', () => {
  const projectId = 'projectId';
  const deploymentId = 'deploymentId';
  const predictionId = 'predictionId';
  const predictionKey = `${projectId}/${deploymentId}`;

  const runningPrediction = {
    status: PREDICTION_STATUS.STARTED,
    dataset: 'dataset',
    predictionId,
  };

  const predictionResult = {
    status: PREDICTION_STATUS.DONE,
    predictionData: {},
    predictionId,
  };

  it('should create a prediction', () => {
    const action = {
      type: PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_SUCCESS,
      payload: {
        projectId,
        deploymentId,
        predictionId,
        dataset: 'dataset',
        status: PREDICTION_STATUS.STARTED,
      },
    };

    const newState = predictionReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      running: {
        [predictionKey]: runningPrediction,
      },
    });
  });

  it('should set the prediction result in the state', () => {
    const action = {
      type: PREDICTION_TYPES.FETCH_PREDICTION_SUCCESS,
      payload: {
        projectId,
        deploymentId,
        predictionId,
        predictionData: {},
        status: PREDICTION_STATUS.DONE,
      },
    };

    const newState = predictionReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      results: {
        [predictionKey]: predictionResult,
      },
    });
  });

  it('should keep the state as it is', () => {
    const action = { type: 'UNKNOWN' };
    const newState = predictionReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});

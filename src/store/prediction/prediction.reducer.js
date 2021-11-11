import * as PREDICTION_TYPES from './prediction.actionTypes';

export const initialState = {
  dataset: null,
  deploymentId: null,
  predictionId: null,
  predictionResult: null,
  status: null,
};

export const predictionReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_REQUEST:
    case PREDICTION_TYPES.INTERRUPT_PREDICTION: {
      return {
        ...state,
        predictionId: null,
        predictionResult: null,
        status: null,
      };
    }

    case PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_SUCCESS: {
      return {
        ...state,
        predictionId: payload.predictionId,
        status: payload.status,
      };
    }

    case PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_FAIL: {
      return {
        ...state,
        predictionId: null,
        predictionResult: null,
        status: 'failed',
      };
    }

    case PREDICTION_TYPES.FETCH_PREDICTION_SUCCESS: {
      return {
        ...state,
        predictionResult: payload.predictionResult,
        status: payload.status,
      };
    }

    default:
      return state;
  }
};

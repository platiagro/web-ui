import * as TEST_DEPLOYMENT_TYPES from './testDeployment.actionTypes';

const initialState = {
  file: null,
  dataset: null,
  deployId: null,
  inferenceResult: null,
};

export const testDeploymentReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case TEST_DEPLOYMENT_TYPES.TEST_DEPLOYMENT_WITH_DATASET_SUCCESS:
    case TEST_DEPLOYMENT_TYPES.TEST_DEPLOYMENT_WITH_FILE_SUCCESS: {
      return {
        ...state,
        inferenceResult: payload.inferenceResult,
      };
    }

    case TEST_DEPLOYMENT_TYPES.TEST_DEPLOYMENT_WITH_FILE_FAIL: {
      return {
        ...state,
        deployId: payload.deployId,
        file: payload.file,
        inferenceResult: null,
      };
    }

    case TEST_DEPLOYMENT_TYPES.TEST_DEPLOYMENT_WITH_DATASET_FAIL: {
      return {
        ...state,
        dataset: payload.dataset,
      };
    }

    default:
      return state;
  }
};

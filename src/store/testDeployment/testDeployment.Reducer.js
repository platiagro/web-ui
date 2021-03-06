import * as TEST_DEPLOYMENT_TYPES from './testDeployment.actionTypes';

const initialState = {
  file: null,
  dataset: null,
  deploymentId: null,
  testResult: null,
};

export const testDeploymentReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case TEST_DEPLOYMENT_TYPES.TEST_DEPLOYMENT_WITH_DATASET_SUCCESS:
    case TEST_DEPLOYMENT_TYPES.TEST_DEPLOYMENT_WITH_FILE_SUCCESS: {
      return {
        ...state,
        testResult: payload.testResult,
      };
    }

    case TEST_DEPLOYMENT_TYPES.TEST_DEPLOYMENT_WITH_FILE_FAIL: {
      return {
        ...state,
        deploymentId: payload.deploymentId,
        file: payload.file,
        testResult: null,
      };
    }

    case TEST_DEPLOYMENT_TYPES.TEST_DEPLOYMENT_WITH_DATASET_FAIL: {
      return {
        ...state,
        dataset: payload.dataset,
        testResult: null,
      };
    }

    default:
      return state;
  }
};

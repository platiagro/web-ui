// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = [];

/**
 * test experiment inference reducer
 */
const testExperimentInference = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TEST_IMPLANTED_EXPERIMENT_INFERENCE:
      return action.inferenceResult;
    default:
      return state;
  }
};

// EXPORT
export default testExperimentInference;

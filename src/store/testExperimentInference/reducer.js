// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = { names: [], ndarray: [] };

/**
 * test experiment inference reducer
 */
const testExperimentInference = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TEST_IMPLANTED_EXPERIMENT_INFERENCE:
      return { ...state, ...action.inferenceResult };
    case actionTypes.TEST_IMPLANTED_EXPERIMENT_INFERENCE_FAILS:
      return initialState;
    default:
      return state;
  }
};

// EXPORT
export default testExperimentInference;

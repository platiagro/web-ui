// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = { deployId: null, file: null, inferenceResult: null };

/**
 * test experiment inference reducer
 */
const testExperimentInferenceReducer = (
  state = initialState,
  action = undefined
) => {
  switch (action.type) {
    case actionTypes.TEST_IMPLANTED_EXPERIMENT_INFERENCE:
      return {
        ...state,
        inferenceResult: action.inferenceResult,
      };
    case actionTypes.TEST_IMPLANTED_EXPERIMENT_INFERENCE_FAILS:
      return {
        ...state,
        deployId: action.deployId,
        file: action.file,
        inferenceResult: null,
      };
    default:
      return state;
  }
};

// EXPORT
export default testExperimentInferenceReducer;

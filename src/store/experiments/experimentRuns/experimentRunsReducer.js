// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = [];

/**
 * experiment runs reducer
 *
 * @param state
 * @param action
 */
const experimentRunsReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    // SUCCESS
    // experiment runs
    case actionTypes.FETCH_EXPERIMENT_RUNS_SUCCESS:
      return [...action.runs];
    case actionTypes.CREATE_EXPERIMENT_RUN_SUCCESS:
      return [...state, {runId: action.runId}];
    case actionTypes.DELETE_EXPERIMENT_RUN_SUCCESS:
      return [...action.runs];
    
    // FAIL
    // experiment runs
    case actionTypes.FETCH_EXPERIMENT_RUNS_FAIL:
      return [...state];
    case actionTypes.CREATE_EXPERIMENT_RUN_FAIL:
      return [...state];
    case actionTypes.DELETE_EXPERIMENT_RUN_FAIL:
      return [...state];

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default experimentRunsReducer;

// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = [];

/**
 * deployment runs reducer
 *
 * @param state
 * @param action
 */
const deploymentRunsReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    // SUCCESS
    // deployment runs
    case actionTypes.FETCH_DEPLOYMENT_RUNS_SUCCESS:
      return [...action.deploymentRuns];
    case actionTypes.CREATE_DEPLOYMENT_RUN_SUCCESS:
      return [...state, {runId: action.runId}];
    
    // FAIL
    // deployment runs

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default deploymentRunsReducer;
import actionTypes from './actionTypes';

const initialState = [];

const deploymentRunsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.FETCH_DEPLOYMENT_RUNS_SUCCESS:
      return [...action.deploymentRuns];

    case actionTypes.CREATE_DEPLOYMENT_RUN_SUCCESS:
      return [...state, { runId: action.runId }];

    default:
      return state;
  }
};

export default deploymentRunsReducer;

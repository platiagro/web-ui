import * as DEPLOYMENTS_RUNS_TYPES from './deploymentRuns.actionTypes';

const initialState = [];

export const deploymentRunsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case DEPLOYMENTS_RUNS_TYPES.FETCH_DEPLOYMENT_RUNS_SUCCESS:
      return [...action.deploymentRuns];

    case DEPLOYMENTS_RUNS_TYPES.CREATE_DEPLOYMENT_RUN_SUCCESS:
      return [...state, { runId: action.runId }];

    default:
      return state;
  }
};

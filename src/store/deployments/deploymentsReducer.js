// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = [];

const deploymentsReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case actionTypes.DELETE_DEPLOYED_EXPERIMENT:
      return state.filter((deployment) => {
        return deployment.experimentId !== action.experimentId;
      });
    case actionTypes.FETCH_DEPLOYED_EXPERIMENTS:
      return [...action.deployments];
    case actionTypes.FETCH_DEPLOYMENTS_SUCCESS:
      return [...action.deployments];
    case actionTypes.FETCH_DEPLOYMENTS_FAIL:
      return [];
    default:
      return state;
  }
};

// EXPORT
export default deploymentsReducer;

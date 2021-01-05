// ACTION TYPES
import actionTypes from './actionTypes';

import utils from 'utils';

// INITIAL STATE
const initialState = [];

const projectDeploymentsReducer = (
  state = initialState,
  action = undefined
) => {
  switch (action.type) {
    case actionTypes.CREATE_DEPLOYMENT_SUCCESS:
      return [...state, action.deployment];
    case actionTypes.DELETE_DEPLOYMENT_SUCCESS:
      return [...utils.deleteExperiment(state, action.deploymentId)];
    case actionTypes.FETCH_DEPLOYMENT_SUCCESS:
      return [...action.deployments];
    case actionTypes.UPDATE_DEPLOYMENT_POSITION_SUCCESS:
      return [
        ...utils.organizeExperiments(state, action.dragId, action.hoverId),
      ];
    default:
      return state;
  }
};

// EXPORT
export default projectDeploymentsReducer;

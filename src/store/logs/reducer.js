// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  logs: '',
};

/**
 * pipelines reducer
 */
const deploymentLogs = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DEPLOYMENT_LOGS:
      return { ...state, logs: action.payload };
    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default deploymentLogs;

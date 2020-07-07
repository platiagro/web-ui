// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  logs: [],
};

/**
 * deployment logs reducer
 */
const deploymentLogsReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case actionTypes.GET_DEPLOYMENT_LOGS:
      return { ...state, logs: action.payload };
    case actionTypes.GET_DEPLOYMENT_LOGS_FAIL:
      return { ...state, logs: [] };
    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default deploymentLogsReducer;

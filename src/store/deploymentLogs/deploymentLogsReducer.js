import actionTypes from './actionTypes';

const initialState = {
  logs: [],
};

const deploymentLogsReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case actionTypes.GET_DEPLOYMENT_LOGS: {
      return { ...state, logs: action.payload };
    }

    case actionTypes.CLEAR_ALL_DEPLOYMENT_LOGS:
    case actionTypes.GET_DEPLOYMENT_LOGS_FAIL: {
      return { ...state, logs: [] };
    }

    default:
      return state;
  }
};

export default deploymentLogsReducer;

import actionTypes from './actionTypes';

export const initialState = {
  logs: [],
  isLoading: false,
};

const experimentLogsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_EXPERIMENT_LOGS_SUCCESS:
      return { ...state, logs: action.payload.logs };

    case actionTypes.CLEAR_ALL_EXPERIMENT_LOGS:
    case actionTypes.GET_EXPERIMENT_LOGS_FAIL:
      return { ...state, logs: [] };

    case actionTypes.SET_IS_LOADING_LOGS:
      return { ...state, isLoading: action.payload.isLoading };

    default:
      return state;
  }
};

export default experimentLogsReducer;

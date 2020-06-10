// ACTION TYPES
import actionTypes from './actionTypes';

// UI LIBS
import { message } from 'antd';

// INITIAL STATE
const initialState = [];

/**
 * implanted experiments reducer
 */
const implantedExperiments = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_IMPLANTED_EXPERIMENTS:
      return action.implantedExperiments;
    case actionTypes.FETCH_IMPLANTED_EXPERIMENTS_FAIL:
      message.error(action.errorMessage);
      return [];
    default:
      return state;
  }
};

// EXPORT
export default implantedExperiments;

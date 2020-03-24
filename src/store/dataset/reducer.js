// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  columns: [],
};

/**
 * dataset reducer
 */
const dataset = (state = initialState, action) => {
  switch (action.type) {
    // SUCCESS
    // dataset
    case actionTypes.FETCH_COLUMNS_SUCCESS:
      return { ...state, columns: [...action.columns] };

    // FAIL
    // experiment
    case actionTypes.FETCH_COLUMNS_FAIL:
      return message.error(action.errorMessage);

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default dataset;

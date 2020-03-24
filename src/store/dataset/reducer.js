// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  filename: '',
  name: '',
  columns: [],
};

/**
 * dataset reducer
 */
const dataset = (state = initialState, action) => {
  switch (action.type) {
    // SUCCESS
    // dataset
    // fetch dataset columns success
    case actionTypes.FETCH_DATASET_COLUMNS_SUCCESS:
      return { ...state, columns: [...action.columns] };
    // create dataset success
    case actionTypes.CREATE_DATASET_SUCCESS:
      return { ...action.dataset };

    // FAIL
    // dataset
    // fetch dataset columns fail
    case actionTypes.FETCH_DATASET_COLUMNS_FAIL:
      return message.error(action.errorMessage);
    // create dataset fail
    case actionTypes.CREATE_DATASET_FAIL:
      return message.error(action.errorMessage);

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default dataset;

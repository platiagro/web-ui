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
    // update dataset column success
    case actionTypes.UPDATE_DATASET_COLUMN_SUCCESS:
      return {
        ...state,
        columns: [
          ...state.columns.map((column) =>
            column.name === action.column.name ? action.column : column
          ),
        ],
      };
    // create dataset success
    case actionTypes.CREATE_DATASET_SUCCESS:
      return { ...action.dataset };

    // FAIL
    case actionTypes.CREATE_DATASET_FAIL:
    case actionTypes.FETCH_DATASET_COLUMNS_FAIL:
    case actionTypes.UPDATE_DATASET_COLUMN_FAIL:
      message.error(action.errorMessage, 5);
      return state;

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default dataset;

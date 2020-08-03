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
 *
 * @param state
 * @param action
 */
const datasetReducer = (state = initialState, action = undefined) => {
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
      message.success('Dados de entrada importados', 5);
      return { ...action.dataset };

    // FAIL
    case actionTypes.CREATE_DATASET_FAIL:
    case actionTypes.FETCH_DATASET_COLUMNS_FAIL:
    case actionTypes.UPDATE_DATASET_COLUMN_FAIL:
      message.error(action.errorMessage, 5);
      return state;

    // CANCEL
    // create dataset cancel
    case actionTypes.CREATE_DATASET_CANCEL:
      message.success(action.successMessage, 5);
      return state;

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default datasetReducer;

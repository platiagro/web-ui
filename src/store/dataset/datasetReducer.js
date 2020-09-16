// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  filename: '',
  name: '',
  columns: [],
  observationsCount: 5000, // TODO: conectar a api
  featuretypes: '',
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
      return { ...state, ...action.payload };

    // FAIL
    case actionTypes.CREATE_DATASET_FAIL:
    case actionTypes.FETCH_DATASET_COLUMNS_FAIL:
    case actionTypes.UPDATE_DATASET_COLUMN_FAIL:
    case actionTypes.DELETE_DATASET_FAIL:
    case actionTypes.GET_DATASET_FAIL:
      message.error(action.errorMessage, 5);
      return state;

    // CANCEL
    // create dataset cancel
    case actionTypes.CREATE_DATASET_CANCEL:
      message.success(action.successMessage, 5);
      return state;

    // get dataset filename
    case actionTypes.GET_DATASET_SUCCESS:
    case actionTypes.DELETE_DATASET_SUCCESS:
      return {
        ...state,
        ...action.payload,
        status: null,
      };

    case actionTypes.SET_GOOGLE_DATASET_STATUS:
      return {
        ...state,
        filename: action.fileName,
        status: action.status,
      };

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default datasetReducer;

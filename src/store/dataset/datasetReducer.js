// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  filename: '',
  name: '',
  progress: 0,
  file: null,
  status: null,
  isUploading: false,
  cancelToken: null,
  columns: [],
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
    //update all columns
    case actionTypes.UPDATE_ALL_DATASET_COLUMNS_SUCCESS:
      return {
        ...state,
        columns: action.payload,
      };
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
      return { ...state, ...action.payload };

    // FAIL
    case actionTypes.CREATE_DATASET_FAIL:
    case actionTypes.FETCH_DATASET_COLUMNS_FAIL:
    case actionTypes.UPDATE_DATASET_COLUMN_FAIL:
    case actionTypes.DELETE_DATASET_FAIL:
    case actionTypes.GET_DATASET_FAIL:
    case actionTypes.UPDATE_ALL_DATASET_COLUMNS_FAIL:
      return { ...state };

    // CANCEL
    // create dataset cancel
    case actionTypes.CREATE_DATASET_CANCEL:
      return { ...state, ...action.payload };

    // get dataset filename
    case actionTypes.GET_DATASET_SUCCESS:
    case actionTypes.DELETE_DATASET_SUCCESS:
      return {
        ...state,
        ...action.payload,
        status: null,
      };

    case actionTypes.FETCH_PAGINATED_DATASET:
      return {
        ...state,
        data: action.data,
        currentPage: action.currentPage,
        pageSize: action.pageSize,
        total: action.total,
      };
    case actionTypes.SET_GOOGLE_DATASET_STATUS:
      return {
        ...state,
        filename: action.fileName,
        status: action.status,
      };

    // create dataset success
    case actionTypes.CREATE_DATASET_REQUEST:
      return {
        ...state,
        file: action.file,
        filename: action.file.name,
        isUploading: true,
        status: 'uploading',
        progress: 0,
        cancelToken: action.cancelToken,
      };

    // create dataset success
    case actionTypes.UPDATE_DATASET_UPLOAD:
      return { ...state, progress: action.progress };

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default datasetReducer;

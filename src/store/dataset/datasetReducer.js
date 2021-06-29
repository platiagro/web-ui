import actionTypes from './actionTypes';

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
  pageSize: 0,
  total: 0,
};

/**
 * Dataset reducer
 *
 * @param {object} state State
 * @param {object} action Action
 * @returns {object} state
 */
const datasetReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case actionTypes.UPDATE_ALL_DATASET_COLUMNS_SUCCESS:
      return {
        ...state,
        columns: action.payload,
      };

    case actionTypes.FETCH_DATASET_COLUMNS_SUCCESS:
      return { ...state, columns: [...action.columns] };

    case actionTypes.UPDATE_DATASET_COLUMN_SUCCESS:
      return {
        ...state,
        columns: [
          ...state.columns.map((column) =>
            column.name === action.column.name ? action.column : column
          ),
        ],
      };

    case actionTypes.CREATE_DATASET_SUCCESS:
      return { ...state, ...action.payload };

    case actionTypes.CREATE_DATASET_CANCEL:
      return { ...state, ...action.payload };

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

    case actionTypes.UPDATE_DATASET_UPLOAD:
      return { ...state, progress: action.progress };

    default:
      return state;
  }
};

export default datasetReducer;

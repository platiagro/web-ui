// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import datasetsApi from '../../services/DatasetsApi';

// EXPERIMENT ACTIONS
import { setDatasetRequest } from '../experiment/actions';

// UI ACTIONS
import {
  datasetOperatorDataLoaded,
  datasetOperatorLoadingData,
} from '../ui/actions';

// ACTIONS
// ** FETCH DATASET COLUMNS
/**
 * fetch dataset columns success action
 *
 * @param {object} response
 * @returns {object} { type, columns }
 */
const fetchDatasetColumnsSuccess = (response) => (dispatch) => {
  // getting dataset columns from response
  const columns = response.data;

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  // dispatching fetch dataset columns success
  dispatch({
    type: actionTypes.FETCH_DATASET_COLUMNS_SUCCESS,
    columns,
  });
};

/**
 * fetch dataset columns fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const fetchDatasetColumnsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  // dispatching fetch dataset columns fail
  dispatch({
    type: actionTypes.FETCH_DATASET_COLUMNS_FAIL,
    errorMessage,
  });
};

/**
 * fetch dataset columns request action
 *
 * @param datasetName
 * @returns {Function}
 */
export const fetchDatasetColumnsRequest = (datasetName) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_DATASET_COLUMNS_REQUEST,
  });

  // dispatching dataset operator loading data action
  dispatch(datasetOperatorLoadingData());

  if (datasetName)
    // fetching dataset columns
    datasetsApi
      .listDatasetColumns(datasetName)
      .then((response) => dispatch(fetchDatasetColumnsSuccess(response)))
      .catch((error) => dispatch(fetchDatasetColumnsFail(error)));
  else dispatch(fetchDatasetColumnsSuccess({ data: [] }));
};

// // // // // // // // // //

// ** DATASET UPLOAD
/**
 * Cancel dataset upload action
 *
 * @returns {Function} Dispatch function
 */
export const cancelDatasetUpload = () => (dispatch) => {
  const successMessage = 'Dados de entrada removidos.';

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  // dispatching create dataset fail
  dispatch({
    type: actionTypes.CREATE_DATASET_CANCEL,
    successMessage,
  });
};

/**
 * Dataset upload success action
 *
 * @param {object} dataset Response dataset object
 * @param {string} projectId Current Project id
 * @param {string} experimentId Current Experiment id
 * @returns {Function} Dispatch function
 */
export const datasetUploadSuccess = (dataset, projectId, experimentId) => (
  dispatch
) => {
  // default success message
  const successMessage = 'Dados de entrada importados.';

  dispatch(setDatasetRequest(projectId, experimentId, dataset.name));

  dispatch({
    type: actionTypes.CREATE_DATASET_SUCCESS,
    dataset,
    successMessage,
  });
};

/**
 * Dataset upload fail action
 *
 * @returns {Function} Dispatch function
 */
export const datasetUploadFail = () => (dispatch) => {
  const errorMessage = 'Ocorreu um erro no processamento do arquivo.';

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  // dispatching create dataset fail
  dispatch({
    type: actionTypes.CREATE_DATASET_FAIL,
    errorMessage,
  });
};

/**
 * Start dataset upload action
 *
 * @returns {Function} Dispatch function
 */
export const startDatasetUpload = () => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.CREATE_DATASET_REQUEST,
  });

  // dispatching dataset operator loading data action
  dispatch(datasetOperatorLoadingData());
};

// // // // // // // // // //

// ** UPDATE DATASET COLUMN
/**
 * update dataset column success action
 *
 * @param {object} response
 * @returns {object} { type, column }
 */
const updateDatasetColumnSuccess = (response) => (dispatch) => {
  // getting column from response
  const column = response.data;

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  // dispatching update dataset column success
  dispatch({
    type: actionTypes.UPDATE_DATASET_COLUMN_SUCCESS,
    column,
  });
};

/**
 * update dataset column fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const updateDatasetColumnFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  // dispatching update dataset column fail
  dispatch({
    type: actionTypes.UPDATE_DATASET_COLUMN_FAIL,
    errorMessage,
  });
};

/**
 * update dataset column request action
 *
 * @param {string} datasetName
 * @param {string} columnName
 * @param {string} columnNewType
 * @returns {Function}
 */
export const updateDatasetColumnRequest = (
  datasetName,
  columnName,
  columnNewType
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.UPDATE_DATASET_COLUMN_REQUEST,
  });

  // dispatching dataset operator loading data action
  dispatch(datasetOperatorLoadingData());

  // updating dataset columns
  datasetsApi
    .updateDatasetColumn(datasetName, columnName, columnNewType)
    .then((response) => dispatch(updateDatasetColumnSuccess(response)))
    .catch((error) => dispatch(updateDatasetColumnFail(error)));
};

// // // // // // // // // //

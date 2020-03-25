// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import datasetsApi from '../../services/DatasetsApi';

// EXPERIMENT ACTIONS
import { setDatasetRequest } from '../experiment/actions';

// ACTIONS
// ** FETCH DATASET COLUMNS
/**
 * fetch dataset columns success action
 * @param {Object} response
 * @returns {Object} { type, columns }
 */
const fetchDatasetColumnsSuccess = (response) => {
  // getting dataset columns from response
  const columns = response.data;

  return {
    type: actionTypes.FETCH_DATASET_COLUMNS_SUCCESS,
    columns,
  };
};

/**
 * fetch dataset columns fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const fetchDatasetColumnsFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.FETCH_DATASET_COLUMNS_FAIL,
    errorMessage,
  };
};

/**
 * fetch dataset columns request action
 * @returns {Function}
 */
export const fetchDatasetColumnsRequest = (datasetName) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_DATASET_COLUMNS_REQUEST,
  });

  if (datasetName)
    // fetching dataset columns
    datasetsApi
      .listDatasetColumns(datasetName)
      .then((response) => dispatch(fetchDatasetColumnsSuccess(response)))
      .catch((error) => dispatch(fetchDatasetColumnsFail(error)));
  else dispatch(fetchDatasetColumnsSuccess({ data: [] }));
};

// // // // // // // // // //

// ** CREATE DATASET
/**
 * create dataset success action
 * @param {Object} response
 * @returns {Object} { type, dataset }
 */
const createDatasetSuccess = (response, projectId, experimentId) => (
  dispatch
) => {
  // getting dataset from response
  const dataset = response.data;

  dispatch(setDatasetRequest(projectId, experimentId, dataset.name));

  dispatch({
    type: actionTypes.CREATE_DATASET_SUCCESS,
    dataset,
  });
};

/**
 * create dataset fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const createDatasetFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.CREATE_DATASET_FAIL,
    errorMessage,
  };
};

/**
 * create dataset request action
 * @param {Object} formData form data object with files
 * @returns {Function}
 */
export const createDatasetRequest = (formData, projectId, experimentId) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.CREATE_DATASET_REQUEST,
  });

  // createing dataset columns
  datasetsApi
    .createDataset(formData)
    .then((response) =>
      dispatch(createDatasetSuccess(response, projectId, experimentId))
    )
    .catch((error) => dispatch(createDatasetFail(error)));
};

// // // // // // // // // //

// ** UPDATE DATASET COLUMN
/**
 * update dataset column success action
 * @param {Object} response
 * @returns {Object} { type, column }
 */
const updateDatasetColumnSuccess = (response) => {
  // getting column from response
  const column = response.data;

  return {
    type: actionTypes.UPDATE_DATASET_COLUMN_SUCCESS,
    column,
  };
};

/**
 * update dataset column fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const updateDatasetColumnFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.UPDATE_DATASET_COLUMN_FAIL,
    errorMessage,
  };
};

/**
 * update dataset column request action
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

  // updating dataset columns
  datasetsApi
    .updateDatasetColumn(datasetName, columnName, columnNewType)
    .then((response) => dispatch(updateDatasetColumnSuccess(response)))
    .catch((error) => dispatch(updateDatasetColumnFail(error)));
};

// // // // // // // // // //

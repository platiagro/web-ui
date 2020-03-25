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

// ACTIONS
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

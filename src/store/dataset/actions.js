// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import datasetsApi from '../../services/DatasetsApi';

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
// eslint-disable-next-line import/prefer-default-export
export const fetchDatasetColumnsRequest = (datasetName) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_DATASET_COLUMNS_REQUEST,
  });

  // fetching dataset columns
  datasetsApi
    .listDatasetColumns(datasetName)
    .then((response) => dispatch(fetchDatasetColumnsSuccess(response)))
    .catch((error) => dispatch(fetchDatasetColumnsFail(error)));
};

// // // // // // // // // //

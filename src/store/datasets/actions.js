// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import datasetsApi from 'services/DatasetsApi';

// UI ACTIONS
import { addLoading, removeLoading } from 'store/loading';

// ACTIONS
// ** FETCH DATASETS
/**
 * fetch datasets success action
 *
 * @param {object} response Response
 * @returns {object} {type, experiments}
 */
const fetchDatasetsSuccess = (response) => (dispatch) => {
  // getting datasets from response
  const datasets = response.data;

  // dispatching fetch experiments success action
  dispatch({
    type: actionTypes.FETCH_DATASETS_SUCCESS,
    datasets,
  });
};

/**
 * fetch datasets fail action
 *
 * @param {object} error Error
 * @returns {object} { type, errorMessage }
 */
const fetchDatasetsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching fetch experiments fail action
  dispatch({
    type: actionTypes.FETCH_DATASETS_FAIL,
    errorMessage,
  });

  message.error(errorMessage);
};

/**
 * fetch datasets request action
 *
 * @returns {Function} Dispatch function
 */
export const fetchDatasetsRequest = () => (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_DATASETS_REQUEST,
  });

  dispatch(addLoading(actionTypes.FETCH_DATASETS_REQUEST));

  datasetsApi
    .listDatasets()
    .then((response) => dispatch(fetchDatasetsSuccess(response)))
    .catch((error) => {
      // allow to fail silently for 404
      if (error.response.status !== 404) {
        dispatch(fetchDatasetsFail(error));
      }
    })
    .finally(() => {
      dispatch(removeLoading(actionTypes.FETCH_DATASETS_REQUEST));
    });
};

/**
 * clear all datasets action
 *
 * @returns {Function} Dispatch function
 */
export const clearAllDatasets = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_ALL_DATASETS,
  });
};

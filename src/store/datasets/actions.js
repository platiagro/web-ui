// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import datasetsApi from '../../services/DatasetsApi';

// UI ACTIONS
import { fetchDatasetsListLoadingData, fetchDatasetsListDataLoaded } from '../ui/actions';

// ACTIONS
// ** FETCH DATASETS
/**
 * fetch datasets success action
 *
 * @param {object} response
 * @returns {object} {type, experiments}
 */
const fetchDatasetsSuccess = (response) => (dispatch) => {
  // getting datasets from response
  const datasets = response.data;

  dispatch(fetchDatasetsListDataLoaded());

  // dispatching fetch experiments success action
  dispatch({
    type: actionTypes.FETCH_DATASETS_SUCCESS,
    datasets,
  });
};

/**
 * fetch datasets fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const fetchDatasetsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  dispatch(fetchDatasetsListDataLoaded());

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
 * @param {string} projectId
 * @returns {Function}
 */
export const fetchDatasetsRequest = () => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_DATASETS_REQUEST,
  });

  // dispatching datasets list loading data action
  dispatch(fetchDatasetsListLoadingData());

  // fetching datasets
  datasetsApi
    .listDatasets()
    .then((response) => dispatch(fetchDatasetsSuccess(response)))
    .catch((error) => dispatch(fetchDatasetsFail(error)));
};

/**
 * clear all datasets action
 *
 * @returns {Function}
 */
export const clearAllDatasets = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_ALL_DATASETS,
  });
};

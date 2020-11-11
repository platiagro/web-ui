// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import experimentsApi from '../../services/ExperimentsApi';

// UI ACTIONS
import {
  fetchExperimentsTabsDataLoaded,
  fetchExperimentsTabsLoadingData,
} from '../ui/actions';

// ACTIONS
// ** FETCH EXPERIMENTS
/**
 * fetch experiments success action
 *
 * @param {object} response
 * @returns {object} { type, experiments }
 */
const fetchExperimentsSuccess = (response) => (dispatch) => {
  // getting experiments from response
  const experiments = response.data;

  // dispatching experiments tabs data loaded action
  dispatch(fetchExperimentsTabsDataLoaded());

  // dispatching fetch experiments success action
  dispatch({
    type: actionTypes.FETCH_EXPERIMENTS_SUCCESS,
    experiments,
  });
};

/**
 * fetch experiments fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const fetchExperimentsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiments tabs data loaded action
  dispatch(fetchExperimentsTabsDataLoaded());

  // dispatching fetch experiments fail action
  dispatch({
    type: actionTypes.FETCH_EXPERIMENTS_FAIL,
    errorMessage,
  });

  message.error(errorMessage);
};

/**
 * fetch experiments request action
 *
 * @param {string} projectId
 * @returns {Function}
 */
export const fetchExperimentsRequest = (projectId) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_EXPERIMENTS_REQUEST,
  });

  // dispatching experiments tabs loading data action
  dispatch(fetchExperimentsTabsLoadingData());

  // fetching experiments
  experimentsApi
    .listExperiments(projectId)
    .then((response) => dispatch(fetchExperimentsSuccess(response)))
    .catch((error) => dispatch(fetchExperimentsFail(error)));
};

/**
 * clear all experiments action
 *
 * @returns {Function}
 */
export const clearAllExperiments = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_ALL_EXPERIMENTS,
  });
};

// // // // // // // // // //

// ** ORGANIZE EXPERIMENTS
/**
 * organize experiments success action
 *
 * @param {object} response
 * @param dragExperimentId
 * @param hoverExperimentId
 * @param dragExperimentId
 * @param hoverExperimentId
 * @returns {object} { type, dragExperimentId, hoverExperimentId }
 */
const organizeExperimentsSuccess = (dragExperimentId, hoverExperimentId) => (
  dispatch
) => {
  // dispatching experiments tabs data loaded action
  dispatch(fetchExperimentsTabsDataLoaded());

  // dispatching organize experiments success action
  dispatch({
    type: actionTypes.ORGANIZE_EXPERIMENTS_SUCCESS,
    dragExperimentId,
    hoverExperimentId,
  });
};

/**
 * organize experiments fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const organizeExperimentsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiments tabs data loaded action
  dispatch(fetchExperimentsTabsDataLoaded());

  // dispatching organize experiments fail action
  dispatch({
    type: actionTypes.ORGANIZE_EXPERIMENTS_FAIL,
    errorMessage,
  });

  message.error(errorMessage);
};

/**
 * organize experiments request action
 *
 * @param {string} projectId
 * @param {string} dragExperimentId
 * @param {string} hoverExperimentId
 * @param newPosition
 * @returns {Function}
 */
export const organizeExperimentsRequest = (
  projectId,
  dragExperimentId,
  hoverExperimentId,
  newPosition
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.ORGANIZE_EXPERIMENTS_REQUEST,
  });

  // dispatching experiments tabs loading data action
  dispatch(fetchExperimentsTabsLoadingData());

  // constructing experiment object
  const experiment = { position: newPosition };

  // organizeing experiments
  experimentsApi
    .updateExperiment(projectId, dragExperimentId, experiment)
    .then(() =>
      dispatch(organizeExperimentsSuccess(dragExperimentId, hoverExperimentId))
    )
    .catch((error) => dispatch(organizeExperimentsFail(error)));
};

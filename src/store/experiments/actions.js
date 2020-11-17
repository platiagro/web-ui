// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import experimentsApi from '../../services/ExperimentsApi';

// UI ACTIONS
import {
  experimentsTabsDataLoaded,
  experimentsTabsLoadingData,
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
  dispatch(experimentsTabsDataLoaded());

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
  dispatch(experimentsTabsDataLoaded());

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
  dispatch(experimentsTabsLoadingData());

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

// ** UPDATE EXPERIMENT POSITION
/**
 * update experiment position success action
 *
 * @param {object} response
 * @param dragExperimentId
 * @param hoverExperimentId
 * @param dragExperimentId
 * @param hoverExperimentId
 * @returns {object} { type, dragExperimentId, hoverExperimentId }
 */
const updateExperimentPositionSuccess = (
  dragExperimentId,
  hoverExperimentId
) => (dispatch) => {
  // dispatching experiments tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  // dispatching organize experiments success action
  dispatch({
    type: actionTypes.UPDATE_EXPERIMENT_POSITION_SUCCESS,
    dragExperimentId,
    hoverExperimentId,
  });
};

/**
 * update experiment position fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const updateExperimentPositionFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiments tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  // dispatching update experiment position fail action
  dispatch({
    type: actionTypes.UPDATE_EXPERIMENT_POSITION_FAIL,
    errorMessage,
  });

  message.error(errorMessage);
};

/**
 * update experiments position request action
 *
 * @param {string} projectId
 * @param {string} dragExperimentId
 * @param {string} hoverExperimentId
 * @param newPosition
 * @returns {Function}
 */
export const updateExperimentPositionRequest = (
  projectId,
  dragExperimentId,
  hoverExperimentId,
  newPosition
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.UPDATE_EXPERIMENT_POSITION_REQUEST,
  });

  // dispatching experiments tabs loading data action
  dispatch(experimentsTabsLoadingData());

  // constructing experiment object
  const experiment = { position: newPosition };

  // organizeing experiments
  experimentsApi
    .updateExperiment(projectId, dragExperimentId, experiment)
    .then(() =>
      dispatch(
        updateExperimentPositionSuccess(dragExperimentId, hoverExperimentId)
      )
    )
    .catch((error) => dispatch(updateExperimentPositionFail(error)));
};

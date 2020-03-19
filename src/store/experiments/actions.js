// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import experimentsApi from '../../services/ExperimentsApi';

// ACTIONS
// ** FETCH EXPERIMENTS
/**
 * fetch experiments success action
 * @param {Object} response
 * @returns {Object} { type, experiments }
 */
const fetchExperimentsSuccess = (response) => {
  // getting experiments from response
  const experiments = response.data;

  return {
    type: actionTypes.FETCH_EXPERIMENTS_SUCCESS,
    experiments,
  };
};

/**
 * fetch experiments fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const fetchExperimentsFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.FETCH_EXPERIMENTS_FAIL,
    errorMessage,
  };
};

/**
 * fetch experiments request action
 * @param {string} projectId
 * @returns {Function}
 */
export const fetchExperimentsRequest = (projectId) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_EXPERIMENTS_REQUEST,
  });

  // fetching experiments
  experimentsApi
    .listExperiments(projectId)
    .then((response) => dispatch(fetchExperimentsSuccess(response)))
    .catch((error) => dispatch(fetchExperimentsFail(error)));
};

// // // // // // // // // //

// ** ORGANIZE EXPERIMENTS
/**
 * organize experiments success action
 * @param {Object} response
 * @returns {Object} { type, dragExperimentId, hoverExperimentId }
 */
const organizeExperimentsSuccess = (dragExperimentId, hoverExperimentId) => {
  return {
    type: actionTypes.ORGANIZE_EXPERIMENTS_SUCCESS,
    dragExperimentId,
    hoverExperimentId,
  };
};

/**
 * organize experiments fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const organizeExperimentsFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.ORGANIZE_EXPERIMENTS_FAIL,
    errorMessage,
  };
};

/**
 * organize experiments request action
 * @param {string} projectId
 * @param {string} dragExperimentId
 * @param {string} hoverExperimentId
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

  // constructing experiment object
  const experiment = { position: newPosition };

  // organizeing experiments
  experimentsApi
    .updateExperiment(projectId, dragExperimentId, experiment)
    .then((response) =>
      dispatch(organizeExperimentsSuccess(dragExperimentId, hoverExperimentId))
    )
    .catch((error) => dispatch(organizeExperimentsFail(error)));
};

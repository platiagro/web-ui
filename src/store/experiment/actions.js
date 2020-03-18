// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import experimentsApi from '../../services/ExperimentsApi';

// ACTIONS
// ** FETCH EXPERIMENT
/**
 * fetch experiment success action
 * @param {Object} response
 * @returns {Object} { type, experiment }
 */
const fetchExperimentSuccess = (response) => {
  // getting experiment from response
  const experiment = response.data;

  return {
    type: actionTypes.FETCH_EXPERIMENT_SUCCESS,
    experiment,
  };
};

/**
 * fetch experiment fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const fetchExperimentFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.FETCH_EXPERIMENT_FAIL,
    errorMessage,
  };
};

/**
 * fetch experiment request action
 * @param {string} projectId
 * @param {string} experimentId
 * @returns {Function}
 */
export const fetchExperimentRequest = (projectId, experimentId) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_EXPERIMENT_REQUEST,
  });

  // fetching experiment
  experimentsApi
    .detailExperiment(projectId, experimentId)
    .then((response) => dispatch(fetchExperimentSuccess(response)))
    .catch((error) => dispatch(fetchExperimentFail(error)));
};

// // // // // // // // // //

/**
 * edit experiment name action
 * @param {string} uuid
 * @param {string} newName
 * @returns {type, experiment}
 */
export const editExperimentName = (uuid, newName) => ({
  type: actionTypes.EDIT_EXPERIMENT_NAME,
  experiment: {}, // { ...experimentMock, title: newName },
});

/**
 * train experiment action
 * @param {string} uuid
 * @returns {type, experiment}
 */
export const trainExperiment = (uuid) => ({
  type: actionTypes.TRAIN_EXPERIMENT,
  experiment: {}, // { ...experimentMock, running: true },
});

/**
 * deploy experiment name action
 * @param {string} uuid
 * @returns {type, experiment}
 */
export const deployExperiment = (uuid) => ({
  type: actionTypes.DEPLOY_EXPERIMENT,
  experiment: {}, // { ...experimentMock, deployed: true },
});

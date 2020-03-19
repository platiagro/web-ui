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

// ** CREATE EXPERIMENT
/**
 * create experiment success action
 * @param {Object} response
 * @param {string} projectId
 * @param {Object} routerProps
 * @returns {Object} { type, experiment }
 */
const createExperimentSuccess = (response, projectId, routerProps) => {
  // getting experiment from response
  const experiment = response.data;

  // go to new experiment
  routerProps.history.push(`/projetos/${projectId}/${experiment.uuid}`);

  return {
    type: actionTypes.CREATE_EXPERIMENT_SUCCESS,
    experiment,
  };
};

/**
 * create experiment fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const createExperimentFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.CREATE_EXPERIMENT_FAIL,
    errorMessage,
  };
};

/**
 * create experiment request action
 * @param {string} projectId
 * @param {string} experimentName
 * @param {Object} routerProps
 * @returns {Function}
 */
export const createExperimentRequest = (
  projectId,
  experimentName,
  routerProps
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.CREATE_EXPERIMENT_REQUEST,
  });

  // creating experiment
  experimentsApi
    .createExperiment(projectId, experimentName)
    .then((response) =>
      dispatch(createExperimentSuccess(response, projectId, routerProps))
    )
    .catch((error) => dispatch(createExperimentFail(error)));
};

// // // // // // // // // //

// ** EDIT EXPERIMENT NAME
/**
 * edit experiment name success action
 * @param {Object} response
 * @returns {Object} { type, experiment }
 */
const editExperimentNameSuccess = (response) => {
  // getting experiment from response
  const experiment = response.data;

  return {
    type: actionTypes.EDIT_EXPERIMENT_NAME_SUCCESS,
    experiment,
  };
};

/**
 * edit experiment name fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const editExperimentNameFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.EDIT_EXPERIMENT_NAME_FAIL,
    errorMessage,
  };
};

/**
 * edit experiment name request action
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} experiment
 * @returns {Function}
 */
export const editExperimentNameRequest = (projectId, experimentId, newName) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.EDIT_EXPERIMENT_NAME_REQUEST,
  });

  // creating experiment object
  const experiment = { name: newName };

  // creating experiment
  experimentsApi
    .updateExperiment(projectId, experimentId, experiment)
    .then((response) => dispatch(editExperimentNameSuccess(response)))
    .catch((error) => dispatch(editExperimentNameFail(error)));
};

// // // // // // // // // //

// ** DELETE EXPERIMENT
/**
 * delete experiment success action
 * @param {string} projectId
 * @param {string} experimentId
 * @param {Object} routerProps
 * @returns {Object} { type }
 */
const deleteExperimentSuccess = (projectId, experimentId, routerProps) => {
  // go to project
  routerProps.history.push(`/projetos/${projectId}`);

  return {
    type: actionTypes.DELETE_EXPERIMENT_SUCCESS,
    experimentId,
  };
};

/**
 * delete experiment fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const deleteExperimentFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.DELETE_EXPERIMENT_FAIL,
    errorMessage,
  };
};

/**
 * delete experiment request action
 * @param {string} projectId
 * @param {string} experimentId
 * @param {Object} routerProps
 * @returns {Function}
 */
export const deleteExperimentRequest = (
  projectId,
  experimentId,
  routerProps
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.DELETE_EXPERIMENT_REQUEST,
  });

  // deleting experiment
  experimentsApi
    .deleteExperiment(projectId, experimentId)
    .then(() =>
      dispatch(deleteExperimentSuccess(projectId, experimentId, routerProps))
    )
    .catch((error) => dispatch(deleteExperimentFail(error)));
};

// // // // // // // // // //

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

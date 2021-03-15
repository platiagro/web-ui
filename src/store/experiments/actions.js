// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import experimentsApi from '../../services/ExperimentsApi';

// UI ACTIONS
import {
  hideNewExperimentModal,
  experimentsTabsDataLoaded,
  experimentsTabsLoadingData,
  experimentNameDataLoaded,
  experimentNameLoadingData,
  experimentOperatorsDataLoaded,
  experimentOperatorsLoadingData,
} from '../ui/actions';

// OPERATORS ACTIONS
import { fetchOperatorsRequest } from '../operators/actions';

// UTILS
import utils from '../../utils';

// MESSAGES
const ALREADY_EXIST_MESSAGE = 'Já existe um experimento com este nome!';

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
  const experiments = response.data.experiments;

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
const fetchExperimentsRequest = (projectId) => (dispatch) => {
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

// // // // // // // // // //

// ** CREATE EXPERIMENT
/**
 * create experiment success action
 *
 * @param {object} response
 * @param {string} projectId
 * @param {object} routerProps
 * @returns {object} { type, experiment }
 */
const createExperimentSuccess = (response, projectId, routerProps) => (
  dispatch
) => {
  // getting experiment from response
  const experiment = response.data;

  // dispatching hide new experiment modal action
  dispatch(hideNewExperimentModal());

  // dispatching experiments tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  // dispatching experiment name data loaded action
  dispatch(experimentNameDataLoaded());

  // fetching operators
  dispatch(fetchOperatorsRequest(projectId, experiment.uuid));

  // dispatching experiment success
  dispatch({
    type: actionTypes.CREATE_EXPERIMENT_SUCCESS,
    experiment,
  });

  message.success(`Experimento ${experiment.name} criado!`);

  // go to new experiment
  routerProps.history.push(
    `/projetos/${projectId}/experimentos/${experiment.uuid}`
  );
};

/**
 * create experiment fail action
 *
 * @param {object} error
 * @param {string} duplicate
 * @returns {object} { type, errorMessage }
 */
const createExperimentFail = (error, duplicate) => (dispatch) => {
  // dispatching experiments tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  // dispatching experiment name data loaded action
  dispatch(experimentNameDataLoaded());

  // getting error message
  let errorMessage;
  if (error.response.status === 500) {
    errorMessage = error.message;
    message.error(errorMessage, 5);
  } else {
    errorMessage = error.response.data.message;
    if (errorMessage.includes('name already exist') && !duplicate) {
      errorMessage = ALREADY_EXIST_MESSAGE;
      dispatch({
        type: actionTypes.CREATE_EXPERIMENT_FAIL,
        errorMessage,
      });
    } else if (errorMessage.includes('name already exist') && duplicate) {
      errorMessage = ALREADY_EXIST_MESSAGE;
      dispatch({ type: actionTypes.DUPLICATE_EXPERIMENT_FAIL, errorMessage });
      message.error(errorMessage, 5);
    } else {
      message.error(errorMessage, 5);
    }
  }
};

/**
 * create experiment request action
 *
 * @param {string} projectId
 * @param {string} experimentName
 * @param {string} copyFrom
 * @param {string} duplicate
 * @param {object} routerProps
 * @returns {Function}
 */
const createExperimentRequest = (
  projectId,
  experimentName,
  copyFrom,
  duplicate,
  routerProps
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.CREATE_EXPERIMENT_REQUEST,
  });

  // dispatching experiments tabs loading data action
  dispatch(experimentsTabsLoadingData());

  // dispatching experiment name loading data action
  dispatch(experimentNameLoadingData());

  // creating experiment
  experimentsApi
    .createExperiment(projectId, experimentName, copyFrom)
    .then((response) =>
      dispatch(createExperimentSuccess(response, projectId, routerProps))
    )
    .catch((error) => dispatch(createExperimentFail(error, duplicate)));
};

// // // // // // // // // //

// ** UPDATE EXPERIMENT
/**
 * update experiment success action
 *
 * @param {object} response
 * @returns {object} { type, experiments }
 */
const updateExperimentSuccess = (response) => (dispatch, getState) => {
  const updatedExperiment = response.data;

  // dispatching experiments tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  // dispatching experiment name data loaded action
  dispatch(experimentNameDataLoaded());

  const currentState = getState();
  const experimentsState = currentState.experimentsReducer;

  const experiments = experimentsState.map((experiment) => {
    return experiment.uuid !== updatedExperiment.uuid
      ? experiment
      : { ...experiment, ...updatedExperiment };
  });

  // dispatching update experiment success
  dispatch({
    type: actionTypes.UPDATE_EXPERIMENT_SUCCESS,
    experiments,
  });
};

/**
 * update experiment fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const updateExperimentFail = (error) => (dispatch) => {
  // dispatching experiments tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  // getting error message
  let errorMessage;
  if (error.response.status === 500) {
    errorMessage = error.message;
  } else {
    errorMessage = error.response.data.message;
    if (errorMessage.includes('name already exist')) {
      errorMessage = 'Já existe um experimento com este nome!';
    }
  }
  message.error(errorMessage, 5);

  // dispatching update experiment fail
  dispatch({
    type: actionTypes.UPDATE_EXPERIMENT_FAIL,
  });
};

/**
 * update experiment request action
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {object} experimentUpdated
 * @returns {Function}
 */
const updateExperimentRequest = (
  projectId,
  experimentId,
  experimentUpdated
) => (dispatch) => {
  // dispatching experiments tabs loading data action
  dispatch(experimentsTabsLoadingData());

  // creating experiment
  experimentsApi
    .updateExperiment(projectId, experimentId, experimentUpdated)
    .then((response) => dispatch(updateExperimentSuccess(response)))
    .catch((error) => dispatch(updateExperimentFail(error)));
};

/**
 * edit experiment name action
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @param {string} newName Experiment new name
 * @returns {Function}
 */
const updateExperimentName = (projectId, experimentId, newName) => (
  dispatch
) => {
  // dispatching experiment name loading data action
  dispatch(experimentNameLoadingData());

  // creating experiment object
  const experiment = { name: newName };

  dispatch(updateExperimentRequest(projectId, experimentId, experiment));
};

/**
 * active experiment action
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @returns {Function}
 */
const activeExperiment = (projectId, experimentId) => (dispatch) => {

  // dispatching experiment name loading data action
  dispatch(experimentNameLoadingData());

  // constant
  const experiment = { isActive: true };

  dispatch(updateExperimentRequest(projectId, experimentId, experiment));
};

// // // // // // // // // //

// ** DELETE EXPERIMENT
/**
 * delete experiment success action
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {object} routerProps
 * @returns {object} { type, experiments }
 */
const deleteExperimentSuccess = (projectId, experimentId, routerProps) => (
  dispatch,
  getState
) => {
  // dispatching experiments tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  // dispatching experiment name data loaded action
  dispatch(experimentNameDataLoaded());

  // dispatching experiment operators data loaded action
  dispatch(experimentOperatorsDataLoaded());

  // get current state
  const currentState = getState();
  const experimentsState = currentState.experimentsReducer;
  // get list of experiments without the deleted one
  const experiments = utils.deleteExperiment(experimentsState, experimentId);

  // dispatching delete experiment success
  dispatch({
    type: actionTypes.DELETE_EXPERIMENT_SUCCESS,
    experiments,
  });

  message.success(`Experimento excluído!`);
  routerProps.history.push(`/projetos/${projectId}/experimentos`);
};

/**
 * delete experiment fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const deleteExperimentFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiments tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  // dispatching experiment name data loaded action
  dispatch(experimentNameDataLoaded());

  // dispatching experiment operators data loaded action
  dispatch(experimentOperatorsDataLoaded());

  // dispatching delete experiment fail
  dispatch({
    type: actionTypes.DELETE_EXPERIMENT_FAIL,
    errorMessage,
  });

  message.error(errorMessage, 5);
};

/**
 * delete experiment request action
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {object} routerProps
 * @returns {Function}
 */
const deleteExperimentRequest = (projectId, experimentId, routerProps) => (
  dispatch
) => {
  // dispatching experiments tabs loading data action
  dispatch(experimentsTabsLoadingData());

  // dispatching experiment name loading data action
  dispatch(experimentNameLoadingData());

  // dispatching experiment operators loading data action
  dispatch(experimentOperatorsLoadingData());

  // deleting experiment
  experimentsApi
    .deleteExperiment(projectId, experimentId)
    .then(() =>
      dispatch(deleteExperimentSuccess(projectId, experimentId, routerProps))
    )
    .catch((error) => dispatch(deleteExperimentFail(error)));
};

// // // // // // // // // //

// ** ORGANIZE EXPERIMENTS
/**
 * organize experiments success action
 *
 * @param {object} response
 * @param {string} dragExperimentId
 * @param {string} hoverExperimentId
 * @returns {object} { type, experiments }
 */
const organizeExperimentsSuccess = (dragExperimentId, hoverExperimentId) => (
  dispatch,
  getState
) => {
  // dispatching experiments tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  const currentState = getState();
  const experimentsState = currentState.experimentsReducer;

  const experiments = utils.organizeExperiments(
    experimentsState,
    dragExperimentId,
    hoverExperimentId
  );

  // dispatching organize experiments success action
  dispatch({
    type: actionTypes.ORGANIZE_EXPERIMENTS_SUCCESS,
    experiments,
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
  dispatch(experimentsTabsDataLoaded());

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
const organizeExperimentsRequest = (
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
  dispatch(experimentsTabsLoadingData());

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

/**
 * clear all experiments action
 *
 * @returns {Function}
 */
const clearAllExperiments = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_ALL_EXPERIMENTS,
  });
};

export default {
  fetchExperimentsRequest,
  createExperimentRequest,
  updateExperimentRequest,
  updateExperimentName,
  activeExperiment,
  deleteExperimentRequest,
  organizeExperimentsRequest,
  clearAllExperiments,
};

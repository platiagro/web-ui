// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global ExperimentCreatable, ExperimentUpdatable */

import * as EXPERIMENTS_TYPES from './experiments.actionTypes';

import experimentsApi from 'services/ExperimentsApi';

import { hideNewExperimentModal } from 'store/ui/actions';

import { fetchOperatorsRequest } from 'store/operators/actions';

import { fetchExperimentRunStatusRequest } from './experimentRuns/actions';

import { showError, showSuccess } from 'store/message';

import { addLoading, removeLoading } from 'store/loading';

import utils from 'utils';

const ALREADY_EXIST_MESSAGE = 'Já existe um experimento com este nome!';

/**
 * fetch experiments success action
 *
 * @param {object} response Request response
 * @returns {Function} Dispatch
 */
const fetchExperimentsSuccess = (response) => (dispatch) => {
  const experiments = response.data.experiments;

  dispatch({
    type: EXPERIMENTS_TYPES.FETCH_EXPERIMENTS_SUCCESS,
    payload: { experiments },
  });

  dispatch(removeLoading(EXPERIMENTS_TYPES.FETCH_EXPERIMENTS_REQUEST));
};

/**
 * Fetch experiments fail action
 *
 * @param {object} error Error object
 * @returns {Function} Dispatch
 */
const fetchExperimentsFail = (error) => (dispatch) => {
  const errorMessage = error.message;

  dispatch(removeLoading(EXPERIMENTS_TYPES.FETCH_EXPERIMENTS_REQUEST));

  dispatch({
    type: EXPERIMENTS_TYPES.FETCH_EXPERIMENTS_FAIL,
    payload: { errorMessage },
  });

  dispatch(showError(errorMessage));
};

/**
 * Fetch experiments request action
 *
 * @param {string} projectId Project id
 * @returns {Function} Dispatch
 */
export const fetchExperimentsRequest = (projectId) => async (dispatch) => {
  const actionType = EXPERIMENTS_TYPES.FETCH_EXPERIMENTS_REQUEST;

  dispatch({
    type: actionType,
  });

  dispatch(addLoading(actionType));

  try {
    const response = await experimentsApi.listExperiments(projectId);

    dispatch(fetchExperimentsSuccess(response));
  } catch (error) {
    dispatch(fetchExperimentsFail(error));
  }
};

/**
 * create experiment success action
 *
 * @param {object} response Request response
 * @param {string} projectId Project id
 * @param {object} history Router history object
 * @returns {Function} Dispatch
 */
const createExperimentSuccess = (response, projectId, history) => (
  dispatch
) => {
  const experiment = response.data;

  dispatch(hideNewExperimentModal());

  dispatch(fetchOperatorsRequest(projectId, experiment.uuid));

  dispatch({
    type: EXPERIMENTS_TYPES.CREATE_EXPERIMENT_SUCCESS,
    payload: { experiment },
  });

  dispatch(removeLoading(EXPERIMENTS_TYPES.CREATE_EXPERIMENT_REQUEST));

  // go to new experiment
  history.push(`/projetos/${projectId}/experimentos/${experiment.uuid}`);

  dispatch(showSuccess(`Experimento ${experiment.name} criado!`));
};

/**
 * Create experiment fail action
 *
 * @param {object} error Error object
 * @param {boolean} duplicate Duplicating experiment
 * @returns {Function} Dispatch
 */
const createExperimentFail = (error, duplicate) => (dispatch) => {
  let errorMessage;
  let actionType;

  if (error?.response.status === 500) {
    errorMessage = error.message;
  } else {
    errorMessage = error.response.data.message;

    if (errorMessage.includes('name already exist')) {
      errorMessage = ALREADY_EXIST_MESSAGE;
      if (!duplicate) {
        actionType = EXPERIMENTS_TYPES.CREATE_EXPERIMENT_FAIL;
      } else {
        actionType = EXPERIMENTS_TYPES.DUPLICATE_EXPERIMENT_FAIL;
      }
    }
  }

  dispatch({
    type: actionType,
    payload: { errorMessage },
  });

  dispatch(showError(errorMessage));
};

/**
 * Create experiment request action
 *
 * @param {string} projectId Project id
 * @param {ExperimentCreatable} experiment Experiment
 * @param {boolean} duplicate Duplicating experiment
 * @param {object} history Router history
 * @returns {Function} Dispatch
 */
export const createExperimentRequest = (
  projectId,
  experiment,
  duplicate,
  history
) => async (dispatch) => {
  const actionType = EXPERIMENTS_TYPES.CREATE_EXPERIMENT_REQUEST;

  dispatch({
    type: actionType,
  });

  dispatch(addLoading(actionType));

  try {
    const response = await experimentsApi.createExperiment(
      projectId,
      experiment
    );

    dispatch(createExperimentSuccess(response, projectId, history));
  } catch (error) {
    dispatch(createExperimentFail(error, duplicate));
  }
};

/**
 * Update experiment success action
 *
 * @param {object} response Request response
 * @returns {Function} Dispatch
 */
const updateExperimentSuccess = (response) => (dispatch, getState) => {
  const updatedExperiment = response.data;

  const currentState = getState();
  const experimentsState = currentState.experimentsReducer;

  const experiments = experimentsState.map((experiment) => {
    return experiment.uuid !== updatedExperiment.uuid
      ? experiment
      : { ...experiment, ...updatedExperiment };
  });

  dispatch({
    type: EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_SUCCESS,
    payload: { experiments },
  });

  dispatch(removeLoading(EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_REQUEST));
};

/**
 * Update experiment fail action
 *
 * @param {object} error Error object
 * @returns {Function} Dispatch
 */
const updateExperimentFail = (error) => (dispatch) => {
  let errorMessage;

  if (error.response.status === 500) {
    errorMessage = error.message;
  } else {
    errorMessage = error.response.data.message;
    if (errorMessage.includes('name already exist')) {
      errorMessage = 'Já existe um experimento com este nome!';
    }
  }

  dispatch(removeLoading(EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_REQUEST));

  dispatch(showError(errorMessage, 5));

  dispatch({
    type: EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_FAIL,
  });
};

/**
 * Update experiment request action
 *
 * @param {string} projectId Project id
 * @param {string} experimentId Experiment id
 * @param {ExperimentUpdatable} experimentUpdate Experiment update
 * @returns {Function} Dispatch
 */
export const updateExperimentRequest = (
  projectId,
  experimentId,
  experimentUpdate
) => async (dispatch) => {
  const actionType = EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_REQUEST;

  dispatch({
    type: actionType,
  });

  dispatch(addLoading(actionType));

  try {
    const response = await experimentsApi.updateExperiment(
      projectId,
      experimentId,
      experimentUpdate
    );

    dispatch(updateExperimentSuccess(response));
  } catch (error) {
    dispatch(updateExperimentFail(error));
  }
};

/**
 * Delete experiment success action
 *
 * @param {string} projectId Project id
 * @param {string} experimentId Experiment id
 * @param {object} history Router history object
 * @returns {Function} Dispatch
 */
const deleteExperimentSuccess = (projectId, experimentId, history) => (
  dispatch,
  getState
) => {
  const currentState = getState();

  const experimentsState = currentState.experimentsReducer;

  // get list of experiments without the deleted one
  const experiments = utils.deleteExperiment(experimentsState, experimentId);

  dispatch({
    type: EXPERIMENTS_TYPES.DELETE_EXPERIMENT_SUCCESS,
    payload: { experiments },
  });

  dispatch(removeLoading(EXPERIMENTS_TYPES.DELETE_EXPERIMENT_REQUEST));

  dispatch(showSuccess(`Experimento excluído!`));

  history.push(`/projetos/${projectId}/experimentos`);
};

/**
 * Delete experiment fail action
 *
 * @param {object} error Error object
 * @returns {Function}  Dispatch
 */
const deleteExperimentFail = (error) => (dispatch) => {
  const errorMessage = error.message;

  dispatch({
    type: EXPERIMENTS_TYPES.DELETE_EXPERIMENT_FAIL,
    payload: { errorMessage },
  });

  dispatch(removeLoading(EXPERIMENTS_TYPES.DELETE_EXPERIMENT_REQUEST));

  dispatch(showError(errorMessage, 5));
};

/**
 * Delete experiment request action
 *
 * @param {string} projectId Project id
 * @param {string} experimentId Experiment id
 * @param {object} history Router history object
 * @returns {Function} Dispatch
 */
export const deleteExperimentRequest = (
  projectId,
  experimentId,
  history
) => async (dispatch) => {
  const actionType = EXPERIMENTS_TYPES.DELETE_EXPERIMENT_REQUEST;

  dispatch({
    type: actionType,
  });

  dispatch(addLoading(actionType));

  try {
    await experimentsApi.deleteExperiment(projectId, experimentId);

    dispatch(deleteExperimentSuccess(projectId, experimentId, history));
  } catch (error) {
    dispatch(deleteExperimentFail(error));
  }
};

/**
 * Organize experiments success action
 *
 * @param {string} dragExperimentId Drag experiment id
 * @param {string} hoverExperimentId hover experiment id
 * @returns {Function} Dispatch
 */
const organizeExperimentsSuccess = (dragExperimentId, hoverExperimentId) => (
  dispatch,
  getState
) => {
  const currentState = getState();
  const experimentsState = currentState.experimentsReducer;

  const experiments = utils.organizeExperiments(
    experimentsState,
    dragExperimentId,
    hoverExperimentId
  );

  dispatch({
    type: EXPERIMENTS_TYPES.ORGANIZE_EXPERIMENTS_SUCCESS,
    payload: { experiments },
  });

  dispatch(removeLoading(EXPERIMENTS_TYPES.ORGANIZE_EXPERIMENTS_REQUEST));
};

/**
 * Organize experiments fail action
 *
 * @param {object} error Error object
 * @returns {Function} Dispatch
 */
const organizeExperimentsFail = (error) => (dispatch) => {
  const errorMessage = error.message;

  // dispatching organize experiments fail action
  dispatch({
    type: EXPERIMENTS_TYPES.ORGANIZE_EXPERIMENTS_FAIL,
    payload: { errorMessage },
  });

  dispatch(removeLoading(EXPERIMENTS_TYPES.ORGANIZE_EXPERIMENTS_REQUEST));

  dispatch(showError(errorMessage));
};

/**
 * Organize experiments request action
 *
 * @param {string} projectId Project id
 * @param {string} dragExperimentId Drag experiment id
 * @param {string} hoverExperimentId Hover experiment id
 * @param {number} newPosition New experiment position
 * @returns {Function} Dispatch
 */
export const organizeExperimentsRequest = (
  projectId,
  dragExperimentId,
  hoverExperimentId,
  newPosition
) => async (dispatch) => {
  const actionType = EXPERIMENTS_TYPES.ORGANIZE_EXPERIMENTS_REQUEST;

  dispatch({
    type: actionType,
  });

  dispatch(addLoading(actionType));

  const experiment = { position: newPosition };

  try {
    await experimentsApi.updateExperiment(
      projectId,
      dragExperimentId,
      experiment
    );

    dispatch(organizeExperimentsSuccess(dragExperimentId, hoverExperimentId));
  } catch (error) {
    dispatch(organizeExperimentsFail(error));
  }
};

/**
 * Clear all experiments action
 *
 * @returns {Function} Dispatch
 */
export const clearAllExperiments = () => (dispatch) => {
  dispatch({
    type: EXPERIMENTS_TYPES.CLEAR_ALL_EXPERIMENTS,
  });
};

/**
 * Active experiment action
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @returns {Function} Dispatch
 */
export const activeExperiment = (projectId, experimentId) => (dispatch) => {
  const experiment = { isActive: true };

  dispatch({ type: EXPERIMENTS_TYPES.ACTIVE_EXPERIMENT });

  dispatch(fetchExperimentRunStatusRequest(projectId, experimentId));

  dispatch(updateExperimentRequest(projectId, experimentId, experiment));
};

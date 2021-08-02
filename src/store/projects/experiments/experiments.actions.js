// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global Experiments, ExperimentCreatable, ExperimentUpdatable */

import * as EXPERIMENTS_TYPES from './experiments.actionTypes';

import experimentsApi from 'services/ExperimentsApi';

import { hideNewExperimentModal } from 'store/ui/actions';
import { fetchExperimentOperatorsRequest } from 'store/operators';
import { fetchExperimentRunStatusRequest } from './experimentRuns/actions';

import { getProjects } from 'store/projects/projects.selectors';
import { getExperiments } from './experiments.selectors';

import { showError, showSuccess } from 'store/message';
import { addLoading, removeLoading } from 'store/loading';

import utils from 'utils';

const ALREADY_EXIST_MESSAGE = 'Já existe um experimento com este nome!';

// TODO: Remover actions de success e de fail e utilizar actions default
/**
 * Experiments success default action
 *
 * @param {object} successObject Success action default object
 * @param {Experiments} successObject.experiments New experiments state
 * @param {string} successObject.requestActionType Action type request, used in loading
 * @param {string} successObject.successActionType Action type success
 * @param {string=} successObject.message Success message
 * @param {Function} successObject.callback Success function callback
 * @returns {Function} Thunk action
 */
const experimentsActionSuccess =
  ({
    experiments,
    requestActionType,
    successActionType,
    message = undefined,
    callback = undefined,
  }) =>
  (dispatch) => {
    dispatch({
      type: successActionType,
      payload: { experiments },
    });

    if (message) dispatch(showSuccess(message));
    if (callback) callback();

    dispatch(removeLoading(requestActionType));
  };

/**
 * Experiments fail default action
 *
 * @param {object} failObject Success action default object
 * @param {string} failObject.requestActionType Action type request, used in loading
 * @param {string} failObject.failActionType Action type fail
 * @param {string=} failObject.message Success message
 * @param {Function} failObject.callback Fail function callback
 * @returns {Function} Thunk action
 */
const experimentsActionFail =
  ({ requestActionType, failActionType, message = undefined, callback }) =>
  (dispatch) => {
    dispatch({
      type: failActionType,
    });

    if (message) dispatch(showError(message));
    if (callback) callback();

    dispatch(removeLoading(requestActionType));
  };

/**
 * create experiment success action
 *
 * @param {object} response Request response
 * @param {string} projectId Project id
 * @param {object} history Router history object
 * @returns {Function} Dispatch
 */
const createExperimentSuccess =
  (response, projectId, history) => (dispatch, getState) => {
    // TODO: tentar remover todos os geState (PERIGO DE CONFLITOS SE FOR MAL UTILIZADO)
    const state = getState();
    const projects = getProjects(state);
    const experiments = getExperiments(state, projectId);

    const { changeProjectExperiments } = utils;

    const newExperiments = [...experiments];

    const experiment = response.data;
    newExperiments.push(experiment);

    const newProjects = changeProjectExperiments(
      projects,
      projectId,
      newExperiments
    );

    dispatch(hideNewExperimentModal());

    dispatch(fetchExperimentOperatorsRequest(projectId, experiment.uuid));

    dispatch({
      type: EXPERIMENTS_TYPES.CREATE_EXPERIMENT_SUCCESS,
      payload: { projects: newProjects },
    });

    dispatch(activeExperiment(projectId, experiment.uuid));

    // go to new experiment
    history.push(`/projetos/${projectId}/experimentos/${experiment.uuid}`);

    dispatch(showSuccess(`Experimento ${experiment.name} criado!`));
  };

/**
 * Create experiment fail action
 *
 * @param {object} error Error object
 * @returns {Function} Dispatch
 */
const createExperimentFail = (error) => (dispatch) => {
  let errorMessage;

  if (error?.response.status === 500) {
    errorMessage = error.message;
  } else {
    errorMessage = error.response.data.message;

    if (errorMessage.includes('name already exist')) {
      errorMessage = ALREADY_EXIST_MESSAGE;
    }
  }

  dispatch({
    type: EXPERIMENTS_TYPES.CREATE_EXPERIMENT_FAIL,
  });

  dispatch(showError(errorMessage));
};

/**
 * Create experiment request action
 *
 * @param {string} projectId Project id
 * @param {ExperimentCreatable} experiment Experiment
 * @param {object} history Router history
 * @returns {Function} Dispatch
 */
export const createExperimentRequest =
  (projectId, experiment, history) => async (dispatch) => {
    dispatch({
      type: EXPERIMENTS_TYPES.CREATE_EXPERIMENT_REQUEST,
    });

    dispatch(addLoading(EXPERIMENTS_TYPES.CREATE_EXPERIMENT_REQUEST));

    try {
      const response = await experimentsApi.createExperiment(
        projectId,
        experiment
      );

      dispatch(createExperimentSuccess(response, projectId, history));
    } catch (error) {
      dispatch(createExperimentFail(error));
    } finally {
      dispatch(removeLoading(EXPERIMENTS_TYPES.CREATE_EXPERIMENT_REQUEST));
    }
  };

/**
 * Update experiment success action
 *
 * @param {object} response Request response
 * @param {string} projectId Project id
 * @returns {Function} Dispatch
 */
const updateExperimentSuccess =
  (response, projectId) => (dispatch, getState) => {
    // TODO: tentar remover todos os geState (PERIGO DE CONFLITOS SE FOR MAL UTILIZADO)
    const state = getState();
    const projects = getProjects(state);
    const experiments = getExperiments(state, projectId);

    const { changeProjectExperiments } = utils;

    const updatedExperiment = response.data;
    const newExperiments = experiments.map((experimentItem) =>
      experimentItem.uuid === updatedExperiment.uuid
        ? updatedExperiment
        : experimentItem
    );

    const newProjects = changeProjectExperiments(
      projects,
      projectId,
      newExperiments
    );

    dispatch({
      type: EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_SUCCESS,
      payload: { projects: newProjects },
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

  if (error.response?.status === 500) {
    errorMessage = error.message;
  } else {
    errorMessage = error.response?.data.message ?? '';
    if (errorMessage.includes('name already exist')) {
      errorMessage = ALREADY_EXIST_MESSAGE;
    }
  }

  dispatch(removeLoading(EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_REQUEST));

  if (errorMessage) dispatch(showError(errorMessage, 5));

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
export const updateExperimentRequest =
  (projectId, experimentId, experimentUpdate) => async (dispatch) => {
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

      dispatch(updateExperimentSuccess(response, projectId));
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
const deleteExperimentSuccess =
  (projectId, experimentId, history) => (dispatch, getState) => {
    // TODO: tentar remover todos os geState (PERIGO DE CONFLITOS SE FOR MAL UTILIZADO)
    const state = getState();
    const projects = getProjects(state);
    const experiments = getExperiments(state, projectId);

    const { changeProjectExperiments } = utils;

    // get list of experiments without the deleted one
    const newExperiments = utils.deleteExperiment(experiments, experimentId);

    const newProjects = changeProjectExperiments(
      projects,
      projectId,
      newExperiments
    );

    dispatch({
      type: EXPERIMENTS_TYPES.DELETE_EXPERIMENT_SUCCESS,
      payload: { projects: newProjects },
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
export const deleteExperimentRequest =
  (projectId, experimentId, history) => async (dispatch) => {
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
 * @param {string} hoverExperimentId Hover experiment id
 * @param {string} projectId Project id
 * @returns {Function} Dispatch
 */
const organizeExperimentsSuccess =
  (dragExperimentId, hoverExperimentId, projectId) => (dispatch, getState) => {
    // TODO: tentar remover todos os geState (PERIGO DE CONFLITOS SE FOR MAL UTILIZADO)
    const state = getState();
    const projects = getProjects(state);
    const experiments = getExperiments(state, projectId);

    const { changeProjectExperiments } = utils;

    const newExperiments = utils.organizeExperiments(
      experiments,
      dragExperimentId,
      hoverExperimentId
    );

    const newProjects = changeProjectExperiments(
      projects,
      projectId,
      newExperiments
    );

    dispatch({
      type: EXPERIMENTS_TYPES.ORGANIZE_EXPERIMENTS_SUCCESS,
      payload: { projects: newProjects },
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

  dispatch({
    type: EXPERIMENTS_TYPES.ORGANIZE_EXPERIMENTS_FAIL,
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
export const organizeExperimentsRequest =
  (projectId, dragExperimentId, hoverExperimentId, newPosition) =>
  async (dispatch) => {
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

      dispatch(
        organizeExperimentsSuccess(
          dragExperimentId,
          hoverExperimentId,
          projectId
        )
      );
    } catch (error) {
      dispatch(organizeExperimentsFail(error));
    }
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

/**
 * Apply template request action
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @param {string} templateId Template UUID
 * @returns {Function} Dispatch function
 */
export const applyTemplateRequest =
  (projectId, experimentId, templateId) => async (dispatch) => {
    const requestActionType = EXPERIMENTS_TYPES.APPLY_TEMPLATE_REQUEST;

    dispatch({
      type: requestActionType,
    });

    dispatch(addLoading(requestActionType));

    try {
      const experiment = {
        templateId,
      };

      await experimentsApi.updateExperiment(
        projectId,
        experimentId,
        experiment
      );

      const successCallback = () => {
        dispatch(fetchExperimentOperatorsRequest(projectId, experimentId));
      };

      const successObject = {
        requestActionType,
        successActionType: EXPERIMENTS_TYPES.APPLY_TEMPLATE_SUCCESS,
        message: 'Template aplicado com sucesso!',
        callback: successCallback,
      };

      dispatch(experimentsActionSuccess(successObject));
    } catch (error) {
      const errorMessage = error.message;

      const errorObject = {
        requestActionType,
        failActionType: EXPERIMENTS_TYPES.APPLY_TEMPLATE_FAIL,
        message: errorMessage,
      };

      dispatch(experimentsActionFail(errorObject));
    }
  };

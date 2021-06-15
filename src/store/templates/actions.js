// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global Templates */

import * as TEMPLATES_TYPES from './actionTypes';

import templatesApi from 'services/TemplatesApi';
import experimentsApi from 'services/ExperimentsApi';

import {
  experimentOperatorsDataLoaded,
  experimentOperatorsLoadingData,
  templateDataLoaded,
  templateLoadingData,
  hideNewTemplateModal,
  tasksMenuLoadingData,
} from '../ui/actions';

import { fetchExperimentOperatorsRequest } from '../operators';

import { fetchTasksMenuRequest } from '../tasksMenu/actions';

import { showError, showSuccess } from 'store/message/message.actions';

/**
 * Templates success default action
 *
 * @param {object} successObject Success action default object
 * @param {Templates} successObject.templates New templates state
 * @param {string} successObject.actionType Action type
 * @param {string=} successObject.message Success message
 * @param {Function} successObject.callback Success function callback
 * @returns {Function} Thunk action
 */
const templatesActionSuccess =
  ({ templates, actionType, message = undefined, callback = undefined }) =>
  (dispatch) => {
    dispatch({
      type: actionType,
      templates: templates,
    });

    if (message) dispatch(showSuccess(message));
    if (callback) callback();

    dispatch(templateDataLoaded());
  };

/**
 * Templates fail default action
 *
 * @param {object} failObject Success action default object
 * @param {string} failObject.actionType Action type
 * @param {string=} failObject.message Success message
 * @param {Function} failObject.callback Fail function callback
 * @returns {Function} Thunk action
 */
const templatesActionFail =
  ({ actionType, message = undefined, callback }) =>
  (dispatch) => {
    dispatch({
      type: actionType,
    });

    if (message) dispatch(showError(message));
    if (callback) callback();

    dispatch(templateDataLoaded());
  };

/**
 * Fetch templates request action
 *
 * @returns {Function} Thunk action
 */
export const fetchTemplatesRequest = () => async (dispatch) => {
  dispatch({
    type: TEMPLATES_TYPES.FETCH_TEMPLATES_REQUEST,
  });

  dispatch(templateLoadingData());

  try {
    const response = await templatesApi.listTemplates();

    const {
      data: { templates },
    } = response;

    const successObject = {
      templates,
      actionType: TEMPLATES_TYPES.FETCH_TEMPLATES_SUCCESS,
    };

    dispatch(templatesActionSuccess(successObject));
  } catch (error) {
    const errorMessage = error.message;

    const errorObject = {
      actionType: TEMPLATES_TYPES.FETCH_TEMPLATES_FAIL,
      message: errorMessage,
    };

    dispatch(templatesActionFail(errorObject));
  }
};

/**
 * Create template request action
 *
 * @param {string} templateName Template name
 * @param {string} experimentId Experiment Id
 * @returns {Function} Thunk action
 */
export const createTemplateRequest =
  (templateName, experimentId) => async (dispatch) => {
    dispatch({
      type: TEMPLATES_TYPES.CREATE_TEMPLATE_REQUEST,
    });

    dispatch(templateLoadingData());

    try {
      const response = await templatesApi.createTemplate(
        templateName,
        experimentId
      );

      // FIXME: Atualmente retorna apenas o template e a montagem da lista é feita no reducer
      const { data: templates } = response;

      const successCallback = () => {
        dispatch(hideNewTemplateModal());

        dispatch(fetchTasksMenuRequest());
      };

      const successObject = {
        templates,
        actionType: TEMPLATES_TYPES.CREATE_TEMPLATE_SUCCESS,
        message: 'Template criado com sucesso!',
        callback: successCallback,
      };

      dispatch(templatesActionSuccess(successObject));
    } catch (error) {
      const errorMessage = error.message;

      const errorObject = {
        actionType: TEMPLATES_TYPES.FETCH_TEMPLATES_FAIL,
        message: errorMessage,
      };

      dispatch(templatesActionFail(errorObject));
    }
  };

// FIXME: Aparentemente não é utilizada para nada
/**
 * Update template request action
 *
 * @param {string} templateId Template UUID
 * @param {string} templateName Template name
 * @returns {Function} Thunk action
 */
export const updateTemplateRequest =
  (templateId, templateName) => async (dispatch, getState) => {
    dispatch({
      type: TEMPLATES_TYPES.UPDATE_TEMPLATE_REQUEST,
    });

    try {
      const response = await templatesApi.updateTemplate(
        templateId,
        templateName
      );

      const { data: updatedTemplate } = response;

      const currentState = getState();
      const templatesState = currentState.templatesReducer;

      const templates = templatesState.map((templateItem) => {
        return templateItem.uuid !== updatedTemplate.uuid
          ? templateItem
          : { ...templateItem, ...updatedTemplate };
      });

      const successObject = {
        templates,
        actionType: TEMPLATES_TYPES.UPDATE_TEMPLATE_SUCCESS,
        message: 'Template atualizado com sucesso!',
      };

      dispatch(templatesActionSuccess(successObject));
    } catch (error) {
      const errorMessage = error.message;

      const errorObject = {
        actionType: TEMPLATES_TYPES.UPDATE_TEMPLATE_FAIL,
        message: errorMessage,
      };

      dispatch(templatesActionFail(errorObject));
    }
  };

/**
 * Delete template request action
 *
 * @param {string} templateId Template UUID
 * @returns {Function} Thunk action
 */
export const deleteTemplateRequest =
  (templateId) => async (dispatch, getState) => {
    dispatch({
      type: TEMPLATES_TYPES.DELETE_TEMPLATE_REQUEST,
    });

    dispatch(tasksMenuLoadingData());

    try {
      await templatesApi.deleteTemplate(templateId);

      const currentState = getState();
      const templatesState = currentState.templatesReducer;

      const templates = templatesState.filter((templateItem) => {
        return templateItem.uuid !== templateId;
      });

      const successObject = {
        templates,
        actionType: TEMPLATES_TYPES.DELETE_TEMPLATE_SUCCESS,
        message: 'Template excluído com sucesso!',
      };

      dispatch(templatesActionSuccess(successObject));
    } catch (error) {
      const errorMessage = error.message;

      const errorObject = {
        actionType: TEMPLATES_TYPES.DELETE_TEMPLATE_FAIL,
        message: errorMessage,
      };

      dispatch(templatesActionFail(errorObject));
    }
  };

// FIXME: Passar para experimentos, faz mais sentido.
/**
 * Set template request action
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @param {string} templateId Template UUID
 * @returns {Function} Dispatch function
 */
export const setTemplateRequest =
  (projectId, experimentId, templateId) => async (dispatch, getState) => {
    dispatch({
      type: TEMPLATES_TYPES.SET_TEMPLATE_REQUEST,
    });

    dispatch(experimentOperatorsLoadingData());

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

      const currentState = getState();
      const templatesState = currentState.templatesReducer;

      const successObject = {
        templates: templatesState,
        actionType: TEMPLATES_TYPES.SET_TEMPLATE_SUCCESS,
        message: 'Experimento atualizado com sucesso!',
        callback: successCallback,
      };

      dispatch(templatesActionSuccess(successObject));
    } catch (error) {
      const errorCallback = () => {
        dispatch(experimentOperatorsDataLoaded());
      };

      const errorMessage = error.message;

      const errorObject = {
        actionType: TEMPLATES_TYPES.SET_TEMPLATE_FAIL,
        message: errorMessage,
        callback: errorCallback,
      };

      dispatch(templatesActionFail(errorObject));
    }
  };

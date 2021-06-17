// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global Templates */

import * as TEMPLATES_TYPES from './templates.actionTypes';

import templatesApi from 'services/TemplatesApi';

import {
  hideNewTemplateModal,
  tasksMenuLoadingData,
  tasksMenuDataLoaded,
} from '../ui/actions';
import { fetchTasksMenuRequest } from '../tasksMenu/actions';
import { showError, showSuccess } from 'store/message/message.actions';
import { addLoading, removeLoading } from 'store/loading';

import { getTemplates } from './templates.selectors';

/**
 * Templates success default action
 *
 * @param {object} successObject Success action default object
 * @param {Templates} successObject.templates New templates state
 * @param {string} successObject.requestActionType Action type request, used in loading
 * @param {string} successObject.successActionType Action type success
 * @param {string=} successObject.message Success message
 * @param {Function} successObject.callback Success function callback
 * @returns {Function} Thunk action
 */
const templatesActionSuccess =
  ({
    templates,
    requestActionType,
    successActionType,
    message = undefined,
    callback = undefined,
  }) =>
  (dispatch) => {
    dispatch({
      type: successActionType,
      payload: { templates },
    });

    if (message) dispatch(showSuccess(message));
    if (callback) callback();

    dispatch(removeLoading(requestActionType));
  };

/**
 * Templates fail default action
 *
 * @param {object} failObject Success action default object
 * @param {string} failObject.requestActionType Action type request, used in loading
 * @param {string} failObject.failActionType Action type fail
 * @param {string=} failObject.message Success message
 * @param {Function} failObject.callback Fail function callback
 * @returns {Function} Thunk action
 */
const templatesActionFail =
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
 * Fetch templates request action
 *
 * @returns {Function} Thunk action
 */
export const fetchTemplatesRequest = () => async (dispatch) => {
  const requestActionType = TEMPLATES_TYPES.FETCH_TEMPLATES_REQUEST;

  dispatch({
    type: requestActionType,
  });

  dispatch(addLoading(requestActionType));

  try {
    const response = await templatesApi.listTemplates();

    const {
      data: { templates },
    } = response;

    const successObject = {
      templates,
      requestActionType,
      successActionType: TEMPLATES_TYPES.FETCH_TEMPLATES_SUCCESS,
    };

    dispatch(templatesActionSuccess(successObject));
  } catch (error) {
    const errorMessage = error.message;

    const errorObject = {
      requestActionType,
      failActionType: TEMPLATES_TYPES.FETCH_TEMPLATES_FAIL,
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
  (templateName, experimentId) => async (dispatch, getState) => {
    const requestActionType = TEMPLATES_TYPES.CREATE_TEMPLATE_REQUEST;

    dispatch({
      type: requestActionType,
    });

    dispatch(addLoading(requestActionType));

    try {
      const response = await templatesApi.createTemplate(
        templateName,
        experimentId
      );

      const { data: template } = response;

      const currentState = getState();
      const templatesState = getTemplates(currentState);

      const templates = [...templatesState, template];

      const successCallback = () => {
        dispatch(hideNewTemplateModal());

        dispatch(fetchTasksMenuRequest());
      };

      const successObject = {
        templates,
        requestActionType,
        successActionType: TEMPLATES_TYPES.CREATE_TEMPLATE_SUCCESS,
        message: 'Template criado com sucesso!',
        callback: successCallback,
      };

      dispatch(templatesActionSuccess(successObject));
    } catch (error) {
      const errorMessage = error.message;

      const errorObject = {
        requestActionType,
        failActionType: TEMPLATES_TYPES.FETCH_TEMPLATES_FAIL,
        message: errorMessage,
      };

      dispatch(templatesActionFail(errorObject));
    }
  };

/**
 * Delete template request action
 *
 * @param {string} templateId Template UUID
 * @param {object[]} allTasks All tasks list, used in task menu
 * @returns {Function} Thunk action
 */
export const deleteTemplateRequest =
  (templateId, allTasks) => async (dispatch, getState) => {
    const requestActionType = TEMPLATES_TYPES.DELETE_TEMPLATE_REQUEST;

    dispatch({
      type: requestActionType,
    });

    dispatch(addLoading(requestActionType));

    // TODO: Esse loading pode ser removido quando a store de menu de tarefas for refatorada, provavelmente
    dispatch(tasksMenuLoadingData());

    try {
      await templatesApi.deleteTemplate(templateId);

      const currentState = getState();
      const templatesState = getTemplates(currentState);

      const templates = templatesState.filter((templateItem) => {
        return templateItem.uuid !== templateId;
      });

      // TODO: Todo esse bloco será removido quando a store de menu de tarefas for refatorada
      // INICIO ------------->
      const filteredTemplates = [...allTasks.filtered.TEMPLATES].filter(
        (template) => template.uuid !== templateId
      );

      const unfilteredTemplates = [...allTasks.unfiltered.TEMPLATES].filter(
        (template) => template.uuid !== templateId
      );

      const tasks = {
        unfiltered: {
          ...allTasks.unfiltered,
          TEMPLATES: unfilteredTemplates,
        },
        filtered: {
          ...allTasks.filtered,
          TEMPLATES: filteredTemplates,
        },
      };

      if (tasks.unfiltered.TEMPLATES.length === 0) {
        delete tasks.unfiltered.TEMPLATES;
      }

      if (tasks.filtered.TEMPLATES.length === 0) {
        delete tasks.filtered.TEMPLATES;
      }

      const successCallback = () => {
        dispatch(tasksMenuDataLoaded());
      };
      // FIM ------------->

      // TODO: por enquanto precisamos enviar as tarefas no payload, porém quando a store de menu de tarefas for refatorada
      // provavelmente isso poderá ser corrigido
      const customPayload = { templates, tasks };

      const successObject = {
        templates: customPayload,
        requestActionType,
        successActionType: TEMPLATES_TYPES.DELETE_TEMPLATE_SUCCESS,
        message: 'Template excluído com sucesso!',
        callback: successCallback,
      };

      dispatch(templatesActionSuccess(successObject));
    } catch (error) {
      const errorMessage = error.message;

      const errorObject = {
        failActionType: TEMPLATES_TYPES.DELETE_TEMPLATE_FAIL,
        requestActionType,
        message: errorMessage,
      };

      dispatch(templatesActionFail(errorObject));
    }
  };

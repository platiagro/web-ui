// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global Templates */

import * as TEMPLATES_TYPES from './templates.actionTypes';

import templatesApi from 'services/TemplatesApi';
import experimentsApi from 'services/ExperimentsApi';

import {
  experimentOperatorsDataLoaded,
  experimentOperatorsLoadingData,
  hideNewTemplateModal,
  tasksMenuLoadingData,
  tasksMenuDataLoaded,
} from '../ui/actions';
import { fetchExperimentOperatorsRequest } from '../operators';
import { fetchTasksMenuRequest } from '../tasksMenu/actions';
import { showError, showSuccess } from 'store/message/message.actions';
import { addLoading, removeLoading } from 'store/loading';

import { getTemplates } from './templates.selectors';

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
      payload: { templates },
    });

    if (message) dispatch(showSuccess(message));
    if (callback) callback();
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
  };

/**
 * Fetch templates request action
 *
 * @returns {Function} Thunk action
 */
export const fetchTemplatesRequest = () => async (dispatch) => {
  const actionType = TEMPLATES_TYPES.FETCH_TEMPLATES_REQUEST;

  dispatch({
    type: actionType,
  });

  dispatch(addLoading(actionType));

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
  } finally {
    dispatch(removeLoading(actionType));
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
    const actionType = TEMPLATES_TYPES.CREATE_TEMPLATE_REQUEST;

    dispatch({
      type: actionType,
    });

    dispatch(addLoading(actionType));

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
    } finally {
      dispatch(removeLoading(actionType));
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
    const actionType = TEMPLATES_TYPES.DELETE_TEMPLATE_REQUEST;

    dispatch({
      type: actionType,
    });

    dispatch(addLoading(actionType));

    // TODO: Esse loading pode ser removido quando a store de tarefas for refatorada, provavelmente
    dispatch(tasksMenuLoadingData());

    try {
      await templatesApi.deleteTemplate(templateId);

      const currentState = getState();
      const templatesState = getTemplates(currentState);

      const templates = templatesState.filter((templateItem) => {
        return templateItem.uuid !== templateId;
      });

      // TODO: Todo esse bloco será removido quando a store de tarefas for refatorada
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

      // TODO: por enquanto precisamos enviar as tarefas no payload, porém quando a store de tarefas for refatorada
      // provavelmente isso poderá ser corrigido
      const customPayload = { templates, tasks };

      const successObject = {
        templates: customPayload,
        actionType: TEMPLATES_TYPES.DELETE_TEMPLATE_SUCCESS,
        message: 'Template excluído com sucesso!',
        callback: successCallback,
      };

      dispatch(templatesActionSuccess(successObject));
    } catch (error) {
      const errorMessage = error.message;

      const errorObject = {
        actionType: TEMPLATES_TYPES.DELETE_TEMPLATE_FAIL,
        message: errorMessage,
      };

      dispatch(templatesActionFail(errorObject));
    } finally {
      dispatch(removeLoading(actionType));
    }
  };

// TODO: Passar para experimentos, faz mais sentido.
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
    const actionType = TEMPLATES_TYPES.SET_TEMPLATE_REQUEST;

    dispatch({
      type: actionType,
    });

    dispatch(addLoading(actionType));

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
      const templatesState = getTemplates(currentState);

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
    } finally {
      dispatch(removeLoading(actionType));
    }
  };

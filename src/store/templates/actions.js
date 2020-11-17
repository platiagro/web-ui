// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import templatesApi from '../../services/TemplatesApi';
import experimentsApi from '../../services/ExperimentsApi';

// UI ACTIONS
import {
  experimentOperatorsDataLoaded,
  experimentOperatorsLoadingData,
  templateDataLoaded,
  templateLoadingData,
  hideNewTemplateModal,
  tasksMenuLoadingData,
  tasksMenuDataLoaded,
} from '../ui/actions';

// OPERATORS ACTIONS
import { fetchOperatorsRequest } from '../operators/actions';

// COMPONENTS MENU ACTIONS
import { fetchTasksMenuRequest } from '../tasksMenu/actions';

// ACTIONS
// ** FETCH TEMPLATES
/**
 * fetch templates success action
 *
 * @param {object} response
 * @returns {object} { type, templates }
 */
const fetchTemplatesSuccess = (response) => {
  // getting templates from response
  const templates = response.data;

  return {
    type: actionTypes.FETCH_TEMPLATES_SUCCESS,
    templates,
  };
};

/**
 * fetch templates fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const fetchTemplatesFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  message.error(errorMessage);

  return {
    type: actionTypes.FETCH_TEMPLATES_FAIL,
    errorMessage,
  };
};

/**
 * fetch templates request action
 *
 * @returns {Function}
 */
export const fetchTemplatesRequest = () => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_TEMPLATES_REQUEST,
  });

  // fetching templates
  templatesApi
    .listTemplates()
    .then((response) => dispatch(fetchTemplatesSuccess(response)))
    .catch((error) => dispatch(fetchTemplatesFail(error)));
};

// // // // // // // // // //

// ** CREATE TEMPLATE
/**
 * create template success action
 *
 * @param {object} response
 * @returns {object} { type, templates }
 */
const fetchCreateTemplateSuccess = (response) => (dispatch) => {
  // getting templates from response
  const templates = response.data;

  // dispatching template data loaded action
  dispatch(templateDataLoaded());

  // dispatching hide new template modal action
  dispatch(hideNewTemplateModal());

  // dispatching fetch components menu request
  dispatch(fetchTasksMenuRequest());

  // dispatching create success
  dispatch({
    type: actionTypes.CREATE_TEMPLATE_SUCCESS,
    templates,
  });
};

/**
 * create template fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const fetchCreateTemplateFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching template data loaded action
  dispatch(templateDataLoaded());

  // dispatching create template fail
  dispatch({
    type: actionTypes.CREATE_TEMPLATE_FAIL,
    errorMessage,
  });

  message.error(errorMessage);
};

/**
 * create template request action
 *
 * @param {string} templateName
 * @param {string} experimentId
 * @returns {Function}
 */
export const createTemplateRequest = (templateName, experimentId) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.CREATE_TEMPLATE_REQUEST,
  });

  // dispatching template loading data action
  dispatch(templateLoadingData());

  // fetching templates
  templatesApi
    .createTemplate(templateName, experimentId)
    .then((response) => dispatch(fetchCreateTemplateSuccess(response)))
    .catch((error) => dispatch(fetchCreateTemplateFail(error)));
};

// // // // // // // // // //

// ** SET TEMPLATE
/**
 * set template success action
 *
 * @param {object} response
 * @param projectId
 * @param experimentId
 * @param projectId
 * @param experimentId
 * @returns {object} { type, templates }
 */
const fetchSetTemplateSuccess = (response, projectId, experimentId) => (
  dispatch
) => {
  // getting templates from response
  /* const { operators } = response.data; */

  // dispatching experiment operators data loaded action
  dispatch(fetchOperatorsRequest(projectId, experimentId));

  // dispatching set template success action
  dispatch({
    type: actionTypes.SET_TEMPLATE_SUCCESS,
    /* operators, */
  });
};

/**
 * set template fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const fetchSetTemplateFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiment operators data loaded action
  dispatch(experimentOperatorsDataLoaded());

  dispatch({
    type: actionTypes.SET_TEMPLATE_FAIL,
    errorMessage,
  });

  message.error(errorMessage);
};

/**
 * set template request action
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} templateId
 * @returns {Function}
 */
export const setTemplateRequest = (projectId, experimentId, templateId) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.SET_TEMPLATE_REQUEST,
  });

  // dispatching experiment operators loading data action
  dispatch(experimentOperatorsLoadingData());

  // experiment body
  const experiment = {
    templateId,
  };

  // fetching templates
  experimentsApi
    .updateExperiment(projectId, experimentId, experiment)
    .then((response) =>
      dispatch(fetchSetTemplateSuccess(response, projectId, experimentId))
    )
    .catch((error) => dispatch(fetchSetTemplateFail(error)));
};

/**
 * delete template request action
 *
 * @param templateId
 * @param allTasks
 * @returns {Function}
 */
export const deleteTemplateRequest = (templateId, allTasks) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.DELETE_TEMPLATE_REQUEST,
  });

  // dispatching template table loading data action
  dispatch(tasksMenuLoadingData());

  // deleting project
  templatesApi
    .deleteTemplate(templateId)
    .then(() => dispatch(fetchDeleteTemplateSuccess(templateId, allTasks)))
    .catch((error) => dispatch(fetchDeleteTemplateFail(error)));
};

/**
 * delete template fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const fetchDeleteTemplateFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching projects table data loaded action
  dispatch(tasksMenuDataLoaded());

  // dispatching delete projects fail action
  dispatch({
    type: actionTypes.DELETE_TEMPLATE_FAIL,
    errorMessage,
  });

  message.error(errorMessage);
};

// // // // // // // // // //

// ** DELETE TEMPLATE
/**
 * delete template success action
 *
 * @param {object} templateId
 * @param allTasks
 * @returns {object} { type }
 */
const fetchDeleteTemplateSuccess = (templateId, allTasks) => (dispatch) => {
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

  dispatch(tasksMenuDataLoaded());

  // dispatching delete template success action
  dispatch({
    type: actionTypes.DELETE_TEMPLATE_SUCCESS,
    payload: tasks,
  });

  message.success('Template excluído!');
};

// // // // // // // // // //

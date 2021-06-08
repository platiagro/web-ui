// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import templatesApi from 'services/TemplatesApi';
import experimentsApi from 'services/ExperimentsApi';

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
import { fetchExperimentOperatorsRequest } from '../operators';

// COMPONENTS MENU ACTIONS
import { fetchTasksMenuRequest } from '../tasksMenu/actions';

// ACTIONS
// ** FETCH TEMPLATES
/**
 * fetch templates success action
 *
 * @param {object} response Request response
 * @returns {object} { type, templates }
 */
const fetchTemplatesSuccess = (response) => (dispatch) => {
  dispatch(templateDataLoaded());

  dispatch({
    type: actionTypes.FETCH_TEMPLATES_SUCCESS,
    templates: response.data.templates,
  });
};

/**
 * fetch templates fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const fetchTemplatesFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching fetch templates fail action
  dispatch({
    type: actionTypes.FETCH_TEMPLATES_FAIL,
    errorMessage,
  });

  message.error(errorMessage);

  dispatch(templateDataLoaded());
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

  dispatch(templateLoadingData());

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
const createTemplateSuccess = (response) => (dispatch) => {
  // dispatching template data loaded action
  dispatch(templateDataLoaded());

  // dispatching hide new template modal action
  dispatch(hideNewTemplateModal());

  // dispatching fetch components menu request
  dispatch(fetchTasksMenuRequest());

  // dispatching create success
  dispatch({
    type: actionTypes.CREATE_TEMPLATE_SUCCESS,
    template: response.data,
  });
};

/**
 * create template fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const createTemplateFail = (error) => (dispatch) => {
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
export const createTemplateRequest =
  (templateName, experimentId) => (dispatch) => {
    // dispatching request action
    dispatch({
      type: actionTypes.CREATE_TEMPLATE_REQUEST,
    });

    // dispatching template loading data action
    dispatch(templateLoadingData());

    // fetching templates
    templatesApi
      .createTemplate(templateName, experimentId)
      .then((response) => dispatch(createTemplateSuccess(response)))
      .catch((error) => dispatch(createTemplateFail(error)));
  };

// // // // // // // // // //

// ** UPDATE TEMPLATE
/**
 * update template success action
 *
 * @param {object} response Request response
 * @returns {object} {type, experiment}
 */
const updateTemplateSuccess = (response) => (dispatch, getState) => {
  const currentState = getState();
  const templatesState = currentState.templatesReducer;

  const templates = templatesState.map((template) => {
    return template.uuid !== response.data.uuid
      ? template
      : { ...template, ...response.data };
  });

  // dispatching update template success
  dispatch({
    type: actionTypes.UPDATE_TEMPLATE_SUCCESS,
    templates,
  });
};

/**
 * update template fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const updateTemplateFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching update template fail action response
  dispatch({
    type: actionTypes.UPDATE_TEMPLATE_FAIL,
    errorMessage,
  });

  message.error(errorMessage, 5);
};

/**
 * update template request action
 *
 * @param {string} templateId Template UUID
 * @param {string} templateName Template name
 * @returns {Function}
 */
export const updateTemplateRequest =
  (templateId, templateName) => (dispatch) => {
    // dispatching request action
    dispatch({
      type: actionTypes.UPDATE_TEMPLATE_REQUEST,
    });

    // update template
    templatesApi
      .updateTemplate(templateId, templateName)
      .then((response) => dispatch(updateTemplateSuccess(response)))
      .catch((error) => dispatch(updateTemplateFail(error)));
  };

// // // // // // // // // //

// ** DELETE TEMPLATE
/**
 * delete template success action
 *
 * @param {object} templateId Template UUID
 * @param {*} allTasks
 * @returns {object} { type }
 */
const deleteTemplateSuccess =
  (templateId, allTasks) => (dispatch, getState) => {
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

    const currentState = getState();
    const templatesState = currentState.templatesReducer;

    const templates = templatesState.filter((template) => {
      return template.uuid !== templateId;
    });

    // dispatching delete template success action
    dispatch({
      type: actionTypes.DELETE_TEMPLATE_SUCCESS,
      payload: tasks,
      templates,
    });

    message.success('Template excluído!');
  };

/**
 * delete template fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const deleteTemplateFail = (error) => (dispatch) => {
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

/**
 * delete template request action
 *
 * @param {string} templateId Template UUID
 * @param {*} allTasks
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
    .then(() => dispatch(deleteTemplateSuccess(templateId, allTasks)))
    .catch((error) => dispatch(deleteTemplateFail(error)));
};

// // // // // // // // // //

// ** SET TEMPLATE
/**
 * set template success action
 *
 * @param {object} response Request response
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @returns {object} { type, templates }
 */
const setTemplateSuccess =
  (response, projectId, experimentId) => (dispatch) => {
    // getting templates from response
    /* const { operators } = response.data; */

    // dispatching experiment operators data loaded action
    dispatch(fetchExperimentOperatorsRequest(projectId, experimentId));

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
const setTemplateFail = (error) => (dispatch) => {
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
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @param {string} templateId Template UUID
 * @returns {Function}
 */
export const setTemplateRequest =
  (projectId, experimentId, templateId) => (dispatch) => {
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
        dispatch(setTemplateSuccess(response, projectId, experimentId))
      )
      .catch((error) => dispatch(setTemplateFail(error)));
  };

// // // // // // // // // //

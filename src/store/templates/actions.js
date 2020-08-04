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
  componentsMenuDataLoaded,
  componentsMenuLoadingData,
} from '../ui/actions';

// OPERATORS ACTIONS
import { fetchOperatorsRequest } from '../operators/actions';

// COMPONENTS MENU ACTIONS
import { fetchComponentsMenuRequest } from '../componentsMenu/actions';

// ACTIONS
// ** FETCH TEMPLATES
/**
 * fetch templates success action
 * @param {Object} response
 * @returns {Object} { type, templates }
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
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const fetchTemplatesFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.FETCH_TEMPLATES_FAIL,
    errorMessage,
  };
};

/**
 * fetch templates request action
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
 * @param {Object} response
 * @returns {Object} { type, templates }
 */
const createTemplateSuccess = (response) => (dispatch) => {
  // getting templates from response
  const templates = response.data;

  // dispatching template data loaded action
  dispatch(templateDataLoaded());

  // dispatching hide new template modal action
  dispatch(hideNewTemplateModal());

  // dispatching fetch components menu request
  dispatch(fetchComponentsMenuRequest());

  // dispatching create success
  dispatch({
    type: actionTypes.CREATE_TEMPLATE_SUCCESS,
    templates,
  });
};

/**
 * create template fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
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
};

/**
 * create template request action
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
    .then((response) => dispatch(createTemplateSuccess(response)))
    .catch((error) => dispatch(createTemplateFail(error)));
};

// // // // // // // // // //

// ** SET TEMPLATE
/**
 * set template success action
 * @param {Object} response
 * @returns {Object} { type, templates }
 */
const setTemplateSuccess = (response, projectId, experimentId) => (
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
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
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
};

/**
 * set template request action
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
      dispatch(setTemplateSuccess(response, projectId, experimentId))
    )
    .catch((error) => dispatch(setTemplateFail(error)));
};

/**
 * delete template request action
 * @returns {Function}
 */
export const deleteTemplateRequest = (templateId) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.DELETE_TEMPLATE_REQUEST,
  });

  // dispatching template table loading data action
  dispatch(componentsMenuLoadingData());

  // deleting project
  templatesApi
    .deleteTemplate(templateId)
    .then(() => dispatch(deleteTemplateSuccess(templateId)))
    .catch((error) => dispatch(deleteTemplateFail(error)));
};

/**
 * delete template fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const deleteTemplateFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching projects table data loaded action
  dispatch(componentsMenuDataLoaded());

  // dispatching delete projects fail action
  dispatch({
    type: actionTypes.DELETE_TEMPLATE_FAIL,
    errorMessage,
  });
};

// // // // // // // // // //

// ** DELETE TEMPLATE
/**
 * delete template success action
 * @param {Object} templateId
 * @returns {Object} { type }
 */
const deleteTemplateSuccess = (templateId) => (dispatch) => {
  // dispatching template table data loaded action
  dispatch(componentsMenuDataLoaded());

  // dispatching delete template success action
  dispatch({
    type: actionTypes.DELETE_TEMPLATE_SUCCESS,
    templateId,
  });
};

// // // // // // // // // //

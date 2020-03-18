// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import projectsApi from '../../services/ProjectsApi';

// ACTIONS
// ** FETCH PROJECT
/**
 * fetch project success action
 * @param {Object} response
 * @returns {Object} { type, project }
 */
const fetchProjectSuccess = (response) => {
  // getting project from response
  const project = response.data;

  return {
    type: actionTypes.FETCH_PROJECT_SUCCESS,
    project,
  };
};
/**
 * fetch project fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const fetchProjectFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.FETCH_PROJECT_FAIL,
    errorMessage,
  };
};
/**
 * fetch project request action
 * @returns {Function}
 */
export const fetchProjectRequest = (projectId) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_PROJECT_REQUEST,
  });

  // fetching project
  projectsApi
    .detailProject(projectId)
    .then((response) => dispatch(fetchProjectSuccess(response)))
    .catch((error) => dispatch(fetchProjectFail(error)));
};

// ** CREATE PROJECT
/**
 * create project success action
 * @param {Object} response
 * @param {Object} routerProps
 * @returns {Object} { type, project }
 */
const createProjectSuccess = (response, routerProps) => {
  // getting project from response
  const project = response.data;

  // go to new project
  routerProps.history.push(`/projetos/${project.uuid}`);

  return {
    type: actionTypes.CREATE_PROJECT_SUCCESS,
    project,
  };
};
/**
 * create project fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const createProjectFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.CREATE_PROJECT_FAIL,
    errorMessage,
  };
};
/**
 * create project request action
 * @returns {Function}
 */
export const createProjectRequest = (projectName, routerProps) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.CREATE_PROJECT_REQUEST,
  });

  // creating project
  projectsApi
    .createProject(projectName)
    .then((response) => dispatch(createProjectSuccess(response, routerProps)))
    .catch((error) => dispatch(createProjectFail(error)));
};

// ** EDIT PROJECT NAME
/**
 * edit project name success action
 * @param {Object} response
 * @returns {Object} { type, project }
 */
const editProjectNameSuccess = (response) => {
  // getting project from response
  const project = response.data;

  return {
    type: actionTypes.EDIT_PROJECT_NAME_SUCCESS,
    project,
  };
};
/**
 * edit project name fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const editProjectNameFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.EDIT_PROJECT_NAME_FAIL,
    errorMessage,
  };
};
/**
 * edit project name request action
 * @param {string} projectId
 * @param {string} newProjectName
 * @returns {Function}
 */
export const editProjectNameRequest = (projectId, newProjectName) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.EDIT_PROJECT_NAME_REQUEST,
  });

  // creating project
  projectsApi
    .updateProject(projectId, newProjectName)
    .then((response) => dispatch(editProjectNameSuccess(response)))
    .catch((error) => dispatch(editProjectNameFail(error)));
};

// ** DELETE PROJECT
/**
 * delete project success action
 * @param {Object} projectId
 * @returns {Object} { type }
 */
const deleteProjectSuccess = (projectId) => {
  return {
    type: actionTypes.DELETE_PROJECT_SUCCESS,
    projectId,
  };
};
/**
 * delete project fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const deleteProjectFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.DELETE_PROJECT_FAIL,
    errorMessage,
  };
};
/**
 * delete project request action
 * @returns {Function}
 */
export const deleteProjectRequest = (projectId) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.DELETE_PROJECT_REQUEST,
  });

  // deleting project
  projectsApi
    .deleteProject(projectId)
    .then(() => dispatch(deleteProjectSuccess(projectId)))
    .catch((error) => dispatch(deleteProjectFail(error)));
};

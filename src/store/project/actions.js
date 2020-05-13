// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import projectsApi from '../../services/ProjectsApi';

// UI ACTIONS
import {
  hideNewProjectModal,
  projectsTableLoadingData,
  projectsTableDataLoaded,
  projectNameLoadingData,
  projectNameDataLoaded,
} from '../ui/actions';

// COMPONENTS ACTION
import { fetchComponentsRequest } from '../components/actions';

// ACTIONS
// ** FETCH PROJECT
/**
 * fetch project success action
 * @param {Object} response
 * @returns {Object} { type, project }
 */
const fetchProjectSuccess = (response) => (dispatch) => {
  // getting project from response
  const project = response.data;

  // dispatching fetch components request action
  dispatch(fetchComponentsRequest());

  // dispatching project name data loaded action
  dispatch(projectNameDataLoaded());

  // dispatching fetch project success action
  dispatch({
    type: actionTypes.FETCH_PROJECT_SUCCESS,
    project,
  });
};

/**
 * fetch project fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const fetchProjectFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching project name data loaded action
  dispatch(projectNameDataLoaded());

  // dispatching fetch project fail action
  dispatch({
    type: actionTypes.FETCH_PROJECT_FAIL,
    errorMessage,
  });
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

  // dispatching project name loading data action
  dispatch(projectNameLoadingData());

  // fetching project
  projectsApi
    .detailProject(projectId)
    .then((response) => dispatch(fetchProjectSuccess(response)))
    .catch((error) => dispatch(fetchProjectFail(error)));
};

// // // // // // // // // //

// ** CREATE PROJECT
/**
 * create project success action
 * @param {Object} response
 * @param {Object} routerProps
 * @returns {Object} { type, project }
 */
const createProjectSuccess = (response, routerProps) => (dispatch) => {
  // getting project from response
  const project = response.data;

  // dispatching projects table data loaded action
  dispatch(projectsTableDataLoaded());

  // dispatching hide modal
  dispatch(hideNewProjectModal());

  // dispatching create project success
  dispatch({
    type: actionTypes.CREATE_PROJECT_SUCCESS,
    project,
  });

  // go to new project
  routerProps.history.push(`/projetos/${project.uuid}`);
};

/**
 * create project fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const createProjectFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching projects table data loaded action
  dispatch(projectsTableDataLoaded());

  // dispatching create project fail
  dispatch({
    type: actionTypes.CREATE_PROJECT_FAIL,
    errorMessage,
  });
};

/**
 * create project request action
 * @returns {Function}
 */
export const createProjectRequest = (
  projectName,
  projectDescription,
  routerProps
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.CREATE_PROJECT_REQUEST,
  });

  // dispatching projects table loading data action
  dispatch(projectsTableLoadingData());

  // creating project
  projectsApi
    .createProject(projectName, projectDescription)
    .then((response) => dispatch(createProjectSuccess(response, routerProps)))
    .catch((error) => dispatch(createProjectFail(error)));
};

// // // // // // // // // //

// ** EDIT PROJECT NAME
/**
 * edit project name success action
 * @param {Object} response
 * @returns {Object} { type, project }
 */
const editProjectNameSuccess = (response) => (dispatch) => {
  // getting project from response
  const project = response.data;

  // dispatching project name data loaded action
  dispatch(projectNameDataLoaded());

  // dispatching edit project name success
  dispatch({
    type: actionTypes.EDIT_PROJECT_NAME_SUCCESS,
    project,
  });
};

/**
 * edit project name fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const editProjectNameFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching project name data loaded action
  dispatch(projectNameDataLoaded());

  // dispatching edit project name fail
  dispatch({
    type: actionTypes.EDIT_PROJECT_NAME_FAIL,
    errorMessage,
  });
};

/**
 * edit project name request action
 * @param {string} projectId
 * @param {string} newProjectName
 * @param {string} newProjecDescription
 * @returns {Function}
 */
export const editProjectNameRequest = (
  projectId,
  newProjectName,
  newProjecDescription
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.EDIT_PROJECT_NAME_REQUEST,
  });

  // dispatching project name loading data action
  dispatch(projectNameLoadingData());

  // creating project
  projectsApi
    .updateProject(projectId, newProjectName, newProjecDescription)
    .then((response) => dispatch(editProjectNameSuccess(response)))
    .catch((error) => dispatch(editProjectNameFail(error)));
};

// // // // // // // // // //

// ** DELETE PROJECT
/**
 * delete project success action
 * @param {Object} projectId
 * @returns {Object} { type }
 */
const deleteProjectSuccess = (projectId) => (dispatch) => {
  // dispatching projects table data loaded action
  dispatch(projectsTableDataLoaded());

  // dispatching delete projects success action
  dispatch({
    type: actionTypes.DELETE_PROJECT_SUCCESS,
    projectId,
  });
};

/**
 * delete project fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const deleteProjectFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching projects table data loaded action
  dispatch(projectsTableDataLoaded());

  // dispatching delete projects fail action
  dispatch({
    type: actionTypes.DELETE_PROJECT_FAIL,
    errorMessage,
  });
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

  // dispatching projects table loading data action
  dispatch(projectsTableLoadingData());

  // deleting project
  projectsApi
    .deleteProject(projectId)
    .then(() => dispatch(deleteProjectSuccess(projectId)))
    .catch((error) => dispatch(deleteProjectFail(error)));
};

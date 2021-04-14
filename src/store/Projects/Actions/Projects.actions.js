/* globals Projects, ProjectUpdatable */

// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import { actionTypes } from '.';

// SERVICES
import projectsApi from 'services/ProjectsApi';

import { hideNewProjectModal } from 'store/ui/actions';

// TODO: Criar store para mensagens
/**
 * Function to fetch paginated projects request fail
 *
 * @param {object} error Error object
 * @returns {Function} The `disptach` function
 */
const fetchPaginatedProjectsFail = (error) => {
  const errorMessage = error.message;
  message.error(errorMessage, 5);

  return {
    type: actionTypes.FETCH_PROJECTS_FAIL,
    payload: { isLoading: false },
  };
};

/**
 * Function to fetch paginated projects request success
 *
 * @param {string} name Name to be fetch
 * @param {number} page Pagination page parameter
 * @param {number} pageSize Pagination page size parameter
 * @param {object} response Request success response
 * @returns {object} Action creator
 */
const fetchPaginatedProjectsSuccess = (name, page, pageSize, response) => {
  const { projects } = response.data;

  return {
    type: actionTypes.FETCH_PROJECTS_SUCCESS,
    payload: {
      projects,
      searchText: name,
      currentPage: page,
      pageSize: pageSize,
      total: response.data.total,
      isLoading: false,
    },
  };
};

/**
 * Function to request fetch paginated projects
 *
 * @param {string} name Name to be fetch
 * @param {number} page Pagination page parameter
 * @param {number} pageSize Pagination page size parameter
 * @returns {Function} The `disptach` function
 */
export const fetchPaginatedProjectsRequest = (name, page, pageSize) => async (
  dispatch
) => {
  dispatch({
    type: actionTypes.FETCH_PROJECTS_REQUEST,
    payload: { isLoading: true },
  });

  if (name === undefined) {
    name = '';
  }

  try {
    const response = await projectsApi.getPaginatedProjects(
      name,
      page,
      pageSize
    );

    dispatch(fetchPaginatedProjectsSuccess(name, page, pageSize, response));
  } catch (error) {
    dispatch(fetchPaginatedProjectsFail(error));
  }
};

/**
 * Function to dispatch select projects to reducer
 *
 * @param {Projects} projects Selected projects list
 * @returns {Function} The `disptach` function
 */
export const selectProjects = (projects) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SELECTED_PROJECTS,
      payload: { selectedProjects: projects },
    });
  };
};

/**
 * Function to delete projects request fail
 *
 * @param {object} error Error object
 * @returns {object} Action
 */
const deleteProjectsFail = (error) => {
  const errorMessage = error.message;
  message.error(errorMessage, 5);

  return {
    type: actionTypes.DELETE_PROJECTS_FAIL,
    payload: { isLoading: false },
  };
};

/**
 * Function to delete projects request success
 *
 * @param {Projects} deletedProjects An array of deleted projects
 * @returns {Function} The `disptach` function
 */
const deleteProjectsSuccess = (deletedProjects) => (dispatch, getState) => {
  const { Projects } = getState();
  const { projects: storeProjects } = Projects;

  const selectedProjects = [];

  const projects = storeProjects.filter(
    (project) =>
      !deletedProjects.find((deletedProject) => project.uuid === deletedProject)
  );

  // TODO: Utilizar internacionalização e chave de plural
  message.success('Projeto(s) excluído(s)!');

  dispatch({
    type: actionTypes.DELETE_PROJECTS_SUCCESS,
    payload: { isLoading: false, projects, selectedProjects },
  });
};

/**
 * Function to request delete projects
 *
 * @param {Projects} projects An array of projects to be deleted
 * @returns {Function} The `disptach` function
 */
export const deleteProjectsRequest = (projects) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_PROJECTS_REQUEST,
      payload: { isLoading: true },
    });

    try {
      await projectsApi.deleteProjects(projects);

      dispatch(deleteProjectsSuccess(projects));
    } catch (error) {
      dispatch(deleteProjectsFail(error));
    }
  };
};

/**
 * Update project fail action
 *
 * @param {object} error Error object
 * @returns {object} { type, errorMessage }
 */
const updateProjectFail = (error) => {
  // getting error message
  let errorMessage;

  if (error?.response.status === 500) {
    errorMessage = error.message;
  } else {
    errorMessage = error.response.data.message;

    if (errorMessage.includes('name already exist')) {
      errorMessage = 'Já existe um projeto com este nome!';
    }
  }

  message.error(errorMessage, 5);

  return {
    type: actionTypes.UPDATE_PROJECT_FAIL,
    payload: { isLoading: false, errorMessage },
  };
};

/**
 * Update project success action
 *
 * @param {object} response Request response
 * @returns {object} { type, project }
 */
const updateProjectSuccess = (response) => (dispatch, getState) => {
  const { Projects } = getState();
  const { projects: storeProjects } = Projects;

  const project = response.data;

  const projects = storeProjects.map((storeProject) =>
    storeProject.uuid === project.uuid ? project : storeProject
  );

  dispatch({
    type: actionTypes.UPDATE_PROJECT_SUCCESS,
    payload: { projects, isLoading: false },
  });

  dispatch(hideNewProjectModal());

  message.success('Projeto salvo!');
};

/**
 * Update project request action
 *
 * @param {string} projectId Project id to update
 * @param {ProjectUpdatable} projectUpdate New project data
 * @returns {Function} Dispatch
 */
export const updateProjectRequest = (projectId, projectUpdate) => async (
  dispatch
) => {
  dispatch({
    type: actionTypes.UPDATE_PROJECT_REQUEST,
    payload: { isLoading: true },
  });

  try {
    const response = await projectsApi.updateProject(projectId, projectUpdate);

    dispatch(updateProjectSuccess(response));
  } catch (error) {
    dispatch(updateProjectFail(error));
  }
};

/**
 * Fetch project success action
 *
 * @param {object} response Request response
 * @returns {object} Action object
 */
const fetchProjectSuccess = (response) => (dispatch, getState) => {
  const { Projects } = getState();
  const { projects: storeProjects } = Projects;

  // getting project from response
  const project = response.data;

  let projects;

  if (storeProjects?.length > 0) {
    projects = storeProjects.map((storeProject) =>
      storeProject.uuid === project.uuid ? project : storeProject
    );
  } else {
    projects = [project];
  }

  // dispatching fetch project success action
  dispatch({
    type: actionTypes.FETCH_PROJECT_SUCCESS,
    payload: { projects, isLoading: false },
  });
};

/**
 * Fetch project fail action
 *
 * @param {object} error Error object
 * @param {object} routerProps Router props object
 * @returns {object} Action object
 */
const fetchProjectFail = (error, routerProps) => {
  // getting error message
  const errorMessage = error.message;

  // check if error is 404
  if (error.response?.status === 404) {
    // redirect to error page
    routerProps.history.replace('/erro-404');
  }

  message.error(errorMessage, 5);

  // dispatching fetch project fail action
  return {
    type: actionTypes.FETCH_PROJECT_FAIL,
    payload: { isLoading: false },
  };
};

/**
 * Fetch project request action
 *
 * @param {string} projectId Project id to fetch
 * @param {object} routerProps Router props object
 * @returns {Function} Dispatch function
 */
export const fetchProjectRequest = (projectId, routerProps) => async (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_PROJECT_REQUEST,
    payload: { isLoading: true },
  });

  try {
    const response = await projectsApi.detailProject(projectId);

    dispatch(fetchProjectSuccess(response));
  } catch (error) {
    dispatch(fetchProjectFail(error, routerProps));
  }
};

// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global Projects, ProjectUpdatable, ProjectCreatable */

import { showError, showSuccess } from 'store/message';

import * as PROJECTS_TYPES from './projects.actionTypes';

import projectsApi from 'services/ProjectsApi';

import { hideNewProjectModal } from 'store/ui/actions';

import { addLoading, removeLoading } from 'store/loading';

// TODO: Criar store para mensagens
/**
 * Function to fetch paginated projects request fail
 *
 * @param {object} error Error object
 * @returns {Function} The `disptach` function
 */
const fetchPaginatedProjectsFail = (error) => (dispatch) => {
  const errorMessage = error.message;
  dispatch(showError(errorMessage, 5));

  dispatch(removeLoading(PROJECTS_TYPES.FETCH_PROJECTS_REQUEST));

  dispatch({
    type: PROJECTS_TYPES.FETCH_PROJECTS_FAIL,
  });
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
const fetchPaginatedProjectsSuccess = (name, page, pageSize, response) => (
  dispatch
) => {
  const { projects } = response.data;

  dispatch({
    type: PROJECTS_TYPES.FETCH_PROJECTS_SUCCESS,
    payload: {
      projects,
      searchText: name,
      currentPage: page,
      pageSize: pageSize,
      total: response.data.total,
    },
  });

  dispatch(removeLoading(PROJECTS_TYPES.FETCH_PROJECTS_REQUEST));
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
  const actionType = PROJECTS_TYPES.FETCH_PROJECTS_REQUEST;

  dispatch({
    type: actionType,
  });

  dispatch(addLoading(actionType));

  if (name === undefined) {
    name = '';
  }

  try {
    const response = await projectsApi.fetchPaginatedProjects(
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
      type: PROJECTS_TYPES.SELECTED_PROJECTS,
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
const deleteProjectsFail = (error) => (dispatch) => {
  const errorMessage = error.message;
  dispatch(showError(errorMessage, 5));

  dispatch(removeLoading(PROJECTS_TYPES.DELETE_PROJECTS_REQUEST));

  dispatch({
    type: PROJECTS_TYPES.DELETE_PROJECTS_FAIL,
  });
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
  dispatch(showSuccess('Projeto(s) excluído(s)!'));

  dispatch({
    type: PROJECTS_TYPES.DELETE_PROJECTS_SUCCESS,
    payload: { projects, selectedProjects },
  });

  // TODO: Remover essa requisição após corrigir paginação
  dispatch(fetchPaginatedProjectsRequest('', 1, 10));

  dispatch(removeLoading(PROJECTS_TYPES.DELETE_PROJECTS_REQUEST));
};

/**
 * Function to request delete projects
 *
 * @param {Projects} projects An array of projects to be deleted
 * @returns {Function} The `disptach` function
 */
export const deleteProjectsRequest = (projects) => {
  return async (dispatch) => {
    const actionType = PROJECTS_TYPES.DELETE_PROJECTS_REQUEST;

    dispatch({
      type: actionType,
    });

    dispatch(addLoading(actionType));

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
const updateProjectFail = (error) => (dispatch) => {
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

  dispatch(showError(errorMessage, 5));

  dispatch({
    type: PROJECTS_TYPES.UPDATE_PROJECT_FAIL,
    payload: { errorMessage },
  });

  dispatch(removeLoading(PROJECTS_TYPES.UPDATE_PROJECT_REQUEST));
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
    type: PROJECTS_TYPES.UPDATE_PROJECT_SUCCESS,
    payload: { projects },
  });

  dispatch(hideNewProjectModal());

  dispatch(removeLoading(PROJECTS_TYPES.UPDATE_PROJECT_REQUEST));

  dispatch(showSuccess('Projeto salvo!'));
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
  const actionType = PROJECTS_TYPES.UPDATE_PROJECT_REQUEST;

  dispatch({
    type: actionType,
  });

  dispatch(addLoading(actionType));

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

  const project = response.data;

  let projects;

  if (storeProjects?.length > 0) {
    projects = storeProjects.map((storeProject) =>
      storeProject.uuid === project.uuid ? project : storeProject
    );
  } else {
    projects = [project];
  }

  dispatch({
    type: PROJECTS_TYPES.FETCH_PROJECT_SUCCESS,
    payload: { projects },
  });

  dispatch(removeLoading(PROJECTS_TYPES.FETCH_PROJECT_REQUEST));
};

/**
 * Fetch project fail action
 *
 * @param {object} error Error object
 * @param {object} history Router history object
 * @returns {object} Action object
 */
const fetchProjectFail = (error, history) => (dispatch) => {
  const errorMessage = error.message;

  if (error.response?.status === 404) {
    // replace current route with error route
    history.replace('/erro-404');
  }

  dispatch(showError(errorMessage, 5));

  dispatch(removeLoading(PROJECTS_TYPES.FETCH_PROJECT_REQUEST));

  dispatch({
    type: PROJECTS_TYPES.FETCH_PROJECT_FAIL,
  });
};

/**
 * Fetch project request action
 *
 * @param {string} projectId Project id to fetch
 * @param {object} history Router history object
 * @returns {Function} Dispatch function
 */
export const fetchProjectRequest = (projectId, history) => async (dispatch) => {
  const actionType = PROJECTS_TYPES.FETCH_PROJECT_REQUEST;

  // dispatching request action
  dispatch({
    type: actionType,
  });

  dispatch(addLoading(actionType));

  try {
    const response = await projectsApi.fetchProject(projectId);

    dispatch(fetchProjectSuccess(response));
  } catch (error) {
    dispatch(fetchProjectFail(error, history));
  }
};

/**
 * Create project success action
 *
 * @param {object} response Request response
 * @param {object} history Router props object
 * @returns {object} Action object
 */
const createProjectSuccess = (response, history) => (dispatch, getState) => {
  const { Projects } = getState();
  const { projects: storeProjects } = Projects;

  const project = response.data;

  const projects = [...storeProjects];

  projects.push(project);

  projects.sort((projectA, projectB) =>
    projectA.name.localeCompare(projectB.name)
  );

  dispatch({
    type: PROJECTS_TYPES.CREATE_PROJECT_SUCCESS,
    payload: { projects },
  });

  dispatch(hideNewProjectModal());

  dispatch(removeLoading(PROJECTS_TYPES.CREATE_PROJECT_REQUEST));

  dispatch(showSuccess(`Projeto ${project.name} criado!`));

  // go to new project
  history.push(`/projetos/${project.uuid}`);
};

/**
 * Create project fail action
 *
 * @param {object} error Error object
 * @returns {object} Action object
 */
const createProjectFail = (error) => (dispatch) => {
  let errorMessage;

  if (error?.response.status === 500) {
    errorMessage = error.message;
  } else {
    errorMessage = error.response.data.message;

    if (errorMessage.includes('name already exist')) {
      errorMessage = 'Já existe um projeto com este nome!';
    }
  }

  dispatch(showError(errorMessage, 5));

  dispatch({
    type: PROJECTS_TYPES.CREATE_PROJECT_FAIL,
    payload: { errorMessage },
  });

  dispatch(removeLoading(PROJECTS_TYPES.CREATE_PROJECT_REQUEST));
};

/**
 * Create project request action
 *
 * @param {ProjectCreatable} project New project
 * @param {object} history Router history object
 * @returns {Function} Dispatch function
 */
export const createProjectRequest = (project, history) => async (dispatch) => {
  const actionType = PROJECTS_TYPES.CREATE_PROJECT_REQUEST;

  dispatch({
    type: actionType,
  });

  dispatch(addLoading(actionType));

  try {
    const response = await projectsApi.createProject(project);

    dispatch(createProjectSuccess(response, history));
  } catch (error) {
    dispatch(createProjectFail(error));
  }
};

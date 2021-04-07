/* globals Projects */

// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import { actionTypes } from '.';

// SERVICES
import projectsApi from 'services/ProjectsApi';

// TODO: Criar store para mensagens
/**
 * Function to fetch paginated projects request fail
 *
 * @param {object} error Error object
 * @returns {Function} The `disptach` function
 */
export const fetchPaginatedProjectsFail = (error) => {
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
export const fetchPaginatedProjectsSuccess = (
  name,
  page,
  pageSize,
  response
) => {
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
export const deleteProjectsFail = (error) => {
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
 * @param {string} searchText The text to be search
 * @returns {Function} The `disptach` function
 */
export const deleteProjectsSuccess = (searchText) => (dispatch) => {
  message.success('Projetos excluídos!');
  dispatch(fetchPaginatedProjectsRequest(searchText, 1, 10));

  dispatch({
    type: actionTypes.DELETE_PROJECTS_SUCCESS,
    payload: { isLoading: false },
  });
};

/**
 * Function to request delete projects
 *
 * @param {string} searchText The text to be search
 * @param {Projects} projects An array of projects to be deleted
 * @returns {Function} The `disptach` function
 */
export const deleteProjectsRequest = (searchText, projects) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_PROJECTS_REQUEST,
      payload: { isLoading: true },
    });

    try {
      await projectsApi.deleteProjects(projects);

      dispatch(deleteProjectsSuccess(searchText));
    } catch (error) {
      dispatch(deleteProjectsFail(error));
    }
  };
};

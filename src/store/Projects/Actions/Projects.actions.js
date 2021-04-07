// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import { actionTypes } from '.';

// SERVICES
import projectsApi from 'services/ProjectsApi';

// UI ACTIONS
import {
  projectsTableLoadingData,
  projectsTableDataLoaded,
} from 'store/ui/actions';

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
  return {
    type: actionTypes.FETCH_PROJECTS_SUCCESS,
    projects: response.data.projects,
    searchText: name,
    currentPage: page,
    pageSize: pageSize,
    total: response.data.total,
    payload: {
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
export const fetchPaginatedProjectsRequest = (name, page, pageSize) => (
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
    const response = projectsApi.getPaginatedProjects(name, page, pageSize);

    dispatch(fetchPaginatedProjectsSuccess(name, page, pageSize, response));
  } catch (error) {
    dispatch(fetchPaginatedProjectsFail(error));
  }
};

/**
 * Function to dispatch select projects to reducer
 *
 * @param {string} projects The project name
 * @returns {Function} The `disptach` function
 */
export const selectProjects = (projects) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SELECTED_PROJECTS,
      selectedProjects: projects,
    });
  };
};

/**
 * Function to delete selected projects and dispatch to reducer
 *
 * @param {string} searchText The text to be search
 * @param {Array} projects An array of projects to be deleted
 * @returns {Function} The `disptach` function
 */
export const deleteSelectedProjects = (searchText, projects) => {
  return (dispatch) => {
    dispatch(projectsTableLoadingData());
    return projectsApi
      .deleteProjects(projects)
      .then(() => {
        dispatch(projectsTableDataLoaded());
        message.success('Projetos excluídos!');
        dispatch(fetchPaginatedProjectsRequest(searchText, 1, 10));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(projectsTableDataLoaded());
        message.error(errorMessage, 5);
      });
  };
};

/**
 * Function to delete selected projects and dispatch to reducer
 *
 * @param {string} searchText The text to be search
 * @param {string} uuid The project uuid
 */
export const deleteProject = (searchText, uuid) => {
  return (dispatch) => {
    dispatch(projectsTableLoadingData());

    return projectsApi
      .deleteProject(uuid)
      .then(() => {
        dispatch(projectsTableDataLoaded());
        message.success('Projeto excluído com sucesso.');
        dispatch(fetchPaginatedProjectsRequest(searchText, 1, 10));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(projectsTableDataLoaded());
        message.error(errorMessage, 5);
      });
  };
};

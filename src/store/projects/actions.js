// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import projectsApi from 'services/ProjectsApi';

// UI ACTIONS
import {
  projectsTableLoadingData,
  projectsTableDataLoaded,
} from 'store/ui/actions';

/**
 * Function to fetch pagineted projects and dispatch to reducer
 *
 * @param {string} name Name to be fetch
 * @param {number} page Pagination page parameter
 * @param {number} pageSize Pagination page size parameter
 * @returns {Function} The `disptach` function
 */
export const fetchPaginatedProjects = (name, page, pageSize) => (dispatch) => {
  dispatch(projectsTableLoadingData());

  if (name === undefined) {
    name = '';
  }

  projectsApi
    .getPaginatedProjects(name, page, pageSize)
    .then(async (response) => {
      dispatch(projectsTableDataLoaded());
      dispatch({
        type: actionTypes.FETCH_PAGINATED_PROJECTS,
        projects: response.data.projects,
        searchText: name,
        currentPage: page,
        pageSize: pageSize,
        total: response.data.total,
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      dispatch(projectsTableDataLoaded());
      message.error(errorMessage, 5);
    });
};

/**
 * Function to fetch all projects and dispatch to reducer
 *
 * @returns {Function} The `disptach` function
 */
export const fetchProjects = () => (dispatch) => {
  dispatch(projectsTableLoadingData());
  projectsApi
    .listProjects()
    .then((response) => {
      const projects = response.data.projects;
      dispatch(projectsTableDataLoaded());
      dispatch({
        type: actionTypes.FETCH_PROJECTS,
        projects,
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      dispatch(projectsTableDataLoaded());
      message.error(errorMessage, 5);
    });
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
        dispatch(fetchPaginatedProjects(searchText, 1, 10));
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
        dispatch(fetchPaginatedProjects(searchText, 1, 10));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(projectsTableDataLoaded());
        message.error(errorMessage, 5);
      });
  };
};

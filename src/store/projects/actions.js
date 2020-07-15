// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import projectsApi from '../../services/ProjectsApi';

// UI ACTIONS
import {
  projectsTableLoadingData,
  projectsTableDataLoaded,
} from '../ui/actions';

/**
 * Function to fetch pagineted projects and dispatch to reducer
 */
export const fetchPaginatedProjects = (page, pageSize) => {
  return (dispatch) => {
    // showing loading
    dispatch(projectsTableLoadingData());

    return projectsApi
      .getPaginatedProjects(page, pageSize)
      .then((response) => {
        dispatch(projectsTableDataLoaded());
        dispatch({
          type: actionTypes.FETCH_PAGINATED_PROJECTS,
          currentPage: page,
          pageSize: pageSize,
          projects: response.data.projects,
          total: response.data.total,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(projectsTableDataLoaded());
        message.error(errorMessage, 5);
      });
  };
};

/**
 * Function to fetch all projects and dispatch to reducer
 */
export const fetchProjects = () => (dispatch) => {
  // dispatching projects table loading data action
  dispatch(projectsTableLoadingData());

  // fetching projects
  projectsApi
    .listProjects()
    .then((response) => {
      const projects = response.data;
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
 * Function to dispatch selected projects to reducer
 */
export const selectedProjects = (selectedProjects) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SELECTED_PROJECTS,
      selectedProjects,
    });
  };
};

/**
 * Function to delete selected projects and dispatch to reducer
 */
export const deleteSelectedProjects = (selectedProjects) => {
  return (dispatch) => {
    dispatch(projectsTableLoadingData());

    const formatedProjects = selectedProjects.map((uuid) => {
      return { uuid };
    });

    return projectsApi
      .deleteProjects(formatedProjects)
      .then(() => {
        dispatch(projectsTableDataLoaded());
        message.success('Projetos excluídos!');
        dispatch(fetchPaginatedProjects(1, 10));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(projectsTableDataLoaded());
        message.error(errorMessage, 5);
      });
  };
};

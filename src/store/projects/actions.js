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
export const fetchPaginatedProjects = (name, page, pageSize) => {
  return (dispatch) => {
    dispatch(projectsTableLoadingData());
    if (name === undefined) {
      name = '';
    }
    return projectsApi
      .getPaginatedProjects(name, page, pageSize)
      .then((response) => {
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
 * Function to dispatch select projects to reducer
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
 */
export const deleteSelectedProjects = (searchText, projects) => {
  return (dispatch) => {
    dispatch(projectsTableLoadingData());

    const formatedProjects = projects.map((uuid) => {
      return { uuid };
    });

    return projectsApi
      .deleteProjects(formatedProjects)
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

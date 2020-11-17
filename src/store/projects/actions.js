// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import projectsApi from '../../services/ProjectsApi';

//API
import deploymentsApi from 'services/DeploymentsApi';

import _ from 'lodash';

// UI ACTIONS
import {
  projectsTableLoadingData,
  projectsTableDataLoaded,
} from '../ui/actions';


export const fetchPaginatedProjectsFail = (error) => (dispatch) => {
  const errorMessage = error.message;
  
  dispatch({
    type: actionTypes.FETCH_PAGINATED_PROJECTS_FAIL,
    errorMessage,
  });

  message.error(errorMessage, 5);
};

/**
 * Function to fetch pagineted projects and dispatch to reducer
 *
 * @param name
 * @param page
 * @param pageSize
 */
export const fetchPaginatedProjects = (name, page, pageSize) => {
  return (dispatch) => {

    dispatch({
      type:actionTypes.FETCH_PAGINATED_PROJECTS_REQUEST,
    })

    dispatch(projectsTableLoadingData());
    if (name === undefined) {
      name = '';
    }
    return projectsApi
      .getPaginatedProjects(name, page, pageSize)
      .then(async (response) => {
        const deployedProjects = await deploymentsApi.fetchDeployedExperiments();
        const deployedProjectsIds = deployedProjects.data.map(
          (experimento) => experimento.experimentId
        );
        const projectsTagged = response.data.projects.map((project) => {
          const experiments = project.experiments.map(
            (experimento) => experimento.uuid
          );
          const flagDeployed = Boolean(
            _.intersection(experiments, deployedProjectsIds).length
          );
          return {
            ...project,
            deployed: flagDeployed,
          };
        });

        dispatch(projectsTableDataLoaded());
        dispatch({
          type: actionTypes.FETCH_PAGINATED_PROJECTS,
          projects: projectsTagged,
          searchText: name,
          currentPage: page,
          pageSize: pageSize,
          total: response.data.total,
        });
        dispatch({
          type: actionTypes.FETCH_PAGINATED_PROJECTS_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch(projectsTableDataLoaded());
        dispatch(fetchPaginatedProjectsFail(error));
      });
  };
};

export const fetchProjectsSuccess = (projects) => (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_PROJECTS,
    projects,
  });
};

export const fetchProjectsFail = (error) => (dispatch) => {
  const errorMessage = error.message;
  
  dispatch({
    type: actionTypes.FETCH_PROJECTS_FAIL,
    errorMessage,
  });

  message.error(errorMessage, 5);
};

/**
 * Function to fetch all projects and dispatch to reducer
 */
export const fetchProjects = () => (dispatch) => {

  dispatch({
    type: actionTypes.FETCH_PROJECTS_REQUEST,
  });

  // dispatching projects table loading data action
  dispatch(projectsTableLoadingData());

  // fetching projects
  projectsApi
    .listProjects()
    .then((response) => {
      const projects = response.data;
      dispatch(projectsTableDataLoaded());
      dispatch(fetchProjectsSuccess(projects));
    })
    .catch((error) => {
      dispatch(projectsTableDataLoaded());
      dispatch(fetchProjectsFail(error));
    });
};

/**
 * Function to dispatch select projects to reducer
 *
 * @param projects
 */
export const selectProjects = (projects) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SELECTED_PROJECTS,
      selectedProjects: projects,
    });
  };
};

export const deleteSelectedProjectsSuccess = () => (dispatch) => { 
  dispatch({
    type: actionTypes.DELETE_SELECTED_PROJECTS_SUCCESS,
  });
};

export const deleteSelectedProjectsFail = (error) => (dispatch) => {
  const errorMessage = error.message;
  
  dispatch({
    type: actionTypes.DELETE_SELECTED_PROJECTS_FAIL,
    errorMessage,
  });

  message.error(errorMessage, 5);
};

/**
 * Function to delete selected projects and dispatch to reducer
 *
 * @param searchText
 * @param projects
 */
export const deleteSelectedProjects = (searchText, projects) => {
  return (dispatch) => {

    dispatch({
      type: actionTypes.DELETE_SELECTED_PROJECTS_REQUEST,
    });
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
        dispatch(deleteSelectedProjectsSuccess);
      })
      .catch((error) => {
        dispatch(projectsTableDataLoaded());
        dispatch(deleteSelectedProjectsFail(error));
      });
  };
};

export const deleteProjectSuccess = () => (dispatch) => { 
  dispatch({
    type: actionTypes.DELETE_PROJECT_SUCCESS,
  });
};

export const deleteProjectFail = (error) => (dispatch) => {
  const errorMessage = error.message;
  
  dispatch({
    type: actionTypes.DELETE_PROJECT_FAIL,
    errorMessage,
  });

  message.error(errorMessage, 5);
};

/**
 * Function to delete selected projects and dispatch to reducer
 *
 * @param searchText
 * @param uuid
 */
export const deleteProject = (searchText, uuid) => {
  return (dispatch) => {

    dispatch({
      type:actionTypes.DELETE_PROJECT_REQUEST
    })

    dispatch(projectsTableLoadingData());

    return projectsApi
      .deleteProject(uuid)
      .then(() => {
        dispatch(projectsTableDataLoaded());
        message.success('Projeto excluído com sucesso.');
        dispatch(fetchPaginatedProjects(searchText, 1, 10));
        dispatch(deleteProjectSuccess);
      })
      .catch((error) => {
        dispatch(projectsTableDataLoaded());
        dispatch(deleteProjectFail(error));
      });
  };
};

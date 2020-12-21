// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import deploymentRunsApi from 'services/DeploymentRunsApi';
import projectsApi from 'services/ProjectsApi';

// UI ACTIONS
import {
  projectsTableLoadingData,
  projectsTableDataLoaded,
} from 'store/ui/actions';

/**
 * Function to fetch pagineted projects and dispatch to reducer
 *
 * @param name
 * @param page
 * @param pageSize
 */
export const fetchPaginatedProjects = (name, page, pageSize) => {
  return (dispatch) => {
    dispatch(projectsTableLoadingData());
    if (name === undefined) {
      name = '';
    }
    return projectsApi
      .getPaginatedProjects(name, page, pageSize)
      .then(async (response) => {
        const projectsTagged = await Promise.all(
          response.data.projects.map(async (project) => {
            let flagDeployed = false;
            for (const experiment of project.experiments) {
              const deploymentRuns = await deploymentRunsApi
                .fetchDeploymentRuns(project.uuid, experiment.uuid)
                .catch((error) => {});
              if (deploymentRuns) {
                flagDeployed = true;
                break;
              }
            }
            return {
              ...project,
              deployed: flagDeployed,
            };
          })
        );
        dispatch(projectsTableDataLoaded());
        dispatch({
          type: actionTypes.FETCH_PAGINATED_PROJECTS,
          projects: projectsTagged,
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
  dispatch(projectsTableLoadingData());
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

/**
 * Function to delete selected projects and dispatch to reducer
 *
 * @param searchText
 * @param projects
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

/**
 * Function to delete selected projects and dispatch to reducer
 *
 * @param searchText
 * @param uuid
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

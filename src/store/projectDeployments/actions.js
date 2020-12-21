// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import projectsDeploymentsApi from 'services/ProjectsDeploymentsApi';

// UI ACTIONS
import {
  deploymentsTabsDataLoaded,
  deploymentsTabsLoadingData,
  deploymentsTabsHideModal,
} from 'store/ui/actions';

// ACTIONS
/**
 * Create deployment
 *
 * @param {string} projectId
 * @param {string} experimentName
 * @param {object} routerProps
 * @returns {Function}
 */
export const createProjectDeployment = (projectId, experimentId, name) => (
  dispatch
) => {
  dispatch({
    type: actionTypes.CREATE_DEPLOYMENT_REQUEST,
  });
  dispatch(deploymentsTabsLoadingData());
  projectsDeploymentsApi
    .createProjectDeployment(projectId, experimentId, name)
    .then((response) => {
      dispatch(deploymentsTabsDataLoaded());
      dispatch(deploymentsTabsHideModal());
      const deployment = response.data;
      dispatch({
        type: actionTypes.CREATE_DEPLOYMENT_SUCCESS,
        deployment,
      });
      message.success(`Pré-implantação ${deployment.name} criada!`);
    })
    .catch((error) => {
      dispatch(deploymentsTabsDataLoaded());
      let errorMessage;
      if (error.response.status === 500) {
        errorMessage = error.message;
        message.error(errorMessage, 5);
      } else {
        errorMessage = error.response.data.message;
        if (errorMessage.includes('name already exist')) {
          dispatch({
            type: actionTypes.CREATE_DEPLOYMENT_FAILURE,
            errorMessage: 'Já existe uma pré-implantação com este nome!',
          });
        } else {
          message.error(errorMessage, 5);
        }
      }
    });
};

/**
 * Delete deployment
 */
export const deleteProjectDeployment = (projectId, deploymentId) => (
  dispatch
) => {
  dispatch({
    type: actionTypes.DELETE_DEPLOYMENT_REQUEST,
  });
  dispatch(deploymentsTabsLoadingData());
  projectsDeploymentsApi
    .deleteProjectDeployment(projectId, deploymentId)
    .then(() => {
      dispatch(deploymentsTabsDataLoaded());
      dispatch({
        type: actionTypes.DELETE_DEPLOYMENT_SUCCESS,
        deploymentId,
      });
      message.success(`Pré-implantação excluída!`);
    })
    .catch((error) => {
      dispatch(deploymentsTabsDataLoaded());
      const errorMessage = error.message;
      dispatch({
        type: actionTypes.DELETE_DEPLOYMENT_FAILURE,
        errorMessage,
      });
      message.error(errorMessage, 5);
    });
};

/**
 * Fetch deployments
 */
export const fetchProjectDeployments = (projectId) => (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_DEPLOYMENT_REQUEST,
  });
  dispatch(deploymentsTabsLoadingData());
  projectsDeploymentsApi
    .listProjectDeployments(projectId)
    .then((response) => {
      dispatch(deploymentsTabsDataLoaded());
      const deployments = response.data;
      dispatch({
        type: actionTypes.FETCH_DEPLOYMENT_SUCCESS,
        deployments: deployments,
      });
    })
    .catch((error) => {
      dispatch(deploymentsTabsDataLoaded());
      const errorMessage = error.message;
      dispatch({
        type: actionTypes.FETCH_DEPLOYMENT_FAILURE,
        errorMessage,
      });
      message.error(errorMessage);
    });
};

/**
 * Update deployment position
 */
export const updateDeploymentPosition = (
  projectId,
  dragId,
  hoverId,
  newPosition
) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_DEPLOYMENT_POSITION_SUCCESS,
  });
  dispatch(deploymentsTabsLoadingData());
  projectsDeploymentsApi
    .updateProjectDeployment(projectId, dragId, { position: newPosition })
    .then(() => {
      dispatch(deploymentsTabsDataLoaded());
      dispatch({
        type: actionTypes.UPDATE_DEPLOYMENT_POSITION_SUCCESS,
        dragId,
        hoverId,
      });
    })
    .catch((error) => {
      dispatch(deploymentsTabsDataLoaded());
      const errorMessage = error.message;
      dispatch({
        type: actionTypes.UPDATE_DEPLOYMENT_POSITION_FAILURE,
        errorMessage,
      });
      message.error(errorMessage);
    });
};

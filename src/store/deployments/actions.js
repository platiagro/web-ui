// UI LIB
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICE
import deploymentsApi from 'services/DeploymentsApi';
import deploymentsRunsApi from 'services/DeploymentRunsApi';

// UI ACTIONS
import {
  implantedExperimentsLoadingData,
  implantedExperimentsDataLoaded,
  prepareDeploymentsLoadingData,
  prepareDeploymentsDataLoaded,
} from 'store/ui/actions';

// ACTIONS
// ** FETCH DEPLOYMENTS
/**
 * fetch deployment success action
 *
 * @param {object} response Request response
 * @returns {object} { type, experiments }
 */
const fetchDeploymentsSuccess = (response) => (dispatch) => {
  // dispatching fetch deployments success action
  dispatch({
    type: actionTypes.FETCH_DEPLOYMENTS_SUCCESS,
    deployments: response.data,
  });
};

/**
 * fetch deployments fail action
 *
 * @param {object} error Response error
 * @returns {object} { type, errorMessage }
 */
const fetchDeploymentsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching fetch experiments fail action
  dispatch({
    type: actionTypes.FETCH_DEPLOYMENTS_FAIL,
    errorMessage,
  });

  message.error(errorMessage);
};

/**
 * fetch deployments request action
 *
 * @param {boolean} isToShowLoader
 * @returns {Function}
 */
export const fetchDeploymentsRequest = (projectId, isToShowLoader) => (
  dispatch
) => {
  if (isToShowLoader) {
    dispatch(implantedExperimentsLoadingData());
  }

  // fetching deployments
  deploymentsApi
    .listDeployments(projectId)
    .then((response) => dispatch(fetchDeploymentsSuccess(response)))
    .catch((error) => dispatch(fetchDeploymentsFail(error)));
};

// // // // // // // // // //

// ** CREATE DEPLOYMENT
/**
 * create deployment success action
 *
 * @param {object} response Response body
 * @returns {object} { type, experiment }
 */
const createDeploymentSuccess = (response) => (dispatch) => {
  // dispatching create deployment success
  dispatch({
    type: actionTypes.CREATE_DEPLOYMENT_SUCCESS,
    deployment: response.data,
  });
};

/**
 * create deployment fail action
 *
 * @param {object} error Response error
 * @returns {object} { type, errorMessage }
 */
const createDeploymentFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage =
    error.response === undefined ? error.message : error.response.data.message;

  // dispatching create deployment fail action response
  dispatch({
    type: actionTypes.CREATE_DEPLOYMENT_FAIL,
    errorMessage,
  });

  message.error(errorMessage, 5);

  // check if error is 404
  if (error.response?.status === 404) {
    // redirect to error page
    routerProps.history.replace('/erro-404');
  }
};

/**
 * create deployment request action
 *
 * @param {string} experimentId The experiment Id
 * @param {string} projectId The project Id
 * @returns {Function} dispatch function
 */
export const createDeploymentRequest = (experimentId, projectId) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.CREATE_DEPLOYMENT_REQUEST,
  });

  // creating deployment object
  const deploymentObj = {
    experiments: [experimentId],
  };

  // creating deployment
  deploymentsApi
    .createDeployment(projectId, deploymentObj)
    .then((response) => {
      dispatch(createDeploymentSuccess(response));
    })
    .catch((error) => dispatch(createDeploymentFail(error)));
};

// // // // // // // // // //

// ** UPDATE DEPLOYMENT
/**
 * update deployment success action
 *
 * @param {object} response Response object
 * @returns {object} { type, experiment }
 */
const updateDeploymentSuccess = (response) => (dispatch, getState) => {
  const currentState = getState();
  const deploymentsState = currentState.deploymentsReducer;

  const deployments = deploymentsState.map((deployment) => {
    return deployment.uuid !== response.data.uuid
      ? deployment
      : { ...deployment, ...response.data };
  });

  // dispatching update deployment success
  dispatch({
    type: actionTypes.UPDATE_DEPLOYMENT_SUCCESS,
    deployments,
  });
};

/**
 * update deployment fail action
 *
 * @param {object} error
 * @param routerProps
 * @returns {object} { type, errorMessage }
 */
const updateDeploymentFail = (error, routerProps) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching update deployment fail action response
  dispatch({
    type: actionTypes.UPDATE_DEPLOYMENT_FAIL,
    errorMessage,
  });

  message.error(errorMessage, 5);

  // check if error is 404
  if (error.response?.status === 404) {
    // redirect to error page
    routerProps.history.replace('/erro-404');
  }
};

/**
 * update deployment request action
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @param {object} deploymentObj Deployment object updated
 * @returns {Function}
 */
export const updateDeploymentRequest = (
  projectId,
  deploymentId,
  deploymentObj
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.UPDATE_DEPLOYMENT_REQUEST,
  });

  // creating deployment
  deploymentsApi
    .updateDeployment(projectId, deploymentId, deploymentObj)
    .then((response) => dispatch(updateDeploymentSuccess(response)))
    .catch((error) => dispatch(updateDeploymentFail(error)));
};

// // // // // // // // // //

// ** DELETE DEPLOYMENT
/**
 * delete deployment success action
 *
 * @param {string} deploymentId Deployment UUID
 * @returns {object} { type }
 */
const deleteDeploymentSuccess = (deploymentId) => (dispatch, getState) => {
  const currentState = getState();
  const deploymentsState = currentState.deploymentsReducer;

  const deployments = deploymentsState.filter((deployment) => {
    return deployment.uuid !== deploymentId;
  });

  // dispatching delete deployment success
  dispatch({
    type: actionTypes.DELETE_DEPLOYMENT_SUCCESS,
    deployments,
  });
};

/**
 * delete deployment fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const deleteDeploymentFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching delete deployment fail action response
  dispatch({
    type: actionTypes.DELETE_DEPLOYMENT_FAIL,
    errorMessage,
  });

  message.error(errorMessage, 5);
};

/**
 * delete deployment request action
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @returns {Function}
 */
export const deleteDeploymentRequest = (projectId, deploymentId) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.DELETE_DEPLOYMENT_REQUEST,
  });

  // deleting deployment
  deploymentsApi
    .deleteDeployment(projectId, deploymentId)
    .then(() => dispatch(deleteDeploymentSuccess(deploymentId)))
    .catch((error) => dispatch(deleteDeploymentFail(error)));
};

// // // // // // // // // //

/**
 * clear all deployments action
 *
 * @returns {Function}
 */
export const clearAllDeployments = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_ALL_DEPLOYMENTS,
  });
};

/** FIXME: Temporary solution to get all deployments runs
 *
 * On future need to be substituted by data normalization
 * on deployment reducer
 */

export const fetchAllDeploymentsRuns = (
  projectId,
  experiments,
  isToShowLoader
) => async (dispatch) => {
  if (isToShowLoader) {
    dispatch(implantedExperimentsLoadingData());
  }

  const deployments = [];

  if (experiments && experiments.length > 0) {
    for (const experiment of experiments) {
      await deploymentsRunsApi
        .fetchDeploymentRuns(projectId, experiment.uuid)
        .then((response) => {
          deployments.push(response.data);
        })
        .catch(() => {});
    }
  }
  dispatch(implantedExperimentsDataLoaded());

  return deployments;
};

/**
 * prepare deployment request action
 *
 * @param {string} experimentId The experiment Id
 * @param {string} projectId The project Id
 * @param routerProps
 * @returns {Function} dispatch function
 */
export const prepareDeployments = (experimentId, projectId, routerProps) => (
  dispatch
) => {
  // TODO
  // replace all the code below by the action
  // showPrepareDeploymentModal once it's implemented

  // dispatching request action
  dispatch(prepareDeploymentsLoadingData());

  // creating deployment object
  const deploymentObj = {
    experiments: [experimentId],
  };

  // creating deployment
  deploymentsApi
    .createDeployment(projectId, deploymentObj)
    .then((response) => {
      dispatch(prepareDeploymentsDataLoaded());

      routerProps.history.push(`/projetos/${projectId}`);
      message.success('Experimento implantado!');
    })
    .catch((error) => {
      dispatch(prepareDeploymentsDataLoaded());

      // getting error message
      const errorMessage = error.message;
      message.error(errorMessage, 5);
    });
};

export default {
  fetchDeploymentsRequest,
  createDeploymentRequest,
  updateDeploymentRequest,
  deleteDeploymentRequest,
  prepareDeployments,
};

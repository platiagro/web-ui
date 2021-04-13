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
  hidePrepareDeploymentsModal,
  newDeploymentModalStartLoading,
  newDeploymentModalEndLoading,
  hideNewDeploymentModal,
  deploymentsTabsDataLoaded,
  deploymentsTabsLoadingData,
} from 'store/ui/actions';

const ALREADY_EXIST_MESSAGE = 'Já existe uma pré-implantação com este nome!';

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
    deployments: response.data.deployments,
  });

  dispatch(implantedExperimentsDataLoaded());
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

  dispatch(implantedExperimentsDataLoaded());
};

/**
 * fetch deployments request action
 *
 * @param {string} projectId Project UUID
 * @param {boolean} isToShowLoader Whenever is to show loader or not
 * @returns {Function} The `disptach` function
 */
export const fetchDeploymentsRequest = (projectId, isToShowLoader) => async (
  dispatch
) => {
  if (isToShowLoader) {
    await dispatch(clearAllDeployments());
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

  dispatch(newDeploymentModalEndLoading());
  dispatch(hideNewDeploymentModal());
};

/**
 * create deployment fail action
 *
 * @param {object} error Response error
 * @returns {object} { type, errorMessage }
 */
const createDeploymentFail = (error) => (dispatch) => {
  const customErrorMessage = 'Selecione um experimento ou fluxo de tarefas';

  // getting error message
  let errorMessage =
    error.response === undefined ? error.message : error.response.data.message;

  // dispatching create deployment fail action response
  dispatch({
    type: actionTypes.CREATE_DEPLOYMENT_FAIL,
    errorMessage,
  });

  dispatch(newDeploymentModalEndLoading());

  errorMessage = errorMessage.includes('either')
    ? customErrorMessage
    : errorMessage;

  message.error(errorMessage, 5);
};

/**
 * Create deployment request action
 *
 * @param {string} projectId Project ID
 * @param {string=} experimentId Experiment ID
 * @param {string=} templateId Template ID
 *
 * @returns {Function} Async action
 */
export const createDeploymentRequest = (
  projectId,
  experimentId,
  templateId
) => async (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.CREATE_DEPLOYMENT_REQUEST,
  });

  dispatch(newDeploymentModalStartLoading());

  try {
    let createObject = {};

    if (experimentId) createObject = { experiments: [experimentId] };
    if (templateId) createObject = { templateId };

    const response = await deploymentsApi.createDeployment(
      projectId,
      createObject
    );

    dispatch(createDeploymentSuccess(response));
  } catch (error) {
    dispatch(createDeploymentFail(error));
  }
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
 * @param {object} error Response error
 * @param {object} routerProps Router object
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
 * @returns {Function} The `disptach` function
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

  message.success('Fluxo excluído!');
};

/**
 * delete deployment fail action
 *
 * @param {object} error Responde error
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
 * @returns {Function} The `disptach` function
 */
export const deleteDeploymentRequest = (projectId, deploymentId) => async (
  dispatch
) => {
  try {
    dispatch({ type: actionTypes.DELETE_DEPLOYMENT_REQUEST });
    dispatch(deploymentsTabsLoadingData());
    await deploymentsApi.deleteDeployment(projectId, deploymentId);
    dispatch(deleteDeploymentSuccess(deploymentId));
  } catch (e) {
    dispatch(deleteDeploymentFail(e));
  } finally {
    dispatch(deploymentsTabsDataLoaded());
  }
};

// // // // // // // // // //

/**
 * clear all deployments action
 *
 * @returns {Function} The `disptach` function
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
 * @param experiments
 * @param {string} projectId The project Id
 * @param routerProps
 * @returns {Function} dispatch function
 */
export const prepareDeployments = (experiments, projectId, routerProps) => (
  dispatch
) => {
  // close prepare deployment modal
  dispatch(hidePrepareDeploymentsModal());
  // dispatching request action
  dispatch(prepareDeploymentsLoadingData());

  // creating deployment object
  const deploymentObj = {
    experiments: experiments,
  };

  // creating deployment
  deploymentsApi
    .createDeployment(projectId, deploymentObj)
    .then(() => {
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

/**
 * Action (async) to rename deployment
 *
 * @param {object[]} deployments Deployments list
 * @param {string} projectId Project ID
 * @param {string} deploymentId Deployment ID
 * @param {string} newName New name
 * @returns {Function} Async action
 */
export function renameDeploymentRequest(
  deployments,
  projectId,
  deploymentId,
  newName
) {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.RENAME_DEPLOYMENT_REQUEST });
      dispatch(deploymentsTabsLoadingData());

      const response = await deploymentsApi.updateDeployment(
        projectId,
        deploymentId,
        { name: newName }
      );

      const updatedDeployments = deployments.map((deployment) =>
        deployment.uuid === deploymentId ? response.data : deployment
      );

      dispatch(renameDeploymentSuccess(updatedDeployments));
    } catch (error) {
      dispatch(renameDeploymentFail(error));
    } finally {
      dispatch(deploymentsTabsDataLoaded());
    }
  };
}

/**
 * Action to rename deployment success
 *
 * @param {object[]} updatedDeployments Updated deployments list
 *
 * @returns {object} Action payload
 */
function renameDeploymentSuccess(updatedDeployments) {
  return {
    type: actionTypes.RENAME_DEPLOYMENT_SUCCESS,
    deployments: updatedDeployments,
  };
}

/**
 * Action to rename deployment fail
 *
 * @param {object} error Error object
 * @returns {Function} Async action
 */
function renameDeploymentFail(error) {
  const errorMessage = error.message.includes('name already exist')
    ? ALREADY_EXIST_MESSAGE
    : error.message;

  message.error(errorMessage, 5);

  return { type: actionTypes.RENAME_DEPLOYMENT_FAIL };
}

/**
 * Action (async) to duplicate deployment
 *
 * @param {string} projectId Project ID
 * @param {string} duplicatedDeploymentId Duplicated deployment ID
 * @param {string} newDeploymentName New deployment name
 * @returns {Function} Async action
 */
export function duplicateDeploymentRequest(
  projectId,
  duplicatedDeploymentId,
  newDeploymentName
) {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.DUPLICATE_DEPLOYMENT_REQUEST });

      // TODO ------------------------------------------------------------------
      // Isso não vai funcionar porque está passando ID de deployment ao
      // invés de um ID de experiment. Para funcionar tem que fazer um outro
      // endpoint na API.
      // Esse novo endpoint tem também que receber um novo nome para o deployment.
      const response = await deploymentsApi.createDeployment(projectId, {
        newDeploymentName,
        experiments: [duplicatedDeploymentId],
      });

      const [createdDeployment] = response.data;
      dispatch(duplicateDeploymentSuccess(createdDeployment));
    } catch (error) {
      dispatch(duplicateDeploymentFail(error));
    }
  };
}

/**
 * Action to duplicate deployment success
 *
 * @param {object[]} duplicatedDeployment Duplicated deployment
 *
 * @returns {object} Action payload
 */
function duplicateDeploymentSuccess(duplicatedDeployment) {
  return {
    type: actionTypes.DUPLICATE_DEPLOYMENT_SUCCESS,
    deployment: duplicatedDeployment,
  };
}

/**
 * Action to duplicate deployment fail
 *
 * @param {object} error Error object
 * @returns {Function} Async action
 */
function duplicateDeploymentFail(error) {
  const errorMessage = error.message.includes('name already exist')
    ? ALREADY_EXIST_MESSAGE
    : error.message;

  message.error(errorMessage, 5);

  return { type: actionTypes.DUPLICATE_DEPLOYMENT_FAIL };
}

/**
 * Update Deployment Position
 *
 * @param {string} projectId Project uuid
 * @param {string} draggedDeploymentId Dragged Deployment ID
 * @param {number} currentPosition Deployment current position index
 * @param {number} newPosition Deployment new position index
 * @returns {Function} Dispatch function
 */
export const updateDeploymentPositionRequest = (
  projectId,
  draggedDeploymentId,
  currentPosition,
  newPosition
) => async (dispatch) => {
  try {
    await deploymentsApi.updateDeployment(projectId, draggedDeploymentId, {
      position: newPosition,
    });

    dispatch({
      type: actionTypes.UPDATE_DEPLOYMENT_POSITION_SUCCESS,
      currentPosition,
      newPosition,
    });
  } catch (e) {
    message.error(e.message);
    dispatch({ type: actionTypes.UPDATE_DEPLOYMENT_POSITION_FAIL });
  }
};

export default {
  fetchDeploymentsRequest,
  createDeploymentRequest,
  updateDeploymentRequest,
  deleteDeploymentRequest,
  renameDeploymentRequest,
  duplicateDeploymentRequest,
  updateDeploymentPositionRequest,
  prepareDeployments,
};

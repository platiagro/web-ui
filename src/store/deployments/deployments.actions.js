import { showError, showSuccess } from 'store/message';
import deploymentsApi from 'services/DeploymentsApi';
import { addLoading, removeLoading } from 'store/loading';

import * as DEPLOYMENTS_TYPES from './deployments.actionTypes';

import {
  hidePrepareDeploymentsModal,
  hideNewDeploymentModal,
} from 'store/ui/actions';

const ALREADY_EXIST_MESSAGE = 'Já existe uma pré-implantação com este nome!';
const AT_LEAST_ONE_OPERATOR_MESSAGE =
  'O experimento selecionado deve possuir pelo menos uma tarefa.';
const AT_LEAST_ONE_OPERATOR_MESSAGE_THAN_DATA =
  'O experimento selecionado deve possuir pelo menos uma tarefa diferente de "Conjunto de dados".';

// ACTIONS
// ** FETCH DEPLOYMENTS
/**
 * fetch deployment success action
 *
 * @param {object} response Request response
 * @param {Function} successCallback Success callback
 * @returns {object} { type, experiments }
 */
const fetchDeploymentsSuccess = (response, successCallback) => (dispatch) => {
  // dispatching fetch deployments success action
  dispatch({
    type: DEPLOYMENTS_TYPES.FETCH_DEPLOYMENTS_SUCCESS,
    deployments: response.data.deployments,
  });

  if (successCallback) successCallback(response.data.deployments);
};

/**
 * fetch deployments fail action
 *
 * @param {object} error Response error
 * @returns {object} { type, errorMessage }
 */
const fetchDeploymentsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.response?.data?.message || error.message;

  // dispatching fetch experiments fail action
  dispatch({
    type: DEPLOYMENTS_TYPES.FETCH_DEPLOYMENTS_FAIL,
    errorMessage,
  });
};

/**
 * fetch deployments request action
 *
 * @param {string} projectId Project UUID
 * @param {boolean} isToShowLoader Whenever is to show loader or not
 * @param {Function} successCallback Success callback
 * @returns {Function} The `disptach` function
 */
export const fetchDeploymentsRequest =
  (projectId, isToShowLoader, successCallback) => (dispatch) => {
    if (isToShowLoader) {
      dispatch(clearAllDeployments());
      dispatch(addLoading(DEPLOYMENTS_TYPES.FETCH_DEPLOYMENTS_REQUEST));
    }

    // fetching deployments
    deploymentsApi
      .listDeployments(projectId)
      .then((response) =>
        dispatch(fetchDeploymentsSuccess(response, successCallback))
      )
      .catch((error) => dispatch(fetchDeploymentsFail(error)))
      .finally(() => {
        dispatch(removeLoading(DEPLOYMENTS_TYPES.FETCH_DEPLOYMENTS_REQUEST));
      });
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
    type: DEPLOYMENTS_TYPES.CREATE_DEPLOYMENT_SUCCESS,
    deployments: response.data.deployments,
  });

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

  let errorMessage = error.response?.data?.message || error.message;

  if (errorMessage.includes('either')) {
    errorMessage = customErrorMessage;
  } else if (
    errorMessage.includes('least one operator that is not a data source')
  ) {
    errorMessage = AT_LEAST_ONE_OPERATOR_MESSAGE_THAN_DATA;
  } else if (errorMessage.includes('least one operator.')) {
    errorMessage = AT_LEAST_ONE_OPERATOR_MESSAGE;
  }

  dispatch({
    type: DEPLOYMENTS_TYPES.CREATE_DEPLOYMENT_FAIL,
  });

  dispatch(showError(errorMessage));
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
export const createDeploymentRequest =
  (projectId, experimentId, templateId) => async (dispatch) => {
    // dispatching request action
    dispatch({
      type: DEPLOYMENTS_TYPES.CREATE_DEPLOYMENT_REQUEST,
    });

    dispatch(addLoading(DEPLOYMENTS_TYPES.CREATE_DEPLOYMENT_REQUEST));

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
    } finally {
      dispatch(removeLoading(DEPLOYMENTS_TYPES.CREATE_DEPLOYMENT_REQUEST));
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
    type: DEPLOYMENTS_TYPES.UPDATE_DEPLOYMENT_SUCCESS,
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
  const errorMessage = error.response?.data?.message || error.message;

  // dispatching update deployment fail action response
  dispatch({
    type: DEPLOYMENTS_TYPES.UPDATE_DEPLOYMENT_FAIL,
  });

  dispatch(showError(errorMessage));

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
export const updateDeploymentRequest =
  (projectId, deploymentId, deploymentObj) => (dispatch) => {
    // dispatching request action
    dispatch({
      type: DEPLOYMENTS_TYPES.UPDATE_DEPLOYMENT_REQUEST,
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
    type: DEPLOYMENTS_TYPES.DELETE_DEPLOYMENT_SUCCESS,
    deployments,
  });

  dispatch(showSuccess('Fluxo excluído!'));
};

/**
 * delete deployment fail action
 *
 * @param {object} error Responde error
 * @returns {object} { type, errorMessage }
 */
const deleteDeploymentFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.response?.data?.message || error.message;

  // dispatching delete deployment fail action response
  dispatch({
    type: DEPLOYMENTS_TYPES.DELETE_DEPLOYMENT_FAIL,
  });

  dispatch(showError(errorMessage));
};

/**
 * delete deployment request action
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @returns {Function} The `disptach` function
 */
export const deleteDeploymentRequest =
  (projectId, deploymentId) => async (dispatch) => {
    try {
      dispatch({ type: DEPLOYMENTS_TYPES.DELETE_DEPLOYMENT_REQUEST });
      dispatch(addLoading(DEPLOYMENTS_TYPES.DELETE_DEPLOYMENT_REQUEST));
      await deploymentsApi.deleteDeployment(projectId, deploymentId);
      dispatch(deleteDeploymentSuccess(deploymentId));
    } catch (e) {
      dispatch(deleteDeploymentFail(e));
    } finally {
      dispatch(removeLoading(DEPLOYMENTS_TYPES.DELETE_DEPLOYMENT_REQUEST));
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
    type: DEPLOYMENTS_TYPES.CLEAR_ALL_DEPLOYMENTS,
  });
};

/**
 * prepare deployment request action
 *
 * @param {object} experiments Experiments
 * @param {string} projectId The project Id
 * @param {object} history Router history
 * @returns {Function} Dispatch function
 */
export const prepareDeployments =
  (experiments, projectId, history) => (dispatch) => {
    dispatch(hidePrepareDeploymentsModal());
    dispatch(addLoading(DEPLOYMENTS_TYPES.CREATE_DEPLOYMENT_REQUEST));

    const deploymentObj = {
      experiments: experiments,
    };

    deploymentsApi
      .createDeployment(projectId, deploymentObj)
      .then(() => {
        history.push(`/projetos/${projectId}/pre-implantacao`);
        dispatch(showSuccess('Experimento implantado!'));
      })
      .catch((error) => {
        let errorMessage = error.response?.data?.message || error.message;
        if (
          errorMessage.includes('least one operator that is not a data source')
        ) {
          errorMessage = AT_LEAST_ONE_OPERATOR_MESSAGE_THAN_DATA;
        } else if (errorMessage.includes('least one operator.')) {
          errorMessage = AT_LEAST_ONE_OPERATOR_MESSAGE;
        }

        dispatch(showError(errorMessage));
      })
      .finally(() => {
        dispatch(removeLoading(DEPLOYMENTS_TYPES.CREATE_DEPLOYMENT_REQUEST));
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
      dispatch({ type: DEPLOYMENTS_TYPES.RENAME_DEPLOYMENT_REQUEST });
      dispatch(addLoading(DEPLOYMENTS_TYPES.RENAME_DEPLOYMENT_REQUEST));

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
      dispatch(removeLoading(DEPLOYMENTS_TYPES.RENAME_DEPLOYMENT_REQUEST));
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
    type: DEPLOYMENTS_TYPES.RENAME_DEPLOYMENT_SUCCESS,
    deployments: updatedDeployments,
  };
}

/**
 * Action to rename deployment fail
 *
 * @param {object} error Responde error
 * @returns {object} { type, errorMessage }
 */
const renameDeploymentFail = (error) => (dispatch) => {
  let errorMessage = error.response?.data?.message || error.message;

  if (errorMessage.includes('name already exist')) {
    errorMessage = ALREADY_EXIST_MESSAGE;
  }

  dispatch({
    type: DEPLOYMENTS_TYPES.RENAME_DEPLOYMENT_FAIL,
  });

  dispatch(showError(errorMessage));
};

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
      dispatch({ type: DEPLOYMENTS_TYPES.DUPLICATE_DEPLOYMENT_REQUEST });

      const response = await deploymentsApi.createDeployment(projectId, {
        name: newDeploymentName,
        copyFrom: duplicatedDeploymentId,
      });

      const deployments = response.data.deployments;
      dispatch(duplicateDeploymentSuccess(deployments));
    } catch (error) {
      dispatch(duplicateDeploymentFail(error));
    }
  };
}

/**
 * Action to duplicate deployment success
 *
 * @param {object[]} deployments Duplicated deployment
 *
 * @returns {object} Action payload
 */
function duplicateDeploymentSuccess(deployments) {
  return {
    type: DEPLOYMENTS_TYPES.DUPLICATE_DEPLOYMENT_SUCCESS,
    deployments: deployments,
  };
}

/**
 * Action to duplicate deployment fail
 *
 * @param {object} error Responde error
 * @returns {object} { type, errorMessage }
 */
const duplicateDeploymentFail = (error) => (dispatch) => {
  let errorMessage = error.response?.data?.message || error.message;

  if (errorMessage.includes('name already exist')) {
    errorMessage = ALREADY_EXIST_MESSAGE;
  }

  dispatch({
    type: DEPLOYMENTS_TYPES.DUPLICATE_DEPLOYMENT_FAIL,
  });

  dispatch(showError(errorMessage));
};

/**
 * Update Deployment Position
 *
 * @param {string} projectId Project uuid
 * @param {string} draggedDeploymentId Dragged Deployment ID
 * @param {number} currentPosition Deployment current position index
 * @param {number} newPosition Deployment new position index
 * @returns {Function} Dispatch function
 */
export const updateDeploymentPositionRequest =
  (projectId, draggedDeploymentId, currentPosition, newPosition) =>
  async (dispatch) => {
    try {
      await deploymentsApi.updateDeployment(projectId, draggedDeploymentId, {
        position: newPosition,
      });

      dispatch({
        type: DEPLOYMENTS_TYPES.UPDATE_DEPLOYMENT_POSITION_SUCCESS,
        currentPosition,
        newPosition,
      });
    } catch (e) {
      const errorMessage = e.response?.data?.message || e.message;
      dispatch(showError(errorMessage));
      dispatch({ type: DEPLOYMENTS_TYPES.UPDATE_DEPLOYMENT_POSITION_FAIL });
    }
  };

import { message } from 'antd';

import { addLoading, removeLoading } from 'store/loading';
import deploymentRunsApi from 'services/DeploymentRunsApi';
import {
  implantedExperimentsLoadingData,
  implantedExperimentsDataLoaded,
} from 'store/ui/actions';

import actionTypes from './actionTypes';

/**
 * Fetch deployment runs success action
 *
 * @param {object} response Response body
 * @returns {object} { type, deployment }
 */
const fetchDeploymentRunsSuccess = (response) => (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_DEPLOYMENT_RUNS_SUCCESS,
    deploymentRuns: response.data,
  });
};

/**
 * Fetch deployment runs fail action
 *
 * @param {object} error Error
 * @returns {object} { type, errorMessage }
 */
const fetchDeploymentRunsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching fetch deployment runs fail action response
  dispatch({
    type: actionTypes.FETCH_DEPLOYMENT_RUNS_FAIL,
    errorMessage,
  });
};

/**
 * Fetch deployment runs request action
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @param {boolean} isToShowLoader Whenever is to show loader
 * @returns {Function} `Dispatch function`
 */
const fetchDeploymentRunsRequest =
  (projectId, deploymentId, isToShowLoader) => (dispatch) => {
    if (isToShowLoader) {
      dispatch(implantedExperimentsLoadingData());
    }

    // dispatching request action
    dispatch({
      type: actionTypes.FETCH_DEPLOYMENT_RUNS_REQUEST,
    });

    // fetching experiment
    deploymentRunsApi
      .fetchDeploymentRuns(projectId, deploymentId)
      .then((response) => {
        dispatch(fetchDeploymentRunsSuccess(response));
      })
      .catch((error) => {
        dispatch(fetchDeploymentRunsFail(error));
      });

    dispatch(implantedExperimentsDataLoaded());
  };

/**
 * Create deployment run success action
 *
 * @param {string} projectId Project UUID
 * @param {object} response Response
 * @param {object} history History
 * @returns {object} { type }
 */
const createDeploymentRunSuccess =
  (projectId, response, history) => (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_DEPLOYMENT_RUN_SUCCESS,
      runId: response.data.uuid,
    });

    history.push(`/projetos/${projectId}`);
    message.success('Experimento implantado!');
  };

/**
 * Create deployment run fail action
 *
 * @param {object} error Error
 * @returns {object} { type }
 */
const createDeploymentRunFail = (error) => (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_DEPLOYMENT_RUN_FAIL,
  });

  const errorMessage = error.message;
  message.error(errorMessage, 5);
};

/**
 * Create deployment run request
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment Id
 * @param {object} history History
 * @returns {Function} Dispatch function
 */
const createDeploymentRunRequest =
  (projectId, deploymentId, history) => (dispatch) => {
    dispatch(addLoading(actionTypes.CREATE_DEPLOYMENT_RUN_REQUEST));

    dispatch({
      type: actionTypes.CREATE_DEPLOYMENT_RUN_REQUEST,
    });

    deploymentRunsApi
      .createDeploymentRun(projectId, deploymentId)
      .then((response) =>
        dispatch(createDeploymentRunSuccess(projectId, response, history))
      )
      .catch((error) => dispatch(createDeploymentRunFail(error)))
      .finally(() => {
        dispatch(removeLoading(actionTypes.CREATE_DEPLOYMENT_RUN_REQUEST));
      });
  };

/**
 * Delete deployment run success action
 *
 * @param {object} response Response
 * @returns {object} { type }
 */
const deleteDeploymentRunSuccess = (response) => (dispatch, getState) => {
  dispatch(implantedExperimentsLoadingData());

  const currentState = getState();
  const deploymentRuns = currentState.deploymentRunsReducer;

  const runs = deploymentRuns.filter((run) => {
    return run.runId !== response.data.runId;
  });

  dispatch({
    type: actionTypes.DELETE_DEPLOYMENT_RUN_SUCCESS,
    runs,
  });
};

/**
 * Delete deployment run fail action
 *
 * @param {object} error Error
 * @returns {object} { type }
 */
const deleteDeploymentRunFail = (error) => (dispatch) => {
  dispatch(implantedExperimentsLoadingData());

  dispatch({
    type: actionTypes.DELETE_DEPLOYMENT_RUN_FAIL,
  });

  const errorMessage = error.message;
  message.error(errorMessage);
};

/**
 * Delete deployment run request
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId DeploymentUUID
 * @returns {Function} Dispatch function
 */
export const deleteDeploymentRunRequest =
  (projectId, deploymentId) => (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_DEPLOYMENT_RUN_REQUEST,
    });

    dispatch(implantedExperimentsLoadingData());

    deploymentRunsApi
      .deleteDeploymentRun(projectId, deploymentId, 'latest')
      .then((response) => dispatch(deleteDeploymentRunSuccess(response)))
      .catch((error) => dispatch(deleteDeploymentRunFail(error)));
  };

export default {
  fetchDeploymentRunsRequest,
  createDeploymentRunRequest,
  deleteDeploymentRunRequest,
};

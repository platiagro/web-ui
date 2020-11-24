// UI LIB
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICE
import deploymentsApi from 'services/DeploymentsApi';

// UTILS
import utils from 'utils';

// UI ACTIONS
import {
  implantedExperimentsLoadingData,
  implantedExperimentsDataLoaded,
} from 'store/ui/actions';

const { getErrorMessage } = utils;

/**
 * Fetch deployed experiments
 * @param {object[]} experiments
 * @param {Boolean} isToShowLoader
 */
export const fetchDeployedExperiments = (
  projectId,
  experiments,
  isToShowLoader
) => async (dispatch) => {
  if (isToShowLoader) {
    dispatch(implantedExperimentsLoadingData());
  }

  const deployments = [];
  if (experiments && experiments.length > 0) {
    dispatch({
      type: actionTypes.FETCH_DEPLOYED_EXPERIMENTS_REQUEST,
    });
    for (const experiment of experiments) {
      await deploymentsApi
        .fetchDeployedExperiment(projectId, experiment.uuid)
        .then((response) => {
          deployments.push(response.data);
        })
        .catch((error) => {});
    }
  }
  dispatch(implantedExperimentsDataLoaded());
  dispatch({
    type: actionTypes.FETCH_DEPLOYED_EXPERIMENTS,
    deployments: deployments,
  });
};

/**
 * Delete deployed experiment
 * @param {String} experimentId
 */
export const deleteDeployedExperiment = (projectId, experimentId) => (
  dispatch
) => {
  dispatch(implantedExperimentsLoadingData());
  dispatch({
    type: actionTypes.DELETE_DEPLOYED_EXPERIMENT_REQUEST,
  });
  deploymentsApi
    .deleteDeployedExperiments(projectId, experimentId)
    .then((response) => {
      dispatch(implantedExperimentsDataLoaded());
      dispatch({
        type: actionTypes.DELETE_DEPLOYED_EXPERIMENT,
        experimentId,
      });
    })
    .catch((error) => {
      dispatch(implantedExperimentsDataLoaded());
      dispatch({
        type: actionTypes.DELETE_DEPLOYED_EXPERIMENT_FAIL,
      });
      message.error(getErrorMessage(error));
    });
};

export const fetchDeploymentsRequest = (projectId) => (dispatch) => {
  dispatch(implantedExperimentsLoadingData());
  dispatch({
    type: actionTypes.FETCH_DEPLOYMENTS_REQUEST,
  });

  deploymentsApi
    .listDeployments(projectId)
    .then((response) => {
      dispatch(implantedExperimentsDataLoaded());

      //On success
      dispatch({
        type: actionTypes.FETCH_DEPLOYMENTS_SUCCESS,
        deployments: response,
      });
    })
    .catch((error) => {
      dispatch(implantedExperimentsDataLoaded());

      //On fail
      dispatch({
        type: actionTypes.FETCH_DEPLOYMENTS_FAIL,
      });
      message.error(getErrorMessage(error));
    });
};

export const createDeploymentsRequest = (projectId, body) => (dispatch) => {
  dispatch(implantedExperimentsLoadingData());
  dispatch({
    type: actionTypes.CREATE_DEPLOYMENT_REQUEST,
  });

  deploymentsApi
    .createDeployment(projectId, body)
    .then((response) => {
      dispatch(implantedExperimentsDataLoaded());

      //On success
      dispatch({
        type: actionTypes.CREATE_DEPLOYMENT_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch(implantedExperimentsDataLoaded());

      //On fail
      dispatch({
        type: actionTypes.CREATE_DEPLOYMENT_FAIL,
      });
      message.error(getErrorMessage(error));
    });
};

export const deleteDeploymentRequest = (projectId, deploymentId) => (
  dispatch
) => {
  dispatch(implantedExperimentsLoadingData());
  dispatch({
    type: actionTypes.DELETE_DEPLOYMENT_REQUEST,
  });

  deploymentsApi
    .deleteDeployment(projectId, deploymentId)
    .then((response) => {
      dispatch(implantedExperimentsDataLoaded());

      //On success
      dispatch({
        type: actionTypes.DELETE_DEPLOYMENT_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch(implantedExperimentsDataLoaded());

      //On fail
      dispatch({
        type: actionTypes.DELETE_DEPLOYMENT_FAIL,
      });
      message.error(getErrorMessage(error));
    });
};

export const updateDeployment = (projectId, deploymentId, body) => (
  dispatch
) => {
  dispatch(implantedExperimentsLoadingData());
  dispatch({
    type: actionTypes.UPDATE_DEPLOYMENT_REQUEST,
  });

  deploymentsApi
    .updateDeployment(projectId, deploymentId, body)
    .then((response) => {
      dispatch(implantedExperimentsDataLoaded());

      //On success
      dispatch({
        type: actionTypes.UPDATE_DEPLOYMENT_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch(implantedExperimentsDataLoaded());

      //On fail
      dispatch({
        type: actionTypes.UPDATE_DEPLOYMENT_FAIL,
      });
      message.error(getErrorMessage(error));
    });
};

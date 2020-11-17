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
export const fetchDeployedExperiments = (experiments, isToShowLoader) => async (
  dispatch
) => {
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
        .fetchDeployedExperiment(experiment.uuid)
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
export const deleteDeploymentRequest = (experimentId) => (dispatch) => {
  dispatch(implantedExperimentsLoadingData());
  dispatch({
    type: actionTypes.DELETE_DEPLOYED_EXPERIMENT_REQUEST,
  });
  deploymentsApi
    .deleteDeployedExperiments(experimentId)
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

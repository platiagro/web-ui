// UI LIB
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICE
import implantedExperimentsApi from 'services/ImplantedExperimentsApi';

// UTILS
import utils from 'utils';

// UI ACTIONS
import {
  implantedExperimentsLoadingData,
  implantedExperimentsDataLoaded,
} from 'store/ui/actions';

const { getErrorMessage } = utils;

/**
 * Fetch implanted experiments
 * @param {object[]} experiments
 * @param {Boolean} isToShowLoader
 */
export const fetchImplantedExperiments = (
  experiments,
  isToShowLoader
) => async (dispatch) => {
  if (isToShowLoader) {
    dispatch(implantedExperimentsLoadingData());
  }

  const implantedExperiments = [];
  if (experiments && experiments.length > 0) {
    dispatch({
      type: actionTypes.FETCH_IMPLANTED_EXPERIMENTS_REQUEST,
    });
    for (const experiment of experiments) {
      await implantedExperimentsApi
        .getDeployedExperiment(experiment.uuid)
        .then((response) => {
          implantedExperiments.push(response.data);
        })
        .catch((error) => {});
    }
  }
  dispatch(implantedExperimentsDataLoaded());
  dispatch({
    type: actionTypes.FETCH_IMPLANTED_EXPERIMENTS,
    implantedExperiments: implantedExperiments,
  });
};

/**
 * Delete implanted experiment
 * @param {String} implantedExperimentUuid
 */
export const deleteImplantedExperiment = (experimentId) => (dispatch) => {
  dispatch(implantedExperimentsLoadingData());
  dispatch({
    type: actionTypes.DELETE_IMPLANTED_EXPERIMENT_REQUEST,
  });
  implantedExperimentsApi
    .deleteDeployedExperiments(experimentId)
    .then((response) => {
      dispatch(implantedExperimentsDataLoaded());
      dispatch({
        type: actionTypes.DELETE_IMPLANTED_EXPERIMENT,
        experimentId,
      });
    })
    .catch((error) => {
      dispatch(implantedExperimentsDataLoaded());
      dispatch({
        type: actionTypes.DELETE_IMPLANTED_EXPERIMENT_FAIL,
      });
      message.error(getErrorMessage(error));
    });
};

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
} from '../ui/actions';

// DESTRUCTURING UTILS
const { getErrorMessage } = utils;

// ACTIONS
/**
 * fetch implanted experiments action
 * @returns {type, implantedExperiments}
 */

/**
 * fetch implanted experiments success action
 * @param {Object} response
 * @returns {Object} { type, implanted }
 */
const implantedExperimentsSuccess = (response) => (dispatch) => {
  // getting implanted experiments from response
  const implanted = response.data;

  // dispatching implanted experiments table data loaded action
  dispatch(implantedExperimentsDataLoaded());

  // dispatching fetch implanted experiments success action
  dispatch({
    type: actionTypes.FETCH_IMPLANTED_EXPERIMENTS,
    implantedExperiments: implanted,
  });
};

/**
 * fetch implanted experiments fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const implantedExperimentsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching implanted experiments table data loaded action
  dispatch(implantedExperimentsDataLoaded());

  // dispatching fetch implanted experiments fail action
  dispatch({
    type: actionTypes.FETCH_IMPLANTED_EXPERIMENTS_FAIL,
    errorMessage,
  });

  message.error(errorMessage);
};

export const fetchImplantedExperiments = () => (dispatch) => {
  dispatch(implantedExperimentsLoadingData());
  // fetching experiment
  implantedExperimentsApi
    .getDeployedExperiments()
    .then((response) => dispatch(implantedExperimentsSuccess(response)))
    .catch((error) => dispatch(implantedExperimentsFail(error)));
};

/**
 * delete implanted experiment action
 * @param {string} implantedExperimentUuid
 * @returns {type, implantedExperiments}
 */
export const deleteImplantedExperiment = (implantedExperimentUuid) => (
  dispatch
) => {
  dispatch(implantedExperimentsLoadingData());
  // fetching experiment
  implantedExperimentsApi
    .deleteDeployedExperiments(implantedExperimentUuid)
    .then((response) => dispatch(deleteImplantedExperimentSuccess(response)))
    .catch((error) => dispatch(deleteimplantedExperimentsFail(error)));
};

const deleteImplantedExperimentSuccess = (response) => (dispatch) => {
  dispatch(fetchImplantedExperiments());
};

const deleteimplantedExperimentsFail = (error) => (dispatch) => {
  console.log(error);
  message.error(getErrorMessage(error));
  dispatch(implantedExperimentsDataLoaded());
};

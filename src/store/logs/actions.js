// UI LIB
import { message } from 'antd';

// UTILS
import utils from 'utils';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import logsApi from 'services/LogsApi';

//ACTIONS
import {
  showDrawer,
  implantedExperimentsLoadingData,
  implantedExperimentsDataLoaded,
} from '../ui/actions';

// DESTRUCTURING UTILS
const { getErrorMessage } = utils;

// ACTIONS
/**
 * @param {Object} response
 */
const getLogsSuccess = (response) => (dispatch) => {
  const logs = response.data;

  dispatch({
    type: actionTypes.GET_DEPLOYMENT_LOGS,
    payload: logs,
  });

  dispatch(showDrawer('Logs', false));
  dispatch(implantedExperimentsDataLoaded());
};

/**
 * @param {Object} error
 */
const getLogsFail = (error) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_DEPLOYMENT_LOGS_FAIL,
  });
  message.error(getErrorMessage(error));
  dispatch(implantedExperimentsDataLoaded());
};

/**
 * get error logs of implanted experiments
 * @param {Object} deployId
 * @returns {Function}
 */
export const getDeployExperimentLogs = (deployId) => async (dispatch) => {
  dispatch(implantedExperimentsLoadingData());

  logsApi
    .getDeployExperimentLogs(deployId)
    .then((res) => {
      dispatch(getLogsSuccess(res));
    })
    .catch((error) => {
      dispatch(getLogsFail(error));
    });
};

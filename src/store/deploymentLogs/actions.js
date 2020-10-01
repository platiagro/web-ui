// UI LIB
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// ACTIONS
import {
  showInferenceLogsDrawer,
  inferenceLogsDrawerLoadingData,
  inferenceLogsDrawerDataLoaded,
} from '../ui/actions';

// SERVICES
import logsApi from 'services/LogsApi';

// UTILS
import utils from 'utils';

const { getErrorMessage } = utils;

/**
 * Get logs of implanted experiments
 *
 * @param {String} deployId
 */
export const getDeployExperimentLogs = (deployId) => (dispatch) => {
  dispatch(showInferenceLogsDrawer('Logs'));
  dispatch(inferenceLogsDrawerLoadingData());
  logsApi
    .getDeployExperimentLogs(deployId)
    .then((response) => {
      const logs = response.data;
      dispatch({
        type: actionTypes.GET_DEPLOYMENT_LOGS,
        payload: logs,
      });
      dispatch(inferenceLogsDrawerDataLoaded());
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.GET_DEPLOYMENT_LOGS_FAIL,
      });
      message.error(getErrorMessage(error));
      dispatch(inferenceLogsDrawerDataLoaded());
    });
};

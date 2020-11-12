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
import deploymentsApi from 'services/DeploymentsApi';

// UTILS
import utils from 'utils';

const { getErrorMessage } = utils;

/**
 * Get logs of implanted experiments
 *
 * @param {string} deployId
 */
export const fetchDeployExperimentLogs = (deployId) => (dispatch) => {
  dispatch(showInferenceLogsDrawer('Logs'));
  dispatch(inferenceLogsDrawerLoadingData());
  deploymentsApi
    .fetchDeployedExperimentLogs(deployId)
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

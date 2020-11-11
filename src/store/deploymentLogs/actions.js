// UI LIB
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// ACTIONS
import {
  fetchShowInferenceLogsDrawer,
  inferenceLogsDrawerLoadingData,
  fetchInferenceLogsDrawerDataLoaded,
} from '../ui/actions';

// SERVICES
import implantedExperimentsApi from 'services/ImplantedExperimentsApi';

// UTILS
import utils from 'utils';

const { getErrorMessage } = utils;

/**
 * Get logs of implanted experiments
 *
 * @param {string} deployId
 */
export const getDeployExperimentLogs = (deployId) => (dispatch) => {
  dispatch(fetchShowInferenceLogsDrawer('Logs'));
  dispatch(inferenceLogsDrawerLoadingData());
  implantedExperimentsApi
    .getDeployedExperimentLogs(deployId)
    .then((response) => {
      const logs = response.data;
      dispatch({
        type: actionTypes.GET_DEPLOYMENT_LOGS,
        payload: logs,
      });
      dispatch(fetchInferenceLogsDrawerDataLoaded());
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.GET_DEPLOYMENT_LOGS_FAIL,
      });
      message.error(getErrorMessage(error));
      dispatch(fetchInferenceLogsDrawerDataLoaded());
    });
};

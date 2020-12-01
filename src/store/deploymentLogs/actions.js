// UI LIB
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// ACTIONS
import {
  hideInferenceLogsDrawer,
  showInferenceLogsDrawer,
  inferenceLogsDrawerLoadingData,
  inferenceLogsDrawerDataLoaded,
} from 'store/ui/actions';

// SERVICES
import deploymentsApi from 'services/DeploymentsApi';

// UTILS
import utils from 'utils';

const { getErrorMessage } = utils;

/**
 * Get logs of implanted experiments
 *
 * @param {String} deployId
 */
export const getDeployExperimentLogs = (projectId, deployId, deployStatus) => (
  dispatch
) => {
  dispatch(showInferenceLogsDrawer('Logs'));
  dispatch(inferenceLogsDrawerLoadingData());
  deploymentsApi
    .fetchDeployedExperimentLogs(projectId, deployId, 'latest')
    .then((response) => {
      const logs = response.data;
      dispatch({
        type: actionTypes.GET_DEPLOYMENT_LOGS,
        payload: logs,
      });
      dispatch(inferenceLogsDrawerDataLoaded());
    })
    .catch(async (error) => {
      dispatch({
        type: actionTypes.GET_DEPLOYMENT_LOGS_FAIL,
      });
      await utils.sleep(1000);
      dispatch(inferenceLogsDrawerDataLoaded());
      dispatch(hideInferenceLogsDrawer());
      if (deployStatus === 'Running') {
        message.info('Fluxo em implantação!');
      } else {
        message.error(getErrorMessage(error));
      }
    });
};

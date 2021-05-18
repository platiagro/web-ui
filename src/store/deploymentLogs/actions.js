import {
  showInferenceLogsDrawer,
  inferenceLogsDrawerLoadingData,
  inferenceLogsDrawerDataLoaded,
} from 'store/ui/actions';
import deploymentsApi from 'services/DeploymentRunsApi';
import utils from 'utils';

import actionTypes from './actionTypes';
import { showError } from 'store/message';

/**
 * Get logs of implanted experiments (deployment logs)
 *
 * @param {string} projectId Project ID
 * @param {string} deployId Deployment ID
 * @param {boolean} shouldShowLogsDrawer Should open the logs drawer?
 * @returns {Function} Dispatch function
 */
export const getDeployExperimentLogs =
  (projectId, deployId, shouldShowLogsDrawer = true) =>
  async (dispatch) => {
    try {
      if (shouldShowLogsDrawer) dispatch(showInferenceLogsDrawer('Logs'));
      dispatch(inferenceLogsDrawerLoadingData());

      const response = await deploymentsApi.fetchDeploymentRunLogs(
        projectId,
        deployId,
        'latest'
      );

      dispatch({
        type: actionTypes.GET_DEPLOYMENT_LOGS,
        payload: response.data?.logs || [],
      });
    } catch (e) {
      dispatch({ type: actionTypes.GET_DEPLOYMENT_LOGS_FAIL });
      dispatch(showError(utils.getErrorMessage(e)));
    } finally {
      dispatch(inferenceLogsDrawerDataLoaded());
    }
  };

/**
 * CLear all deployment logs
 *
 * @returns {object} Action
 */
export const clearAllDeploymentLogs = () => {
  return {
    type: actionTypes.CLEAR_ALL_DEPLOYMENT_LOGS,
  };
};

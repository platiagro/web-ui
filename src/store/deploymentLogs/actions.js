import utils from 'utils';
import { showError } from 'store/message';
import deploymentsApi from 'services/DeploymentRunsApi';
import { addLoading, removeLoading } from 'store/loading';
import { showInferenceLogsDrawer } from 'store/ui/actions';

import actionTypes from './actionTypes';

/**
 * Get logs of implanted experiments (deployment logs)
 *
 * @param {string} projectId Project ID
 * @param {string} deployId Deployment ID
 * @param {boolean} shouldShowLogsDrawer Should open the logs drawer?
 * @param {boolean} shouldShowLoading Should show the loading?
 * @returns {Function} Dispatch function
 */
export const getDeployExperimentLogs =
  (
    projectId,
    deployId,
    shouldShowLogsDrawer = true,
    shouldShowLoading = true
  ) =>
  async (dispatch) => {
    try {
      if (shouldShowLogsDrawer) dispatch(showInferenceLogsDrawer('Logs'));
      if (shouldShowLoading)
        dispatch(addLoading(actionTypes.GET_DEPLOYMENT_LOGS));

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
      dispatch(removeLoading(actionTypes.GET_DEPLOYMENT_LOGS));
    }
  };

/**
 * Clear all deployment logs
 *
 * @returns {object} Action
 */
export const clearAllDeploymentLogs = () => {
  return {
    type: actionTypes.CLEAR_ALL_DEPLOYMENT_LOGS,
  };
};

/**
 * Append deployment log in logs array
 *
 *  @param {object} log Log
 * @returns {object} Action
 */
export const appendDeploymentLog = (log) => {
  return {
    type: actionTypes.APPEND_DEPLOYMENT_LOG,
    payload: {
      log,
    },
  };
};

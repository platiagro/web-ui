import { message } from 'antd';

import utils from 'utils';
import experimentRunsApi from 'services/ExperimentRunsApi';

import actionTypes from './actionTypes';

/**
 * Get experiment logs success action
 *
 * @param {Array} logs Logs array
 * @returns {object} Action
 */
const getExperimentLogsSucceed = (logs = []) => ({
  type: actionTypes.GET_EXPERIMENT_LOGS_SUCCESS,
  payload: {
    logs,
  },
});

/**
 * Get experiment logs fail action
 *
 * @returns {object} Action
 */
const getExperimentLogsFailed = () => ({
  type: actionTypes.GET_EXPERIMENT_LOGS_FAIL,
});

/**
 * Set the loading state
 *
 * @param {boolean} isLoading True if it is loading or false if not
 * @returns {object} Action
 */
const setIsLoadingLogs = (isLoading = false) => ({
  type: actionTypes.SET_IS_LOADING_LOGS,
  payload: {
    isLoading,
  },
});

/**
 * Get logs of implanted experiments (deployment logs)
 *
 * @param {string} projectId Project ID
 * @param {string} experimentId Deployment ID
 * @returns {Function} Dispatch function
 */
export const getExperimentLogs = (projectId, experimentId) => async (
  dispatch
) => {
  try {
    dispatch(setIsLoadingLogs(true));

    const response = await experimentRunsApi.fetchExperimentLogs(
      projectId,
      experimentId,
      'latest'
    );

    const logs = response.data?.logs || [];
    dispatch(getExperimentLogsSucceed(logs));
  } catch (e) {
    dispatch(getExperimentLogsFailed());
    message.error(utils.getErrorMessage(e), 5);
  } finally {
    dispatch(setIsLoadingLogs(false));
  }
};

/**
 * Clear all experiment logs
 *
 * @returns {object} Action
 */
export const clearAllExperimentLogs = () => ({
  type: actionTypes.CLEAR_ALL_EXPERIMENT_LOGS,
});

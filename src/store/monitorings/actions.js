import MonitoringsApi from 'services/MonitoringsApi';
import actionTypes from './actionTypes';

/**
 * Fetch monitorings from the API
 * 
 * @param {string} projectId Project ID
 * @param {string} deploymentId Deployment ID
 * @returns {Promise} Request
 */
export const fetchMonitorings = (projectId, deploymentId) => async (dispatch) => {
  try {
    const response = await MonitoringsApi.fetchMonitorings(
      projectId, deploymentId
    )

    dispatch(fetchMonitoringsSuccess(response.data))
  } catch (e) {
    dispatch(fetchMonitoringsFail())
  }
};

/**
 * Fetch monitorings success
 * 
 * @param {Array} monitorings Monitorings list
 * @returns {object} { type, payload }
 */
export const fetchMonitoringsSuccess = (monitorings = []) => ({
  type: actionTypes.FETCH_MONITORINGS_SUCCESS,
  payload: {
    monitorings,
  }
});

/**
 * Fetch monitorings fail
 * 
 * @returns {object} { type }
 */
export const fetchMonitoringsFail = () => ({
  type: actionTypes.FETCH_MONITORINGS_FAIL,
});

/**
 * Create a new monitoring
 * 
 * @param {object} requestData Request data
 * @param {string} requestData.projectId Project ID
 * @param {string} requestData.deploymentId Deployment ID
 * @param {string} requestData.taskId Task ID
 * @returns {Promise} Request
 */
export const createMonitoring = ({
  projectId,
  deploymentId,
  taskId
}) => async (dispatch) => {
  try {
    await MonitoringsApi.createMonitoring({
      projectId,
      deploymentId,
      taskId
    })

    dispatch(createMonitoringsSuccess())
  } catch (e) {
    dispatch(createMonitoringsFail())
  }
};

/**
 * Create monitoring success
 * 
 * @returns {object} { type }
 */
export const createMonitoringsSuccess = () => ({
  type: actionTypes.CREATE_MONITORINGS_SUCCESS,
});

/**
 * Create monitoring fail
 * 
 * @returns {object} { type }
 */
export const createMonitoringsFail = () => ({
  type: actionTypes.CREATE_MONITORINGS_FAIL,
});

/**
 * Create a new monitoring
 * 
 * @param {object} requestData Request data
 * @param {string} requestData.projectId Project ID
 * @param {string} requestData.deploymentId Deployment ID
 * @param {string} requestData.monitoringId Monitoring ID
 * @returns {Promise} Request
 */
export const deleteMonitoring = ({
  projectId,
  deploymentId,
  monitoringId
}) => async (dispatch) => {
  try {
    await MonitoringsApi.deleteMonitoring({
      projectId,
      deploymentId,
      monitoringId
    })

    dispatch(deleteMonitoringsSuccess())
  } catch (e) {
    dispatch(deleteMonitoringsFail())
  }
};

/**
 * Delete monitoring success
 * 
 * @returns {object} { type }
 */
export const deleteMonitoringsSuccess = () => ({
  type: actionTypes.DELETE_MONITORINGS_SUCCESS,
});

/**
 * Delete monitoring fail
 * 
 * @returns {object} { type }
 */
export const deleteMonitoringsFail = () => ({
  type: actionTypes.DELETE_MONITORINGS_FAIL,
});
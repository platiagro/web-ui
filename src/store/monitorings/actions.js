import { message } from 'antd';

import MonitoringsApi from 'services/MonitoringsApi';

import {
  setLoadingMonitorings,
  setCreatingMonitoring,
  setDeletingMonitoring
} from '../ui/actions';

import actionTypes from './actionTypes';

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
 * Fetch monitorings from the API
 * 
 * @param {string} projectId Project ID
 * @param {string} deploymentId Deployment ID
 * @returns {Promise} Request
 */
export const fetchMonitorings = (projectId, deploymentId) => async (dispatch) => {
  try {
    dispatch(setLoadingMonitorings(true))

    const response = await MonitoringsApi.fetchMonitorings(
      projectId, deploymentId
    )

    const monitorings = response.data.monitorings || []
    dispatch(fetchMonitoringsSuccess(monitorings))
  } catch (e) {
    dispatch(fetchMonitoringsFail())
    message.error(e.message, 5)
  } finally {
    dispatch(setLoadingMonitorings(false))
  }
};

/**
 * Create monitoring success
 * 
 * @param {Array} monitorings Created monitorings
 * @returns {object} { type }
 */
export const createMonitoringsSuccess = (monitorings = []) => ({
  type: actionTypes.CREATE_MONITORINGS_SUCCESS,
  payload: {
    monitorings
  }
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
 * @param {string} requestData.taskId Task ID
 * @returns {Promise} Request
 */
export const createMonitoring = ({
  projectId,
  deploymentId,
  taskId
}) => async (dispatch) => {
  try {
    dispatch(setCreatingMonitoring(true))

    const response = await MonitoringsApi.createMonitoring({
      projectId,
      deploymentId,
      taskId
    })

    const monitoring = response.data
    dispatch(createMonitoringsSuccess([monitoring]))
  } catch (e) {
    dispatch(createMonitoringsFail())
    message.error(e.message, 5)
  } finally {
    dispatch(setCreatingMonitoring(false))
  }
};

/**
 * Create multiple monitorings
 * 
 * @param {Array} requestDataArray Request data array
 * @returns {Promise} Request
 */
export const createMultipleMonitorings = (requestDataArray) => async (dispatch) => {
  try {
    dispatch(setCreatingMonitoring(true))

    const responses = await Promise.all(
      requestDataArray.map((requestData) => {
        const { projectId, deploymentId, taskId } = requestData

        return MonitoringsApi.createMonitoring({
          projectId,
          deploymentId,
          taskId
        })
      })
    )

    const createdMonitorings = responses.map((response) => response.data)
    dispatch(createMonitoringsSuccess(createdMonitorings))
  } catch (e) {
    dispatch(createMonitoringsFail())
    message.error(e.message, 5)
  } finally {
    dispatch(setCreatingMonitoring(false))
  }
};

/**
 * Delete monitoring success
 *
 * @param {string} monitoringId Monitoring ID to remove from monitorings array
 * @returns {object} { type }
 */
export const deleteMonitoringsSuccess = (monitoringId) => ({
  type: actionTypes.DELETE_MONITORINGS_SUCCESS,
  payload: {
    monitoringId,
  }
});

/**
 * Delete monitoring fail
 * 
 * @returns {object} { type }
 */
export const deleteMonitoringsFail = () => ({
  type: actionTypes.DELETE_MONITORINGS_FAIL,
});

/**
 * Delete a monitoring
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
    dispatch(setDeletingMonitoring(true))

    await MonitoringsApi.deleteMonitoring({
      projectId,
      deploymentId,
      monitoringId
    })

    dispatch(deleteMonitoringsSuccess(monitoringId))
  } catch (e) {
    dispatch(deleteMonitoringsFail())
    message.error(e.message, 5)
  } finally {
    dispatch(setDeletingMonitoring(false))
  }
};
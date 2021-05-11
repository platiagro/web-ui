import { showError } from 'store/message';
import MonitoringsApi from 'services/MonitoringsApi';
import { addLoading, removeLoading } from 'store/loading';

import * as MONITORING_TYPES from './monitorings.actionTypes';

/**
 * Fetch monitorings success
 *
 * @param {Array} monitorings Monitorings list
 * @returns {object} { type, payload }
 */
export const fetchMonitoringsSuccess = (monitorings = []) => ({
  type: MONITORING_TYPES.FETCH_MONITORINGS_SUCCESS,
  payload: {
    monitorings,
  },
});

/**
 * Fetch monitorings fail
 *
 * @returns {object} { type }
 */
export const fetchMonitoringsFail = () => ({
  type: MONITORING_TYPES.FETCH_MONITORINGS_FAIL,
});

/**
 * Fetch monitorings from the API
 *
 * @param {string} projectId Project ID
 * @param {string} deploymentId Deployment ID
 * @returns {Promise} Request
 */
export const fetchMonitorings =
  (projectId, deploymentId) => async (dispatch) => {
    try {
      dispatch(addLoading(MONITORING_TYPES.FETCH_MONITORINGS_REQUEST));

      const response = await MonitoringsApi.fetchMonitorings(
        projectId,
        deploymentId
      );

      const monitorings = response.data.monitorings || [];
      dispatch(fetchMonitoringsSuccess(monitorings));
    } catch (e) {
      dispatch(fetchMonitoringsFail());
      dispatch(showError(e.message));
    } finally {
      dispatch(removeLoading(MONITORING_TYPES.FETCH_MONITORINGS_REQUEST));
    }
  };

/**
 * Create monitoring success
 *
 * @param {Array} monitorings Created monitorings
 * @returns {object} { type }
 */
export const createMonitoringsSuccess = (monitorings = []) => ({
  type: MONITORING_TYPES.CREATE_MONITORINGS_SUCCESS,
  payload: {
    monitorings,
  },
});

/**
 * Create monitoring fail
 *
 * @returns {object} { type }
 */
export const createMonitoringsFail = () => ({
  type: MONITORING_TYPES.CREATE_MONITORINGS_FAIL,
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
export const createMonitoring =
  ({ projectId, deploymentId, taskId }) =>
  async (dispatch) => {
    try {
      dispatch(addLoading(MONITORING_TYPES.CREATE_MONITORINGS_REQUEST));

      const response = await MonitoringsApi.createMonitoring({
        projectId,
        deploymentId,
        taskId,
      });

      const monitoring = response.data;
      dispatch(createMonitoringsSuccess([monitoring]));
    } catch (e) {
      dispatch(createMonitoringsFail());
      dispatch(showError(e.message));
    } finally {
      dispatch(removeLoading(MONITORING_TYPES.CREATE_MONITORINGS_REQUEST));
    }
  };

/**
 * Create multiple monitorings
 *
 * @param {Array} requestDataArray Request data array
 * @returns {Promise} Request
 */
export const createMultipleMonitorings =
  (requestDataArray) => async (dispatch) => {
    try {
      dispatch(addLoading(MONITORING_TYPES.CREATE_MONITORINGS_REQUEST));

      const responses = await Promise.all(
        requestDataArray.map((requestData) => {
          const { projectId, deploymentId, taskId } = requestData;

          return MonitoringsApi.createMonitoring({
            projectId,
            deploymentId,
            taskId,
          });
        })
      );

      const createdMonitorings = responses.map((response) => response.data);
      dispatch(createMonitoringsSuccess(createdMonitorings));
    } catch (e) {
      dispatch(createMonitoringsFail());
      dispatch(showError(e.message));
    } finally {
      dispatch(removeLoading(MONITORING_TYPES.CREATE_MONITORINGS_REQUEST));
    }
  };

/**
 * Delete monitoring success
 *
 * @param {string} monitoringId Monitoring ID to remove from monitorings array
 * @returns {object} { type }
 */
export const deleteMonitoringsSuccess = (monitoringId) => ({
  type: MONITORING_TYPES.DELETE_MONITORINGS_SUCCESS,
  payload: {
    monitoringId,
  },
});

/**
 * Delete monitoring fail
 *
 * @returns {object} { type }
 */
export const deleteMonitoringsFail = () => ({
  type: MONITORING_TYPES.DELETE_MONITORINGS_FAIL,
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
export const deleteMonitoring =
  ({ projectId, deploymentId, monitoringId }) =>
  async (dispatch) => {
    try {
      dispatch(addLoading(MONITORING_TYPES.DELETE_MONITORINGS_REQUEST));

      await MonitoringsApi.deleteMonitoring({
        projectId,
        deploymentId,
        monitoringId,
      });

      dispatch(deleteMonitoringsSuccess(monitoringId));
    } catch (e) {
      dispatch(deleteMonitoringsFail());
      dispatch(showError(e.message));
    } finally {
      dispatch(removeLoading(MONITORING_TYPES.DELETE_MONITORINGS_REQUEST));
    }
  };

/**
 * Fetch monitoring figures success
 *
 * @param {string} monitoringId Monitoring Id
 * @param {Array} figures Figures
 * @returns {object} { type, payload }
 */
export const fetchMonitoringFiguresSuccess = (monitoringId, figures = []) => ({
  type: MONITORING_TYPES.FETCH_MONITORING_FIGURES_SUCCESS,
  payload: {
    monitoringId,
    figures,
  },
});

/**
 * Fetch monitoring figures fail
 *
 * @returns {object} { type }
 */
export const fetchMonitoringFiguresFail = () => ({
  type: MONITORING_TYPES.FETCH_MONITORING_FIGURES_FAIL,
});

/**
 * Fetch monitoring figures from the API
 *
 * @param {object} requestData Request data
 * @param {string} requestData.projectId Project ID
 * @param {string} requestData.deploymentId Deployment ID
 * @param {string} requestData.monitoringId Monitoring ID
 * @returns {Promise} Request
 */
export const fetchMonitoringFigures =
  ({ projectId, deploymentId, monitoringId }) =>
  async (dispatch) => {
    try {
      dispatch(addLoading(MONITORING_TYPES.FETCH_MONITORING_FIGURES_REQUEST));

      const response = await MonitoringsApi.fetchMonitoringFigures({
        projectId,
        deploymentId,
        monitoringId,
      });

      const figures = response.data || [];
      dispatch(fetchMonitoringFiguresSuccess(monitoringId, figures));
    } catch (e) {
      dispatch(fetchMonitoringFiguresFail());
      dispatch(showError(e.message));
    } finally {
      dispatch(
        removeLoading(MONITORING_TYPES.FETCH_MONITORING_FIGURES_REQUEST)
      );
    }
  };

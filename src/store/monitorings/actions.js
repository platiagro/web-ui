// ACTION TYPES
import actionTypes from './actionTypes';
import monitoringsApi from 'services/MonitoringsApi';

// UI LIB
import { message } from 'antd';

/**
 * Fetch Monitorings
 *
 * @param {string} projectId
 */
export const fetchMonitorings = (projectId) => async (dispatch, getState) => {
  const { monitorings } = getState();
  dispatch({
    type: actionTypes.FETCH_MONITORINGS_REQUEST,
  });
  try {
    const response = await monitoringsApi.requestMonitorings(projectId);
    if (response) {
      dispatch(fetchMonitoringsSuccess(monitorings, response));
    }
  } catch (error) {
    dispatch(fetchMonitoringsFail(error));
  }
};

/**
 *Fetch monitorings success
 *
 * @param {object} monitorings
 * @param {object} response
 */
const fetchMonitoringsSuccess = (monitorings, response) => (dispatch) => {
  // dispatching get monitorings success
  dispatch({
    type: actionTypes.CREATE_MONITORING_SUCCESS,
    monitorings: [...monitorings, response.data],
  });
};

/**
 * Fetch monitorings fail
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const fetchMonitoringsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;
  // dispatching get monitorings fail
  dispatch({
    type: actionTypes.GET_MONITORING_FAIL,
    errorMessage,
  });
  message.error(errorMessage);
};

/**
 * Create monitorings
 *
 * @param {string} projectId
 * @param {object} body
 */
export const createMonitorings = (projectId, body) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: actionTypes.CREATE_MONITORING_REQUEST,
  });
  const { monitorings } = getState();
  try {
    const response = await monitoringsApi.poststMonitoring(projectId, body);
    if (response) {
      dispatch(createMonitoringsSuccess(monitorings, response));
    }
  } catch (error) {
    dispatch(createMonitoringsFail(error));
  }
};

/**
 * Create monitorings success
 *
 * @param monitorings
 * @param response
 *
 */
const createMonitoringsSuccess = (monitorings, response) => (dispatch) => {
  // dispatching get monitorings success
  dispatch({
    type: actionTypes.CREATE_MONITORING_SUCCESS,
    monitorings: [...monitorings, response.data],
  });
};

/**
 * Create monitorings fail
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const createMonitoringsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;
  // dispatching get monitorings fail
  dispatch({
    type: actionTypes.CREATE_MONITORING_FAIL,
    errorMessage,
  });
  message.error(errorMessage);
};

/**
 * Update Monitorings
 *
 * @param {string} projectId
 * @param {string} projectId
 * @param {object} body
 *
 */
export const updateMonitorings = (projectId, body) => async (
  dispatch,
  getState
) => {
  const { counter } = getState();

  dispatch({
    type: actionTypes.UPDATE_MONITORING_REQUEST,
  });
  try {
    const response = await monitoringsApi.updateMonitoring(projectId, body);
    if (response) {
      counter.dispatch(updateMonitoringsSuccess(response));
    }
  } catch (error) {
    dispatch(updateMonitoringsFail(error));
  }
};

/**
 * Update monitorings success
 *
 * @param response
 *
 */
const updateMonitoringsSuccess = (response) => (dispatch) => {
  // dispatching get monitorings success
  dispatch({
    type: actionTypes.UPDATE_MONITORINGS_SUCCESS,
    monitoringsItem: response.data,
  });
};

/**
 * Update monitorings fail
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const updateMonitoringsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;
  // dispatching get monitorings fail
  dispatch({
    type: actionTypes.UPDATE_MONITORINGS_FAIL,
    errorMessage,
  });
  message.error(errorMessage);
};

/**
 *Delete monitorings
 *
 * @param {string} projectId
 * @param {string} monitoringId
 */
export const deleteMonitorings = (projectId, monitoringId) => async (
  dispatch,
  getState
) => {
  const { counter } = getState();

  dispatch({
    type: actionTypes.DELETE_MONITORINGS_REQUEST,
  });
  try {
    const response = await monitoringsApi.deleteMonitorings(
      projectId,
      monitoringId
    );
    if (response) {
      counter.dispatch(deleteMonitoringsSucess(response));
    }
  } catch (error) {
    dispatch(deleteMonitoringsFail(error));
  }
};

/**
 * delete monitorings success
 *
 * @param {object} response
 */
const deleteMonitoringsSucess = (response) => (dispatch) => {
  // dispatching get monitorings success
  dispatch({
    type: actionTypes.DELETE_MONITORINGS_SUCCESS,
    monitoringItem: response.data,
  });
};

/**
 * delete monitorings fail
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const deleteMonitoringsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;
  // dispatching get monitorings fail
  dispatch({
    type: actionTypes.UPDATE_MONITORINGS_FAIL,
    errorMessage,
  });
  message.error(errorMessage);
};

// ACTION TYPES
import actionTypes from './actionTypes';
import monitoringApi from 'services/MonitoringsApi';

// UI LIB
import { message } from 'antd';

export const getMonitoring = (projectId) => async (dispatch, getState) => {
  const { monitorings } = getState();
  dispatch({
    type: actionTypes.GET_MONITORING_REQUEST,
  });
  try {
    const response = await monitoringApi.requestMonitoring(projectId);
    if (response) {
      dispatch(getMonitoringSuccess(monitorings, response));
    }
  } catch (error) {
    dispatch(getMonitoringFail(error));
  }
};

/**
 *
 * @param {object} monitorings
 * @param {object} response
 */
const getMonitoringSuccess = (monitorings, response) => (dispatch) => {
  // dispatching get monitoring success
  dispatch({
    type: actionTypes.CREATE_MONITORING_SUCCESS,
    monitorings: [...monitorings, response.data],
  });
};

/**
 * get monitoring
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const getMonitoringFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;
  // dispatching get monitoring fail
  dispatch({
    type: actionTypes.GET_MONITORING_FAIL,
    errorMessage,
  });
  message.error(errorMessage);
};

export const createMonitoring = (projectId, body) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: actionTypes.CREATE_MONITORING_REQUEST,
  });
  const { monitorings } = getState();
  try {
    const response = await monitoringApi.poststMonitoring(projectId, body);
    if (response) {
      dispatch(createMonitoringSuccess(monitorings, response));
    }
  } catch (error) {
    dispatch(createMonitoringFail(error));
  }
};

/**
 * get monitoring
 *
 * @param monitorings
 * @param response
 *
 */
const createMonitoringSuccess = (monitorings, response) => (dispatch) => {
  // dispatching get monitoring success
  dispatch({
    type: actionTypes.CREATE_MONITORING_SUCCESS,
    monitorings: [...monitorings, response.data],
  });
};
/**
 * get monitoring
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const createMonitoringFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;
  // dispatching get monitoring fail
  dispatch({
    type: actionTypes.CREATE_MONITORING_FAIL,
    errorMessage,
  });
  message.error(errorMessage);
};

export const updateMonitoring = (projectId, body) => async (
  dispatch,
  getState
) => {
  const { counter } = getState();

  dispatch({
    type: actionTypes.UPDATE_MONITORING_REQUEST,
  });
  try {
    const response = await monitoringApi.updateMonitoring(projectId, body);
    if (response) {
      counter.dispatch(updateMonitoringSuccess(response));
    }
  } catch (error) {
    dispatch(updateMonitoringFail(error));
  }
};

/**
 * get monitoring
 *
 * @param response
 *
 */
const updateMonitoringSuccess = (response) => (dispatch) => {
  // dispatching get monitoring success
  dispatch({
    type: actionTypes.UPDATE_MONITORING_SUCCESS,
    monitoringItem: response.data,
  });
};

/**
 * get monitoring
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const updateMonitoringFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;
  // dispatching get monitoring fail
  dispatch({
    type: actionTypes.UPDATE_MONITORING_FAIL,
    errorMessage,
  });
  message.error(errorMessage);
};

export const deleteMonitoring = (projectId) => async (dispatch, getState) => {
  const { counter } = getState();

  dispatch({
    type: actionTypes.DELETE_MONITORING_REQUEST,
  });
  try {
    const response = await monitoringApi.deleteMonitoring(projectId);
    if (response) {
      counter.dispatch(deleteMonitoringSucess(response));
    }
  } catch (error) {
    dispatch(deleteMonitoringFail(error));
  }
};

/**
 * get monitoring success
 *
 * @param {object} response
 */
const deleteMonitoringSucess = (response) => (dispatch) => {
  // dispatching get monitoring success
  dispatch({
    type: actionTypes.DELETE_MONITORING_SUCCESS,
    monitoringItem: response.data,
  });
};

/**
 * get monitoring
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const deleteMonitoringFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;
  // dispatching get monitoring fail
  dispatch({
    type: actionTypes.UPDATE_MONITORING_FAIL,
    errorMessage,
  });
  message.error(errorMessage);
};

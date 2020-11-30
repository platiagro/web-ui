// ACTION TYPES
import actionTypes from './actionTypes';
import monitoringApi from 'services/MonitoringsApi';

// UI LIB
import { message } from 'antd';

export const getMonitoring = (projectId) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_MONITORING_REQUEST,
  });
  monitoringApi
    .requestMonitoring(projectId)
    .then((response) => {
      if (response) {
        dispatch({
          type: actionTypes.GET_MONITORING_SUCCESS,
        });
        return response.data;
      }
      return;
    })
    .catch((error) => {
      dispatch(getMonitoringFail(error));
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

export const createMonitoring = (projectId, body) => (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_MONITORING_REQUEST,
  });
  monitoringApi
    .poststMonitoring(projectId, body)
    .then((response) => {
      if (response) {
        dispatch({
          type: actionTypes.CREATE_MONITORING_SUCCESS,
        });
        return response.data;
      }
      return;
    })
    .catch((error) => {
      dispatch(createMonitoringFail(error));
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

export const updateMonitoring = (projectId, body) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_MONITORING_REQUEST,
  });
  monitoringApi
    .updateMonitoring(projectId, body)
    .then((response) => {
      if (response) {
        dispatch({
          type: actionTypes.UPDATE_MONITORING_SUCCESS,
        });
        return response.data;
      }
      return;
    })
    .catch((error) => {
      dispatch(updateMonitoringFail(error));
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

export const deleteMonitoring = (projectId) => (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_MONITORING_REQUEST,
  });
  monitoringApi
    .deleteMonitoring(projectId)
    .then((response) => {
      if (response) {
        dispatch({
          type: actionTypes.DELETE_MONITORING_SUCCESS,
        });
        return response.data;
      }
      return;
    })
    .catch((error) => {
      dispatch(deleteMonitoringFail(error));
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

// ACTION TYPES
import actionTypes from './actionTypes';

import * as taskServices from '../../services/taskApi';

// ACTIONS
/**
 * Function to dispatch action ADD_TASK
 */
export const dispatchAdd = (task) => {
  return {
    type: actionTypes.ADD_TASK,
    task,
  };
};

/**
 * Function to add task and dispatch to reducer
 * @param {Object} task
 */
export const addTask = (task) => {
  return (dispatch) => {
    return taskServices.createTask(task).then((response) => {
      if (response) {
        dispatch(dispatchAdd(response.data));
        return response;
      }
      return null;
    });
  };
};

/**
 * Function to dispatch action UPDATE_TASK
 */
export const dispatchUpdate = (task) => {
  return {
    type: actionTypes.UPDATE_TASK,
    task,
  };
};

/**
 * Function to add task and dispatch to reducer
 * @param {Object} task
 */
export const updateTask = (uuid, task) => {
  return (dispatch) => {
    return taskServices.updateTask(uuid, task).then((response) => {
      if (response) {
        dispatch(dispatchUpdate(response.data));
        return response;
      }
      return null;
    });
  };
};

/**
 * Function to dispatch action DELETE_TASK
 * @param {String} id
 */
export const dispatchDelete = (id) => {
  return {
    type: actionTypes.DELETE_TASK,
    id,
  };
};

/**
 * Function to delete task and dispatch to reducer
 * @param {String} id
 */
export const deleteTask = (id) => {
  return (dispatch) => {
    return taskServices.deleteTask(id).then((response) => {
      if (response) {
        dispatch(dispatchDelete(id));
      }
    });
  };
};

/**
 * Function to dispatch action FETCH_TASK_STARTED
 */
export const fetchStarted = () => {
  return {
    type: actionTypes.FETCH_TASK_STARTED,
  };
};

/**
 * Function to dispatch action FETCH_TASK
 * @param {Object[]} components
 */
export const dispatchFetchTasks = (tasks) => {
  return {
    type: actionTypes.FETCH_TASK,
    tasks,
  };
};

/**
 * Function to fetch tasks and dispatch to reducer
 */
export const fetchTasks = () => {
  return (dispatch) => {
    dispatch(fetchStarted());
    return taskServices.getAllTasks().then((response) => {
      if (response) {
        dispatch(dispatchFetchTasks(response.data));
      }
    });
  };
};

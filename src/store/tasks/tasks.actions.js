import utils from 'utils';
import tasksApi from 'services/TasksApi';
import { showError, showSuccess } from 'store/message';
import { addLoading, removeLoading } from 'store/loading';

import * as TASKS_TYPES from './tasks.actionTypes';

/**
 * Show the modal to edit a task
 *
 * @param {object} record Task
 * @returns {object} Action
 */
export const showEditTaskModal = (record) => {
  return {
    type: TASKS_TYPES.SHOW_EDIT_TASK_MODAL,
    newTaskRecord: record,
  };
};

/**
 * Show the modal to create a new task
 *
 * @returns {object} Action
 */
export const showNewTaskModal = () => {
  return {
    type: TASKS_TYPES.SHOW_NEW_TASK_MODAL,
  };
};

/**
 * Show the modal to copy a task
 *
 * @param {object} record Task
 * @returns {object} Action
 */
export const showCopyTasksModal = (record) => {
  return {
    type: TASKS_TYPES.COPY_TASK_REQUEST,
    newTaskRecord: record,
  };
};

/**
 * Closes the tasks modal
 *
 * @returns {object} Action
 */
export const closeTasksModal = () => {
  return {
    type: TASKS_TYPES.CLOSE_TASKS_MODAL,
  };
};

/**
 * Fetch paginated tasks success action creator
 *
 * @param {object} task Added Task
 * @returns {object} Action
 */
export const addTaskSuccess = (task) => {
  return {
    type: TASKS_TYPES.ADD_TASK_SUCCESS,
    task,
  };
};

/**
 * Add task fail action creator
 *
 * @param {string} errorMessage Error message
 * @returns {object} Action
 */
export const addTaskFail = (errorMessage) => {
  return {
    type: TASKS_TYPES.ADD_TASK_FAIL,
    errorMessage,
  };
};

/**
 * Add task
 *
 * @param {object} task A Task
 * @returns {Function} Dispatch function
 */
export const addTask = (task) => async (dispatch) => {
  try {
    dispatch(addLoading(TASKS_TYPES.ADD_TASK_REQUEST));
    const response = await tasksApi.createTask(task);
    const responseTask = response.data;
    dispatch(addTaskSuccess(responseTask));
    dispatch(showSuccess(`Tarefa adicionada com sucesso.`));
    dispatch(closeTasksModal());
    await utils.sleep(1000);

    window.open(
      `/jupyterlab/tree/tasks/${responseTask.name}/?reset&open=Experiment.ipynb,Deployment.ipynb`
    );
  } catch (e) {
    const errorMessage = e.response?.data?.message || e.message;
    if (errorMessage && errorMessage.includes('name already exist')) {
      dispatch(addTaskFail('Já existe uma tarefa com este nome!'));
    } else {
      dispatch(showError(errorMessage));
    }
  } finally {
    dispatch(removeLoading(TASKS_TYPES.ADD_TASK_REQUEST));
  }
};

/**
 * Delete task success action creator
 *
 * @param {string} id Task id
 * @returns {object} Action
 */
export const deleteTaskSuccess = (id) => {
  return {
    type: TASKS_TYPES.DELETE_TASK_SUCCESS,
    id,
  };
};

/**
 * Delete task fail action creator
 *
 * @returns {object} Action
 */
export const deleteTaskFail = () => {
  return {
    type: TASKS_TYPES.DELETE_TASK_FAIL,
  };
};

/**
 * Delete task
 *
 * @param {string} id Task id
 * @returns {Function} Dispatch function
 */
export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch(addLoading(TASKS_TYPES.DELETE_TASK_REQUEST));
    await tasksApi.deleteTask(id);
    dispatch(deleteTaskSuccess(id));
    dispatch(showSuccess('Tarefa excluída'));
  } catch (e) {
    const isForbidden = e.response?.status === 403;
    const errorMessage = isForbidden
      ? 'Não foi possível excluir esta tarefa, pois ela está associada a um experimento.'
      : e.message;

    dispatch(deleteTaskFail());
    dispatch(showError(errorMessage));
  } finally {
    dispatch(removeLoading(TASKS_TYPES.DELETE_TASK_REQUEST));
  }
};

/**
 * Fetch paginated tasks success action creator
 *
 * @param {Array} tasks Tasks array
 * @param {number} pageSize Page size
 * @returns {object} Action
 */
export const fetchPaginatedTasksSuccess = (tasks, pageSize) => {
  return {
    type: TASKS_TYPES.FETCH_TASKS_PAGE_SUCCESS,
    tasks,
    pageSize,
  };
};

/**
 * Fetch paginated tasks fail action creator
 *
 * @returns {object} Action
 */
export const fetchPaginatedTasksFail = () => {
  return {
    type: TASKS_TYPES.FETCH_TASKS_PAGE_FAIL,
  };
};

/**
 * Fetch tasks with pagination
 *
 * @param {number} page Page number
 * @param {number} pageSize Page size
 * @returns {Function} Dispatch function
 */
export const fetchPaginatedTasks = (page, pageSize) => async (dispatch) => {
  try {
    dispatch(addLoading(TASKS_TYPES.FETCH_TASKS_PAGE_REQUEST));
    const response = await tasksApi.getPaginatedTasks(page, pageSize);
    dispatch(fetchPaginatedTasksSuccess(response.data, pageSize));
  } catch (e) {
    dispatch(fetchPaginatedTasksFail());
    dispatch(showError(e.message));
  } finally {
    dispatch(removeLoading(TASKS_TYPES.FETCH_TASKS_PAGE_REQUEST));
  }
};

/**
 * Fetch tasks success action creator
 *
 * @param {string} containerState Container state
 * @param {Array} tasks Tasks array
 * @returns {object} Action
 */
export const fetchTasksSuccess = (containerState, tasks) => {
  return {
    type: TASKS_TYPES.FETCH_TASKS_SUCCESS,
    containerState,
    tasks,
  };
};

/**
 * Fetch tasks fail action creator
 *
 * @returns {object} Action
 */
export const fetchTasksFail = () => {
  return {
    type: TASKS_TYPES.FETCH_TASKS_FAIL,
  };
};

/**
 * Fetch tasks
 *
 * @param {object} filters Filters
 * @returns {Function} Dispatch function
 */
export const fetchTasks = (filters) => async (dispatch) => {
  try {
    dispatch(addLoading(TASKS_TYPES.FETCH_TASKS_REQUEST));
    const response = await tasksApi.getAllTasks(filters);
    const { containerState, tasks } = response.data;
    dispatch(fetchTasksSuccess(containerState, tasks));
  } catch (e) {
    dispatch(fetchTasksFail());
    dispatch(showError(e.message));
  } finally {
    dispatch(removeLoading(TASKS_TYPES.FETCH_TASKS_REQUEST));
  }
};

/**
 * Update task fail action creator
 *
 * @param {object} task A task
 * @returns {object} Action
 */
export const updateTaskSuccess = (task) => {
  return {
    type: TASKS_TYPES.UPDATE_TASK_SUCCESS,
    task,
  };
};

/**
 * Update task fail action creator
 *
 * @param {string} errorMessage The error message
 * @returns {object} Action
 */
export const updateTaskFail = (errorMessage) => {
  return {
    type: TASKS_TYPES.UPDATE_TASK_FAIL,
    errorMessage,
  };
};

/**
 * Update task
 *
 * @param {string} uuid The ID
 * @param {object} task The task
 * @returns {Function} Dispatch function
 */
export const updateTask = (uuid, task) => async (dispatch) => {
  try {
    dispatch(addLoading(TASKS_TYPES.UPDATE_TASK_REQUEST));
    const response = await tasksApi.updateTask(uuid, task);
    dispatch(closeTasksModal());
    dispatch(updateTaskSuccess(response.data));
    dispatch(showSuccess(`Alteração realizada com sucesso.`));
  } catch (e) {
    const errorMessage = e.response?.data?.message || e.message;
    if (errorMessage.includes('name already exist')) {
      dispatch(updateTaskFail('Já existe uma tarefa com este nome!'));
    } else {
      dispatch(showError(errorMessage));
    }
  } finally {
    dispatch(removeLoading(TASKS_TYPES.UPDATE_TASK_REQUEST));
  }
};

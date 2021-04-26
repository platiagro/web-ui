import utils from 'utils';
import tasksApi from 'services/TasksApi';
import { addLoading, removeLoading } from 'store/loading';
import { showError, showSuccess } from 'store/message';

import {
  ADD_TASK,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAIL,
  DELETE_TASK,
  FETCH_PAGINATED_TASK,
  FETCH_TASK,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  SHOW_EDIT_TASK_MODAL,
  SHOW_NEW_TASK_MODAL,
  CLOSE_TASKS_MODAL,
  COPY_TASK_REQUEST,
} from './tasks.actionTypes';

/**
 * Show the modal to edit a task
 *
 * @param {object} record Task
 * @returns {Function} Dispatch function
 */
export const showEditTaskModal = (record) => {
  return {
    type: SHOW_EDIT_TASK_MODAL,
    newTaskRecord: record,
  };
};

/**
 * Show the modal to create a new task
 *
 * @returns {Function} Dispatch function
 */
export const showNewTaskModal = () => {
  return {
    type: SHOW_NEW_TASK_MODAL,
  };
};

/**
 * Show the modal to copy a task
 *
 * @param {object} record Task
 * @returns {Function} Dispatch function
 */
export const showCopyTasksModal = (record) => {
  return {
    type: COPY_TASK_REQUEST,
    newTaskRecord: record,
  };
};

/**
 * Closes the tasks modal
 *
 * @returns {Function} Dispatch function
 */
export const closeTasksModal = () => {
  return {
    type: CLOSE_TASKS_MODAL,
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
    dispatch(addLoading(ADD_TASK));

    const response = await tasksApi.createTask(task);
    const responseTask = response.data;

    dispatch({
      type: ADD_TASK_SUCCESS,
      task: responseTask,
    });

    dispatch(showSuccess(`Tarefa adicionada com sucesso.`));
    dispatch(closeTasksModal());
    await utils.sleep(1000);

    window.open(
      `/jupyterlab/tree/tasks/${responseTask.name}/?reset&open=Experiment.ipynb,Deployment.ipynb`
    );
  } catch (e) {
    if (e.response.status === 500) {
      dispatch(showError(e.message, 5));
    } else {
      const errorMessage = e.response.data.message;
      if (errorMessage.includes('name already exist')) {
        dispatch({
          type: ADD_TASK_FAIL,
          errorMessage: 'Já existe uma tarefa com este nome!',
        });
      } else {
        dispatch(showError(errorMessage, 5));
      }
    }
  } finally {
    dispatch(removeLoading(ADD_TASK));
  }
};

/**
 * Delete task
 *
 * @param {string} id Task id
 * @returns {Function} Dispatch function
 */
export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch(addLoading(DELETE_TASK));

    await tasksApi.deleteTask(id);
    dispatch(showSuccess('Tarefa excluída', 5));

    dispatch({
      type: DELETE_TASK,
      id,
    });
  } catch (e) {
    const isForbidden = e.response.status === 403;
    const errorMessage = isForbidden
      ? 'Não foi possível excluir esta tarefa, pois ela está associada a um experimento.'
      : e.message;

    dispatch(showError(errorMessage, 5));
  } finally {
    dispatch(removeLoading(DELETE_TASK));
  }
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
    dispatch(addLoading(FETCH_PAGINATED_TASK));

    const response = await tasksApi.getPaginatedTasks(page, pageSize);

    dispatch({
      type: FETCH_PAGINATED_TASK,
      tasks: response.data,
      pageSize: pageSize,
    });
  } catch (e) {
    dispatch(showError(e.message, 5));
  } finally {
    dispatch(removeLoading(FETCH_PAGINATED_TASK));
  }
};

/**
 * Fetch tasks
 *
 * @param {object} filters Filters
 * @returns {Function} Dispatch function
 */
export const fetchTasks = (filters) => async (dispatch) => {
  try {
    dispatch(addLoading(FETCH_TASK));

    const response = await tasksApi.getAllTasks(filters);

    dispatch({
      type: FETCH_TASK,
      containerState: response.data.containerState,
      tasks: response.data.tasks,
    });
  } catch (e) {
    dispatch(showError(e.message, 5));
  } finally {
    dispatch(removeLoading(FETCH_TASK));
  }
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
    dispatch(addLoading(UPDATE_TASK));

    const response = await tasksApi.updateTask(uuid, task);

    dispatch({
      type: UPDATE_TASK_SUCCESS,
      task: response.data,
    });

    dispatch(closeTasksModal());
    dispatch(showSuccess(`Alteração realizada com sucesso.`));
  } catch (e) {
    if (e.response.status === 500) {
      dispatch(showError(e.message, 5));
    } else {
      const errorMessage = e.response.data.message;
      if (errorMessage.includes('name already exist')) {
        dispatch({
          type: UPDATE_TASK_FAIL,
          errorMessage: 'Já existe uma tarefa com este nome!',
        });
      } else {
        dispatch(showError(errorMessage, 5));
      }
    }
  } finally {
    dispatch(removeLoading(UPDATE_TASK));
  }
};

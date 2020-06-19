// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import * as taskServices from '../../services/taskApi';

// UI ACTIONS
import { tasksTableLoadingData, tasksTableDataLoaded } from '../ui/actions';

// ACTIONS
export const showTasksModal = (record) => {
  if (record !== undefined && record !== null) {
    return {
      type: actionTypes.SHOW_EDIT_TASK_MODAL,
      newTaskRecord: record,
    };
  } else {
    return {
      type: actionTypes.SHOW_NEW_TASK_MODAL,
    };
  }
};

export const closeTasksModal = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLOSE_TASKS_MODAL,
  });
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

/**
 * Function to add task and dispatch to reducer
 * @param {Object} task
 */
export const addTask = (task) => {
  return (dispatch) => {
    // showing loading
    dispatch(tasksTableLoadingData());

    return taskServices
      .createTask(task)
      .then(async (response) => {
        const responseTask = response.data;
        dispatch(tasksTableDataLoaded());
        dispatch({
          type: actionTypes.ADD_TASK_SUCCESS,
          task: responseTask,
        });
        dispatch(closeTasksModal());
        message.success(`Tarefa adicionada com sucesso.`);
        await sleep(1000);
        const jupyterDomain =
          process.env.NODE_ENV === 'development'
            ? process.env.REACT_APP_MAIN_DOMAIN
            : '';
        window.open(
          `${jupyterDomain}/notebook/anonymous/server/lab/tree/components/${responseTask.uuid}/?reset&open=Experiment.ipynb,Deployment.ipynb`
        );
      })
      .catch((error) => {
        dispatch(tasksTableDataLoaded());
        let errorMessage;
        if (error.response.status == 500) {
          errorMessage = error.message;
          message.error(errorMessage, 5);
        } else {
          errorMessage = error.response.data.message;
          if (errorMessage.includes('name already exist')) {
            errorMessage = 'Já existe uma tarefa com este nome!';
            dispatch({
              type: actionTypes.ADD_TASK_FAIL,
              errorMessage,
            });
          } else {
            message.error(errorMessage, 5);
          }
        }
      });
  };
};

/**
 * Function to delete task and dispatch to reducer
 * @param {String} id
 */
export const deleteTask = (id) => {
  return (dispatch) => {
    // showing loading
    dispatch(tasksTableLoadingData());

    return taskServices
      .deleteTask(id)
      .then(() => {
        dispatch(tasksTableDataLoaded());
        dispatch({
          type: actionTypes.DELETE_TASK,
          id,
        });
      })
      .catch((error) => {
        let errorMessage;
        if (error.response.status == 403) {
          errorMessage =
            'Não foi possível excluir esta tarefa, pois ela está associada a um experimento.';
        } else {
          errorMessage = error.message;
        }
        dispatch(tasksTableDataLoaded());
        message.error(errorMessage, 5);
      });
  };
};

/**
 * Function to fetch tasks and dispatch to reducer
 */
export const fetchTasks = () => {
  return (dispatch) => {
    // showing loading
    dispatch(tasksTableLoadingData());

    return taskServices
      .getAllTasks()
      .then((response) => {
        dispatch(tasksTableDataLoaded());
        dispatch({
          type: actionTypes.FETCH_TASK,
          tasks: response.data,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(tasksTableDataLoaded());
        message.error(errorMessage, 5);
      });
  };
};

/**
 * Function to update task and dispatch to reducer
 * @param {Object} task
 */
export const updateTask = (uuid, task) => {
  return (dispatch) => {
    // showing loading
    dispatch(tasksTableLoadingData());

    return taskServices
      .updateTask(uuid, task)
      .then((response) => {
        dispatch(tasksTableDataLoaded());
        dispatch({
          type: actionTypes.UPDATE_TASK_SUCCESS,
          task: response.data,
        });
        dispatch(closeTasksModal());
        message.success(`Alteração realizada com sucesso.`);
      })
      .catch((error) => {
        dispatch(tasksTableDataLoaded());
        let errorMessage;
        if (error.response.status == 500) {
          errorMessage = error.message;
          message.error(errorMessage, 5);
        } else {
          errorMessage = error.response.data.message;
          if (errorMessage.includes('name already exist')) {
            errorMessage = 'Já existe uma tarefa com este nome!';
            dispatch({
              type: actionTypes.UPDATE_TASK_FAIL,
              errorMessage,
            });
          } else {
            message.error(errorMessage, 5);
          }
        }
      });
  };
};

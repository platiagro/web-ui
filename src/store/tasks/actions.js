// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import tasksApi from '../../services/TasksApi';

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

export const showCopyTaksModal = (record) => {
  return {
    type: actionTypes.COPY_TASK_REQUEST,
    newTaskRecord: record,
  };
};

export const closeTasksModal = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLOSE_TASKS_MODAL,
  });
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const addTaskSuccess = (responseTask) => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_TASK_SUCCESS,
    task: responseTask,
  });
};

export const addTaskFail = (error, messageError) => (dispatch) => {
  let errorMessage = null;

  if (
    messageError !== null ||
    (messageError !== undefined && errorMessage == null)
  ) {
    errorMessage = messageError;
  }

  if (
    error.message !== null ||
    (error.message !== undefined && errorMessage == null)
  ) {
    errorMessage = error.message;
  }

  dispatch({
    type: actionTypes.ADD_TASK_FAIL,
    errorMessage,
  });
  message.error(errorMessage, 5);
};

/**
 * Function to add task and dispatch to reducer
 *
 * @param {object} task
 */
export const addTask = (task) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_TASK_REQUEST,
    });
    // showing loading
    dispatch(tasksTableLoadingData());

    return tasksApi
      .createTask(task)
      .then(async (response) => {
        const responseTask = response.data;
        dispatch(tasksTableDataLoaded());
        dispatch(addTaskSuccess(responseTask));
        dispatch(closeTasksModal());
        message.success(`Tarefa adicionada com sucesso.`);
        await sleep(1000);
        const jupyterDomain =
          process.env.NODE_ENV === 'development'
            ? process.env.REACT_APP_MAIN_DOMAIN
            : '';
        window.open(
          `${jupyterDomain}/notebook/anonymous/server/lab/tree/tasks/${responseTask.name}/?reset&open=Experiment.ipynb,Deployment.ipynb`
        );
      })
      .catch((error) => {
        dispatch(tasksTableDataLoaded());
        let errorMessage;
        if (error.response.status === 500) {
          dispatch(addTaskFail(error, null));
        } else {
          errorMessage = error.response.data.message;
          if (errorMessage.includes('name already exist')) {
            errorMessage = 'Já existe uma tarefa com este nome!';
            dispatch(addTaskFail(null, errorMessage));
          } else {
            dispatch(addTaskFail(error, null));
          }
        }
      });
  };
};

export const deleteTaskSuccess = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_TASK_SUCCESS,
    id,
  });
};

export const deleteTaskFail = (error, messageError) => (dispatch) => {
  let errorMessage = null;

  if (
    messageError !== null ||
    (messageError !== undefined && errorMessage == null)
  ) {
    errorMessage = messageError;
  }

  if (
    error.message !== null ||
    (error.message !== undefined && errorMessage == null)
  ) {
    errorMessage = error.message;
  }

  dispatch({
    type: actionTypes.DELETE_TASK_FAIL,
    errorMessage,
  });
  message.error(errorMessage, 5);
};

/**
 * Function to delete task and dispatch to reducer
 *
 * @param {string} id
 */
export const deleteTask = (id) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_TASK_REQUEST,
    });

    // showing loading
    dispatch(tasksTableLoadingData());

    return tasksApi
      .deleteTask(id)
      .then(() => {
        dispatch(tasksTableDataLoaded());
        dispatch(deleteTaskSuccess(id));
      })
      .catch((error) => {
        let errorMessage;
        if (error.response.status === 403) {
          errorMessage =
            'Não foi possível excluir esta tarefa, pois ela está associada a um experimento.';
        } else {
          dispatch(deleteTaskFail(error, errorMessage));
        }
        dispatch(tasksTableDataLoaded());
        dispatch(deleteTaskFail(error, errorMessage));
      });
  };
};

export const fetchPaginatedTasksSuccess = (response, pageSize) => (
  dispatch
) => {
  dispatch({
    type: actionTypes.FETCH_PAGINATED_SUCCESS,
    tasks: response.data,
    pageSize: pageSize,
  });
};

export const fetchPaginatedTasksFail = (error) => (dispatch) => {
  const errorMessage = error.message;

  dispatch({
    type: actionTypes.FETCH_PAGINATED_FAIL,
    errorMessage,
  });
  message.error(errorMessage, 5);
};

/**
 * Function to fetch pagineted tasks and dispatch to reducer
 *
 * @param page
 * @param pageSize
 * @param page
 * @param pageSize
 */
export const fetchPaginatedTasks = (page, pageSize) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_PAGINATED_REQUEST,
    });
    // showing loading
    dispatch(tasksTableLoadingData());

    return tasksApi
      .getPaginatedTasks(page, pageSize)
      .then((response) => {
        dispatch(tasksTableDataLoaded());
        dispatch(fetchPaginatedTasksSuccess(response, pageSize));
      })
      .catch((error) => {
        dispatch(tasksTableDataLoaded());
        dispatch(fetchPaginatedTasksFail(error));
      });
  };
};

export const fetchTasksSuccess = (response) => (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_TASK_SUCCESS,
    tasks: response.data.tasks,
  });
};

export const fetchTasksFail = (error) => (dispatch) => {
  const errorMessage = error.message;

  dispatch({
    type: actionTypes.FETCH_TASK_FAIL,
    errorMessage,
  });
  message.error(errorMessage, 5);
};

/**
 * Function to fetch tasks and dispatch to reducer
 */
export const fetchTasks = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_TASK_REQUEST,
    });

    // showing loading
    dispatch(tasksTableLoadingData());

    return tasksApi
      .getAllTasks()
      .then((response) => {
        dispatch(tasksTableDataLoaded());
        dispatch(fetchTasksSuccess(response));
      })
      .catch((error) => {
        dispatch(tasksTableDataLoaded());
        dispatch(fetchTasksFail(error));
      });
  };
};

/**
 * Function to update task and dispatch to reducer
 *
 * @param uuid
 * @param {object} task
 */
export const updateTask = (uuid, task) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_TASK_REQUEST,
    });

    // showing loading
    dispatch(tasksTableLoadingData());

    return tasksApi
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
        if (error.response.status === 500) {
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

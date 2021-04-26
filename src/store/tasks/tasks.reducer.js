import {
  ADD_TASK_SUCCESS,
  ADD_TASK_FAIL,
  DELETE_TASK,
  FETCH_PAGINATED_TASK,
  FETCH_TASK,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  SHOW_EDIT_TASK_MODAL,
  SHOW_NEW_TASK_MODAL,
  CLOSE_TASKS_MODAL,
  COPY_TASK_REQUEST,
  COPY_TASK_SUCCESS,
  COPY_TASK_FAIL,
} from './tasks.actionTypes';
import uiActionTypes from '../ui/actionTypes';

export const initialState = {
  containerState: false,
  editModalIsVisible: false,
  errorMessage: null,
  modalIsVisible: false,
  modalValidateStatus: null,
  newTaskRecord: {},
  pageSize: null,
  tasks: [],
  totalTasks: null,
};

export const tasksReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case uiActionTypes.TASKS_TABLE_LOADING_DATA:
      return {
        ...state,
        modalValidateStatus: null,
        errorMessage: null,
      };

    case ADD_TASK_SUCCESS:
    case COPY_TASK_SUCCESS: {
      const tasksListAux = [action.task, ...state.tasks];
      const sortedTasks = [...tasksListAux].sort((taskA, taskB) =>
        taskA.name.localeCompare(taskB.name, undefined, {
          numeric: true,
          sensitivity: 'base',
        })
      );
      return {
        ...state,
        tasks: sortedTasks,
      };
    }

    case CLOSE_TASKS_MODAL:
      return {
        ...state,
        newTaskRecord: {},
        editModalIsVisible: false,
        modalIsVisible: false,
        modalValidateStatus: null,
        errorMessage: null,
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.uuid !== action.id),
      };

    case FETCH_PAGINATED_TASK:
      return {
        ...state,
        tasks: action.tasks,
        totalTasks: action.tasks.length,
        pageSize: action.pageSize,
      };

    case FETCH_TASK:
      return {
        ...state,
        containerState: action.containerState,
        tasks: action.tasks,
      };

    case UPDATE_TASK_SUCCESS: {
      const updatedTask = action.task;
      const tasksAux = [...state.tasks];
      const taskIndex = tasksAux.findIndex(
        (task) => task.uuid === updatedTask.uuid
      );
      tasksAux[taskIndex] = updatedTask;
      tasksAux.sort((a, b) => a.name.localeCompare(b.name));

      return {
        ...state,
        tasks: tasksAux,
      };
    }

    case COPY_TASK_REQUEST:
      return {
        ...state,
        modalIsVisible: true,
        newTaskRecord: action.newTaskRecord,
      };

    case SHOW_EDIT_TASK_MODAL:
      return {
        ...state,
        editModalIsVisible: true,
        newTaskRecord: action.newTaskRecord,
      };

    case SHOW_NEW_TASK_MODAL:
      return {
        ...state,
        modalIsVisible: true,
      };

    case ADD_TASK_FAIL:
    case UPDATE_TASK_FAIL:
    case COPY_TASK_FAIL:
      return {
        ...state,
        modalValidateStatus: 'error',
        errorMessage: action.errorMessage,
      };

    default:
      return state;
  }
};

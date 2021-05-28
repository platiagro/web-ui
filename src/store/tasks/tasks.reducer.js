import * as TASKS_TYPES from './tasks.actionTypes';

export const initialState = {
  editModalIsVisible: false,
  errorMessage: null,
  modalIsVisible: false,
  modalValidateStatus: null,
  newTaskRecord: {},
  pageSize: null,
  tasks: [],
  totalTasks: null,
  taskData: null,
};

export const tasksReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TASKS_TYPES.ADD_TASK_SUCCESS:
    case TASKS_TYPES.COPY_TASK_SUCCESS: {
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

    case TASKS_TYPES.CLOSE_TASKS_MODAL: {
      return {
        ...state,
        newTaskRecord: {},
        editModalIsVisible: false,
        modalIsVisible: false,
        modalValidateStatus: null,
        errorMessage: null,
      };
    }

    case TASKS_TYPES.DELETE_TASK_SUCCESS: {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.uuid !== action.id),
      };
    }

    case TASKS_TYPES.FETCH_TASKS_PAGE_SUCCESS: {
      return {
        ...state,
        tasks: action.tasks,
        totalTasks: action.tasks.length,
        pageSize: action.pageSize,
      };
    }

    case TASKS_TYPES.FETCH_TASKS_SUCCESS: {
      return {
        ...state,
        tasks: action.tasks,
      };
    }

    case TASKS_TYPES.UPDATE_TASK_SUCCESS: {
      const updatedTask = action.task;
      const tasksAux = [...state.tasks];
      const taskIndex = tasksAux.findIndex(
        (task) => task.uuid === updatedTask.uuid
      );
      tasksAux[taskIndex] = updatedTask;
      tasksAux.sort((a, b) => a.name.localeCompare(b.name));

      const canUpdateTaskData = state.taskData?.uuid === updatedTask.uuid;
      const taskData = canUpdateTaskData
        ? { ...state.taskData, ...updatedTask }
        : state.taskData;

      return {
        ...state,
        taskData,
        tasks: tasksAux,
      };
    }

    case TASKS_TYPES.COPY_TASK_REQUEST: {
      return {
        ...state,
        modalIsVisible: true,
        newTaskRecord: action.newTaskRecord,
      };
    }

    case TASKS_TYPES.SHOW_EDIT_TASK_MODAL: {
      return {
        ...state,
        editModalIsVisible: true,
        newTaskRecord: action.newTaskRecord,
      };
    }

    case TASKS_TYPES.SHOW_NEW_TASK_MODAL: {
      return {
        ...state,
        modalIsVisible: true,
      };
    }

    case TASKS_TYPES.ADD_TASK_FAIL:
    case TASKS_TYPES.UPDATE_TASK_FAIL:
    case TASKS_TYPES.COPY_TASK_FAIL: {
      return {
        ...state,
        modalValidateStatus: 'error',
        errorMessage: action.errorMessage,
      };
    }

    case TASKS_TYPES.CLEAR_TASK_DATA:
    case TASKS_TYPES.FETCH_TASK_DATA_FAIL: {
      return {
        ...state,
        taskData: null,
      };
    }

    case TASKS_TYPES.FETCH_TASK_DATA_SUCCESS: {
      return {
        ...state,
        taskData: action.taskData,
      };
    }

    default:
      return state;
  }
};

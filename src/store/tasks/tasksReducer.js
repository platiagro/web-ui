// ACTION TYPES
import actionTypes from './actionTypes';
import uiActionTypes from '../ui/actionTypes';

const initialState = {
  tasks: [],
  newTaskRecord: {},
  modalIsVisible: false,
  editModalIsVisible: false,
  modalValidateStatus: null,
  errorMessage: null,
  pageSize: null,
  totalTasks: null,
};

// tasks reducer
const tasksReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case uiActionTypes.TASKS_TABLE_LOADING_DATA:
      return {
        ...state,
        modalValidateStatus: null,
        errorMessage: null,
      };
    case actionTypes.ADD_TASK_SUCCESS:
    case actionTypes.COPY_TASK_SUCCESS:
      // creating task aux list with new task and olders
      const tasksListAux = [action.task, ...state.tasks];
      // sorting aux task list
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
    case actionTypes.CLOSE_TASKS_MODAL:
      return {
        ...state,
        newTaskRecord: {},
        editModalIsVisible: false,
        modalIsVisible: false,
        modalValidateStatus: null,
        errorMessage: null,
      };
    case actionTypes.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.uuid !== action.id),
      };
    case actionTypes.FETCH_PAGINATED_TASK:
      return {
        ...state,
        tasks: action.tasks,
        totalTasks: action.tasks.length,
        pageSize: action.pageSize,
      };
    case actionTypes.FETCH_TASK:
      return {
        ...state,
        tasks: action.tasks,
      };
    case actionTypes.UPDATE_TASK_SUCCESS:
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
    case actionTypes.COPY_TASK_REQUEST:
      return {
        ...state,
        modalIsVisible: true,
        newTaskRecord: action.newTaskRecord,
      };
    case actionTypes.SHOW_EDIT_TASK_MODAL:
      return {
        ...state,
        editModalIsVisible: true,
        newTaskRecord: action.newTaskRecord,
      };
    case actionTypes.SHOW_NEW_TASK_MODAL:
      return {
        ...state,
        modalIsVisible: true,
      };
    case actionTypes.ADD_TASK_FAIL:
    case actionTypes.UPDATE_TASK_FAIL:
    case actionTypes.COPY_TASK_FAIL:
      return {
        ...state,
        modalValidateStatus: 'error',
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

// EXPORT
export default tasksReducer;

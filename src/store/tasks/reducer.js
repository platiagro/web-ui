/* eslint-disable no-case-declarations */

// ACTION TYPES
import actionTypes from './actionTypes';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return {
        ...state,
        tasks: [action.task, ...state.tasks],
        modalIsVisible: false,
      };
    case actionTypes.UPDATE_TASK:
      const updatedTask = action.task;
      const tasksAux = [...state.tasks];
      const taskIndex = tasksAux.findIndex(
        (task) => task.uuid === updatedTask.uuid
      );
      tasksAux[taskIndex] = updatedTask;
      return {
        ...state,
        loading: false,
        tasks: tasksAux,
      };
    case actionTypes.DELETE_TASK:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter((task) => task.uuid !== action.id),
      };
    case actionTypes.FETCH_TASK_STARTED:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_TASK:
      return { ...state, tasks: action.tasks, loading: false };
    default:
      return state;
  }
}

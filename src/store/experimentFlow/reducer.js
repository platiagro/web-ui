// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = [];

/**
 * experiment flow reducer
 */
const experimentFlow = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FLOW_TASKS:
      return action.flowTasks;
    case actionTypes.ADD_FLOW_TASK:
      return action.flowTasks;
    case actionTypes.REMOVE_FLOW_TASK:
      return action.flowTasks;
    case actionTypes.SET_FLOW_TASK_PARAMS:
      return action.flowTasks;
    default:
      return state;
  }
};

// EXPORT
export default experimentFlow;

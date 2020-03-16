// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = [];

/**
 * flow menu tasks reducer
 */
const flowMenuTasks = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FLOW_MENU_TASKS:
      return action.flowMenuTasks;
    default:
      return state;
  }
};

// EXPORT
export default flowMenuTasks;

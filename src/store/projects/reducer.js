// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = [];

/**
 * projects reducer
 */
const projects = (state = initialState, action) => {
  switch (action.type) {
    // fetch projects success
    case actionTypes.FETCH_PROJECTS_SUCCESS:
      return action.projects;
    // fetch projects fail
    case actionTypes.FETCH_PROJECTS_FAIL:
      return message.error(action.errorMessage);
    default:
      return state;
  }
};

// EXPORT
export default projects;

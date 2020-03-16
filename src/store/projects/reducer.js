// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = [];

/**
 * projects reducer
 */
const projects = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS:
      return action.projects;
    case actionTypes.CREATE_PROJECT:
      return action.projects;
    case actionTypes.DELETE_PROJECT:
      return action.projects;
    default:
      return state;
  }
};

// EXPORT
export default projects;

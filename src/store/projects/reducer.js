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
    default:
      return state;
  }
};

// EXPORT
export default projects;

// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  uuid: '',
  name: '',
  createdAt: '',
};

/**
 * project reducer
 */
const project = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECT:
      return action.project;
    case actionTypes.EDIT_PROJECT_NAME:
      return action.project;
    default:
      return state;
  }
};

// EXPORT
export default project;

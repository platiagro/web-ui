// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';
import projectActionTypes from '../project/actionTypes';

// INITIAL STATE
const initialState = [];

/**
 * projects reducer
 */
const projects = (state = initialState, action) => {
  switch (action.type) {
    // SUCCESS
    // projects
    // fetch projects success
    case actionTypes.FETCH_PROJECTS_SUCCESS:
      return [...action.projects];

    // project
    // delete project success
    case projectActionTypes.DELETE_PROJECT_SUCCESS:
      return [...state.filter((project) => project.uuid !== action.projectId)];

    // // // // // // //

    // FAIL
    // projects
    // fetch projects fail
    case actionTypes.FETCH_PROJECTS_FAIL:
      return message.error(action.errorMessage);
    // // // // // // //

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default projects;

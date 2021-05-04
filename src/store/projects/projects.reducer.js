// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global ProjectsStore */

// ACTION TYPES
import * as PROJECTS_TYPES from './projects.actionTypes';

/** @type {ProjectsStore} */
export const initialState = {
  projects: [],
  selectedProjects: [],
  searchText: '',
  currentPage: 0,
  pageSize: 0,
  total: 0,
};

/**
 * Projects Reducer
 *
 * @param {ProjectsStore} state Reducer initial state
 * @param {object} action Reducer action
 * @param {object} action.payload Action payload (data)
 * @param {string} action.type Action type
 * @returns {ProjectsStore} New state
 */
export default (state = initialState, action = undefined) => {
  switch (action.type) {
    case PROJECTS_TYPES.DELETE_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload.projects,
        selectedProjects: action.payload.selectedProjects,
      };

    case PROJECTS_TYPES.CREATE_PROJECT_SUCCESS:
    case PROJECTS_TYPES.FETCH_PROJECT_SUCCESS:
    case PROJECTS_TYPES.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: action.payload.projects,
      };

    case PROJECTS_TYPES.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload.projects,
        selectedProjects: [],
        searchText: action.payload.searchText,
        currentPage: action.payload.currentPage,
        pageSize: action.payload.pageSize,
        total: action.payload.total,
      };
    case PROJECTS_TYPES.SELECTED_PROJECTS:
      return {
        ...state,
        selectedProjects: action.payload.selectedProjects,
      };
    default:
      return state;
  }
};

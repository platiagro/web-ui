// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global ProjectsStore */

// ACTION TYPES
import * as actionTypes from './projects.actionTypes';

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
    case actionTypes.DELETE_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload.projects,
        selectedProjects: action.payload.selectedProjects,
      };

    case actionTypes.CREATE_PROJECT_SUCCESS:
    case actionTypes.FETCH_PROJECT_SUCCESS:
    case actionTypes.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: action.payload.projects,
      };

    case actionTypes.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload.projects,
        selectedProjects: [],
        searchText: action.payload.searchText,
        currentPage: action.payload.currentPage,
        pageSize: action.payload.pageSize,
        total: action.payload.total,
      };
    case actionTypes.SELECTED_PROJECTS:
      return {
        ...state,
        selectedProjects: action.payload.selectedProjects,
      };
    default:
      return state;
  }
};

// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global ProjectsStore */

// ACTION TYPES
import { actionTypes } from '../Actions';
import { initialState } from '.';

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
    case actionTypes.CREATE_PROJECT_REQUEST:
    case actionTypes.FETCH_PROJECTS_REQUEST:
    case actionTypes.FETCH_PROJECT_REQUEST:
    case actionTypes.DELETE_PROJECTS_REQUEST:
    case actionTypes.FETCH_PROJECTS_FAIL:
    case actionTypes.FETCH_PROJECT_FAIL:
    case actionTypes.DELETE_PROJECTS_FAIL:
    case actionTypes.UPDATE_PROJECT_FAIL:
    case actionTypes.CREATE_PROJECT_FAIL:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    case actionTypes.DELETE_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload.projects,
        selectedProjects: action.payload.selectedProjects,
        isLoading: action.payload.isLoading,
      };

    case actionTypes.CREATE_PROJECT_SUCCESS:
    case actionTypes.FETCH_PROJECT_SUCCESS:
    case actionTypes.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: action.payload.projects,
        isLoading: action.payload.isLoading,
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
        isLoading: action.payload.isLoading,
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

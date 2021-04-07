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
const reducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS_REQUEST:
    case actionTypes.FETCH_PROJECT_REQUEST:
    case actionTypes.DELETE_PROJECTS_REQUEST:
    case actionTypes.EDIT_PROJECT_NAME_REQUEST:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    case actionTypes.FETCH_PROJECT_SUCCESS:
    case actionTypes.DELETE_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    case actionTypes.FETCH_PROJECTS_FAIL:
    case actionTypes.FETCH_PROJECT_FAIL:
    case actionTypes.DELETE_PROJECTS_FAIL:
    case actionTypes.EDIT_PROJECT_NAME_FAIL:
      return {
        ...state,
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
    case actionTypes.FETCH_PROJECTS:
      return {
        ...state,
        projects: action.projects,
      };
    case actionTypes.EDIT_PROJECT_NAME_SUCCESS:
      const updatedProject = action.project;
      const projectsAux = [...state.projects];
      const projectIndex = projectsAux.findIndex(
        (project) => project.uuid === updatedProject.uuid
      );
      projectsAux[projectIndex] = updatedProject;
      projectsAux.sort((a, b) => a.name.localeCompare(b.name));
      return {
        ...state,
        projects: projectsAux,
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

// EXPORT
export default reducer;

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
    case actionTypes.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.projects,
        selectedProjects: [],
        searchText: action.searchText,
        currentPage: action.currentPage,
        pageSize: action.pageSize,
        total: action.total,
      };
    case actionTypes.FETCH_PROJECTS:
      return {
        ...state,
        projects: action.projects,
      };
    case actionTypes.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.uuid !== action.projectId
        ),
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
      };
    case actionTypes.SELECTED_PROJECTS:
      return {
        ...state,
        selectedProjects: action.selectedProjects,
      };
    default:
      return state;
  }
};

// EXPORT
export default reducer;

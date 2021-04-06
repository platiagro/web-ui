// ACTION TYPES
import { actionTypes } from './Actions';
import projectActionTypes from '../project/actionTypes';

// INITIAL STATE
const initialState = {
  projects: [],
  selectedProjects: [],
  searchText: '',
  currentPage: null,
  pageSize: null,
  total: null,
};

/**
 * Projects Reducer
 *
 * @param {object} state Reducer initial state
 * @param {object} action Reducer action
 * @returns {object} New state
 */
const projectsReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case actionTypes.FETCH_PAGINATED_PROJECTS:
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
    case projectActionTypes.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.uuid !== action.projectId
        ),
      };
    case projectActionTypes.EDIT_PROJECT_NAME_SUCCESS:
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
export default projectsReducer;

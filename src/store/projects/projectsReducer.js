// ACTION TYPES
import actionTypes from './actionTypes';
import projectActionTypes from '../project/actionTypes';

// INITIAL STATE
const initialState = {
  projects: [],
  selectedProjects: [],
  currentPage: null,
  pageSize: null,
  total: null,
};

/**
 * projects reducer
 */
const projectsReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case actionTypes.FETCH_PAGINATED_PROJECTS:
      return {
        ...state,
        projects: action.projects,
        selectedProjects: [],
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

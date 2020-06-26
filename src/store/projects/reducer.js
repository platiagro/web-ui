// ACTION TYPES
import actionTypes from './actionTypes';
import projectActionTypes from '../project/actionTypes';

// INITIAL STATE
const initialState = {
  projects: [],
  pageSize: null,
  totalTasks: null,
};

/**
 * projects reducer
 */
const projects = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PAGINATED_PROJECTS:
      return {
        ...state,
        projects: action.projects,
        totalTasks: 10,
        pageSize: action.pageSize,
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
    default:
      return state;
  }
};

// EXPORT
export default projects;

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import projectsApi from '../../services/ProjectsApi';

// UI ACTIONS
import {
  projectsTableLoadingData,
  projectsTableDataLoaded,
} from '../ui/actions';

// ACTIONS
// ** FETCH PROJECTS
/**
 * fetch projects success action
 * @param {Object} response
 * @returns {Object} { type, projects }
 */
const fetchProjectsSuccess = (response) => (dispatch) => {
  // getting projects from response
  const projects = response.data;

  // dispatching projects table data loaded action
  dispatch(projectsTableDataLoaded());

  // dispatching fetch projects success action
  dispatch({
    type: actionTypes.FETCH_PROJECTS_SUCCESS,
    projects,
  });
};

/**
 * fetch projects fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const fetchProjectsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching projects table data loaded action
  dispatch(projectsTableDataLoaded());

  // dispatching fetch projects fail action
  dispatch({
    type: actionTypes.FETCH_PROJECTS_FAIL,
    errorMessage,
  });
};

/**
 * fetch projects request action
 * @returns {Function}
 */
const fetchProjectsRequest = () => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_PROJECTS_REQUEST,
  });

  // dispatching projects table loading data action
  dispatch(projectsTableLoadingData());

  // fetching projects
  projectsApi
    .listProjects()
    .then((response) => dispatch(fetchProjectsSuccess(response)))
    .catch((error) => dispatch(fetchProjectsFail(error)));
};

// EXPORT DEFAULT
export default fetchProjectsRequest;

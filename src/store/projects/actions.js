// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import projectsApi from '../../services/ProjectsApi';

// ACTIONS
// ** FETCH PROJECTS
/**
 * fetch projects success action
 * @param {Object} response
 * @returns {Object} { type, projects }
 */
const fetchProjectsSuccess = (response) => {
  // getting projects from response
  const projects = response.data;

  return {
    type: actionTypes.FETCH_PROJECTS_SUCCESS,
    projects,
  };
};

/**
 * fetch projects fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const fetchProjectsFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.FETCH_PROJECTS_FAIL,
    errorMessage,
  };
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

  // fetching projects
  projectsApi
    .listProjects()
    .then((response) => dispatch(fetchProjectsSuccess(response)))
    .catch((error) => dispatch(fetchProjectsFail(error)));
};

// EXPORT DEFAULT
export default fetchProjectsRequest;

// ACTION TYPES
const FETCH_PAGINATED_PROJECTS = 'FETCH_PAGINATED_PROJECTS';
const FETCH_PROJECTS = 'FETCH_PROJECTS';
const SELECTED_PROJECTS = 'SELECTED_PROJECTS';

const FETCH_PAGINATED_PROJECTS_REQUEST = 'FETCH_PAGINATED_PROJECTS_REQUEST';
const FETCH_PAGINATED_PROJECTS_SUCCESS = 'FETCH_PAGINATED_PROJECTS_SUCCESS';
const FETCH_PAGINATED_PROJECTS_FAIL = 'FETCH_PAGINATED_PROJECTS_FAIL';

const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST';
const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
const DELETE_PROJECT_FAIL = 'DELETE_PROJECT_FAIL';

const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST';
const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
const FETCH_PROJECTS_FAIL = 'FETCH_PROJECTS_FAIL';

const DELETE_SELECTED_PROJECTS_REQUEST = 'DELETE_SELECTED_PROJECTS_REQUEST';
const DELETE_SELECTED_PROJECTS_SUCCESS = 'DELETE_SELECTED_PROJECTS_SUCCESS';
const DELETE_SELECTED_PROJECTS_FAIL = 'DELETE_SELECTED_PROJECTS_FAIL';


// EXPORT
export default {
  FETCH_PAGINATED_PROJECTS,
  FETCH_PROJECTS,
  SELECTED_PROJECTS,

  // REQUEST
  FETCH_PAGINATED_PROJECTS_REQUEST,
  DELETE_PROJECT_REQUEST,
  FETCH_PROJECTS_REQUEST,
  DELETE_SELECTED_PROJECTS_REQUEST,
  
  //SUCCESS
  FETCH_PAGINATED_PROJECTS_SUCCESS,
  DELETE_PROJECT_SUCCESS,
  FETCH_PROJECTS_SUCCESS,
  DELETE_SELECTED_PROJECTS_SUCCESS,
  
  //FAIL
  FETCH_PAGINATED_PROJECTS_FAIL,
  DELETE_PROJECT_FAIL,
  FETCH_PROJECTS_FAIL,
  DELETE_SELECTED_PROJECTS_FAIL,

};

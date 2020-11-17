// ACTION TYPES
// REQUEST
// fetch operators request
// create operator to flow request
const CREATE_OPERATOR_REQUEST = 'CREATE_OPERATOR_REQUEST';
// remove operator from flow request
const REMOVE_OPERATOR_REQUEST = 'REMOVE_OPERATOR_REQUEST';
// set operator params request
const SET_OPERATOR_PARAMETERS_REQUEST = 'SET_OPERATOR_PARAMETERS_REQUEST';
// get operator results request
const GET_OPERATOR_RESULTS_REQUEST = 'GET_OPERATOR_RESULTS_REQUEST';
const GET_OPERATOR_METRICS_REQUEST = 'GET_OPERATOR_METRICS_REQUEST';

// SUCCESS
// fetch operators success
// create operator to flow success
const CREATE_OPERATOR_SUCCESS = 'CREATE_OPERATOR_SUCCESS';
// remove operator from flow success
const REMOVE_OPERATOR_SUCCESS = 'REMOVE_OPERATOR_SUCCESS';
// set operator params success
const SET_OPERATOR_PARAMETERS_SUCCESS = 'SET_OPERATOR_PARAMETERS_SUCCESS';
// get operator results success
const GET_OPERATOR_RESULTS_SUCCESS = 'GET_OPERATOR_RESULTS_SUCCESS';
const GET_OPERATOR_METRICS_SUCCESS = 'GET_OPERATOR_METRICS_SUCCESS';
// get operator logs
const GET_OPERATOR_LOGS_SUCCESS = 'GET_OPERATOR_LOGS_SUCESS';

// FAIL
// fetch operators fail
// create operator to flow fail
const CREATE_OPERATOR_FAIL = 'CREATE_OPERATOR_FAIL';
// remove operator from flow fail
const REMOVE_OPERATOR_FAIL = 'REMOVE_OPERATOR_FAIL';
// set operator params fail
const SET_OPERATOR_PARAMETERS_FAIL = 'SET_OPERATOR_PARAMETERS_FAIL';
// get operator results fail
const GET_OPERATOR_RESULTS_FAIL = 'GET_OPERATOR_RESULTS_FAIL';
const GET_OPERATOR_METRICS_FAIL = 'GET_OPERATOR_METRICS_FAIL';
// get operator logs
const GET_OPERATOR_LOGS_FAIL = 'GET_OPERATOR_LOGS_FAIL';

// COMMON
// select operator
const SELECT_OPERATOR = 'SELECT_OPERATOR';
// deselect operator
const DESELECT_OPERATOR = 'DESELECT_OPERATOR';

// SAVE POSITION 
const POSITION_REQUEST = 'POSITION_REQUEST';
const POSITION_SUCCESS = 'POSITION_SUCCES';
const POSITION_FAIL = 'POSITION_FAIL';



// EXPORT
export default {
  // REQUEST
  CREATE_OPERATOR_REQUEST,
  REMOVE_OPERATOR_REQUEST,
  SET_OPERATOR_PARAMETERS_REQUEST,
  GET_OPERATOR_RESULTS_REQUEST,
  GET_OPERATOR_METRICS_REQUEST,

  // SUCCESS
  CREATE_OPERATOR_SUCCESS,
  REMOVE_OPERATOR_SUCCESS,
  SET_OPERATOR_PARAMETERS_SUCCESS,
  GET_OPERATOR_RESULTS_SUCCESS,
  GET_OPERATOR_METRICS_SUCCESS,
  GET_OPERATOR_LOGS_SUCCESS,

  // FAIL
  CREATE_OPERATOR_FAIL,
  REMOVE_OPERATOR_FAIL,
  SET_OPERATOR_PARAMETERS_FAIL,
  GET_OPERATOR_RESULTS_FAIL,
  GET_OPERATOR_METRICS_FAIL,
  GET_OPERATOR_LOGS_FAIL,

  // COMMON
  SELECT_OPERATOR,
  DESELECT_OPERATOR,

  // POSITION
  POSITION_REQUEST,
  POSITION_SUCCESS,
  POSITION_FAIL
};

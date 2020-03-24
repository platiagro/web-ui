// ACTION TYPES
// REQUEST
// fetch operators request
// add operator to flow request
const ADD_OPERATOR_REQUEST = 'ADD_OPERATOR_REQUEST';
// remove operator from flow request
const REMOVE_OPERATOR_REQUEST = 'REMOVE_OPERATOR_REQUEST';
// set operator params request
const SET_OPERATOR_PARAMS_REQUEST = 'SET_OPERATOR_PARAMS_REQUEST';

// SUCCESS
// fetch operators success
// add operator to flow success
const ADD_OPERATOR_SUCCESS = 'ADD_OPERATOR_SUCCESS';
// remove operator from flow success
const REMOVE_OPERATOR_SUCCESS = 'REMOVE_OPERATOR_SUCCESS';
// set operator params success
const SET_OPERATOR_PARAMS_SUCCESS = 'SET_OPERATOR_PARAMS_SUCCESS';

// FAIL
// fetch operators fail
// add operator to flow fail
const ADD_OPERATOR_FAIL = 'ADD_OPERATOR_FAIL';
// remove operator from flow fail
const REMOVE_OPERATOR_FAIL = 'REMOVE_OPERATOR_FAIL';
// set operator params fail
const SET_OPERATOR_PARAMS_FAIL = 'SET_OPERATOR_PARAMS_FAIL';

// COMMON
// select operator
const SELECT_OPERATOR = 'SELECT_OPERATOR';

// EXPORT
export default {
  // REQUEST
  ADD_OPERATOR_REQUEST,
  REMOVE_OPERATOR_REQUEST,
  SET_OPERATOR_PARAMS_REQUEST,

  // SUCCESS
  ADD_OPERATOR_SUCCESS,
  REMOVE_OPERATOR_SUCCESS,
  SET_OPERATOR_PARAMS_SUCCESS,

  // FAIL
  ADD_OPERATOR_FAIL,
  REMOVE_OPERATOR_FAIL,
  SET_OPERATOR_PARAMS_FAIL,

  // COMMON
  SELECT_OPERATOR,
};

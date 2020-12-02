// ACTION TYPES
// REQUEST
const CREATE_OPERATOR_REQUEST = 'CREATE_OPERATOR_REQUEST';
const DOWNLOAD_OPERATOR_DATASET_RESULT_REQUEST =
  'DOWNLOAD_OPERATOR_DATASET_RESULT_REQUEST';
const GET_OPERATOR_DATASET_RESULT_REQUEST =
  'GET_OPERATOR_DATASET_RESULT_REQUEST';
const GET_OPERATOR_FIGURES_REQUEST = 'GET_OPERATOR_FIGURES_REQUEST';
const GET_OPERATOR_METRICS_REQUEST = 'GET_OPERATOR_METRICS_REQUEST';
const REMOVE_OPERATOR_REQUEST = 'REMOVE_OPERATOR_REQUEST';
const SET_OPERATOR_PARAMETERS_REQUEST = 'SET_OPERATOR_PARAMETERS_REQUEST';

// SUCCESS
const CREATE_OPERATOR_SUCCESS = 'CREATE_OPERATOR_SUCCESS';
const DOWNLOAD_OPERATOR_DATASET_RESULT_SUCCESS =
  'DOWNLOAD_OPERATOR_DATASET_RESULT_SUCCESS';
const GET_OPERATOR_DATASET_RESULT_SUCCESS =
  'GET_OPERATOR_DATASET_RESULT_SUCCESS';
const GET_OPERATOR_FIGURES_SUCCESS = 'GET_OPERATOR_FIGURES_SUCCESS';
const GET_OPERATOR_LOGS_SUCCESS = 'GET_OPERATOR_LOGS_SUCESS';
const GET_OPERATOR_METRICS_SUCCESS = 'GET_OPERATOR_METRICS_SUCCESS';
const SET_OPERATOR_PARAMETERS_SUCCESS = 'SET_OPERATOR_PARAMETERS_SUCCESS';

// FAIL
const CREATE_OPERATOR_FAIL = 'CREATE_OPERATOR_FAIL';
const DOWNLOAD_OPERATOR_DATASET_RESULT_FAIL =
  'DOWNLOAD_OPERATOR_DATASET_RESULT_FAIL';
const GET_OPERATOR_DATASET_RESULT_FAIL = 'GET_OPERATOR_DATASET_RESULT_FAIL';
const GET_OPERATOR_FIGURES_FAIL = 'GET_OPERATOR_FIGURES_FAIL';
const GET_OPERATOR_LOGS_FAIL = 'GET_OPERATOR_LOGS_FAIL';
const GET_OPERATOR_METRICS_FAIL = 'GET_OPERATOR_METRICS_FAIL';
const REMOVE_OPERATOR_FAIL = 'REMOVE_OPERATOR_FAIL';
const SET_OPERATOR_PARAMETERS_FAIL = 'SET_OPERATOR_PARAMETERS_FAIL';

// COMMON
const DESELECT_OPERATOR = 'DESELECT_OPERATOR';
const SELECT_OPERATOR = 'SELECT_OPERATOR';

// EXPORT
export default {
  // REQUEST
  CREATE_OPERATOR_REQUEST,
  DOWNLOAD_OPERATOR_DATASET_RESULT_REQUEST,
  GET_OPERATOR_DATASET_RESULT_REQUEST,
  GET_OPERATOR_FIGURES_REQUEST,
  GET_OPERATOR_METRICS_REQUEST,
  REMOVE_OPERATOR_REQUEST,
  SET_OPERATOR_PARAMETERS_REQUEST,

  // SUCCESS
  CREATE_OPERATOR_SUCCESS,
  DOWNLOAD_OPERATOR_DATASET_RESULT_SUCCESS,
  GET_OPERATOR_DATASET_RESULT_SUCCESS,
  GET_OPERATOR_FIGURES_SUCCESS,
  GET_OPERATOR_LOGS_SUCCESS,
  GET_OPERATOR_METRICS_SUCCESS,
  SET_OPERATOR_PARAMETERS_SUCCESS,

  // FAIL
  CREATE_OPERATOR_FAIL,
  DOWNLOAD_OPERATOR_DATASET_RESULT_FAIL,
  GET_OPERATOR_DATASET_RESULT_FAIL,
  GET_OPERATOR_FIGURES_FAIL,
  GET_OPERATOR_LOGS_FAIL,
  GET_OPERATOR_METRICS_FAIL,
  REMOVE_OPERATOR_FAIL,
  SET_OPERATOR_PARAMETERS_FAIL,

  // COMMON
  DESELECT_OPERATOR,
  SELECT_OPERATOR,
};

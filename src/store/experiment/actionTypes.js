// ACTION TYPES
// REQUEST
// fetch experiment request
const FETCH_EXPERIMENT_REQUEST = 'FETCH_EXPERIMENT_REQUEST';
// edit experiment name request
const EDIT_EXPERIMENT_NAME_REQUEST = 'EDIT_EXPERIMENT_NAME_REQUEST';
// train experiment request
const TRAIN_EXPERIMENT_REQUEST = 'TRAIN_EXPERIMENT_REQUEST';
// deploy experiment request
const DEPLOY_EXPERIMENT_REQUEST = 'DEPLOY_EXPERIMENT_REQUEST';
// create experiment request
const CREATE_EXPERIMENT_REQUEST = 'CREATE_EXPERIMENT_REQUEST';
// delete experiment request
const DELETE_EXPERIMENT_REQUEST = 'DELETE_EXPERIMENT_REQUEST';
// set dataset request
const SET_DATASET_REQUEST = 'SET_DATASET_REQUEST';

// SUCCESS
// fetch experiment success
const FETCH_EXPERIMENT_SUCCESS = 'FETCH_EXPERIMENT_SUCCESS';
// edit experiment name success
const EDIT_EXPERIMENT_NAME_SUCCESS = 'EDIT_EXPERIMENT_NAME_SUCCESS';
// train experiment success
const TRAIN_EXPERIMENT_SUCCESS = 'TRAIN_EXPERIMENT_SUCCESS';
// deploy experiment success
const DEPLOY_EXPERIMENT_SUCCESS = 'DEPLOY_EXPERIMENT_SUCCESS';
// create experiment success
const CREATE_EXPERIMENT_SUCCESS = 'CREATE_EXPERIMENT_SUCCESS';
// delete experiment success
const DELETE_EXPERIMENT_SUCCESS = 'DELETE_EXPERIMENT_SUCCESS';
// set dataset success
const SET_DATASET_SUCCESS = 'SET_DATASET_SUCCESS';

// FAIL
// fetch experiment fail
const FETCH_EXPERIMENT_FAIL = 'FETCH_EXPERIMENT_FAIL';
// edit experiment name fail
const EDIT_EXPERIMENT_NAME_FAIL = 'EDIT_EXPERIMENT_NAME_FAIL';
// train experiment fail
const TRAIN_EXPERIMENT_FAIL = 'TRAIN_EXPERIMENT_FAIL';
// deploy experiment fail
const DEPLOY_EXPERIMENT_FAIL = 'DEPLOY_EXPERIMENT_FAIL';
// create experiment fail
const CREATE_EXPERIMENT_FAIL = 'CREATE_EXPERIMENT_FAIL';
// delete experiment fail
const DELETE_EXPERIMENT_FAIL = 'DELETE_EXPERIMENT_FAIL';
// set dataset fail
const SET_DATASET_FAIL = 'SET_DATASET_FAIL';

// EXPORT
export default {
  // REQUEST
  FETCH_EXPERIMENT_REQUEST,
  EDIT_EXPERIMENT_NAME_REQUEST,
  TRAIN_EXPERIMENT_REQUEST,
  DEPLOY_EXPERIMENT_REQUEST,
  CREATE_EXPERIMENT_REQUEST,
  DELETE_EXPERIMENT_REQUEST,
  SET_DATASET_REQUEST,

  // SUCCESS
  FETCH_EXPERIMENT_SUCCESS,
  EDIT_EXPERIMENT_NAME_SUCCESS,
  TRAIN_EXPERIMENT_SUCCESS,
  DEPLOY_EXPERIMENT_SUCCESS,
  CREATE_EXPERIMENT_SUCCESS,
  DELETE_EXPERIMENT_SUCCESS,
  SET_DATASET_SUCCESS,

  // FAIL
  FETCH_EXPERIMENT_FAIL,
  EDIT_EXPERIMENT_NAME_FAIL,
  TRAIN_EXPERIMENT_FAIL,
  DEPLOY_EXPERIMENT_FAIL,
  CREATE_EXPERIMENT_FAIL,
  DELETE_EXPERIMENT_FAIL,
  SET_DATASET_FAIL,
};

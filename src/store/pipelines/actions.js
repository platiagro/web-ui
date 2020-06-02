// ACTION TYPES
import actionTypes from './actionTypes';

// EXPERIMENT ACTION TYPES
import experimentActionTypes from '../experiment/actionTypes';

// SERVICES
import pipelinesApi from '../../services/PipelinesApi';

// UI ACTIONS
import {
  experimentTrainingLoadingData,
  experimentTrainingDataLoaded,
} from '../ui/actions';

// ACTIONS
// ** TRAIN EXPERIMENT
/**
 * train experiment success action
 * @returns {Object} { type }
 */
const trainExperimentSuccess = () => {
  return {
    type: actionTypes.TRAIN_EXPERIMENT_SUCCESS,
  };
};

/**
 * train experiment fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const trainExperimentFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiment training data loaded
  dispatch(experimentTrainingDataLoaded());

  dispatch({
    type: actionTypes.TRAIN_EXPERIMENT_FAIL,
    errorMessage,
  });
};

/**
 * train experiment request action
 * @param {Object} experiment
 * @param {Object[]} operators
 * @returns {Function}
 */
export const trainExperimentRequest = (experiment, operators) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.TRAIN_EXPERIMENT_REQUEST,
  });

  // dispatching experiment training loading data action
  dispatch(experimentTrainingLoadingData());

  // getting experiment data
  const { uuid: experimentId, dataset, target } = experiment;

  // creating train object
  const trainObject = { experimentId, dataset, target };

  // getting operators
  trainObject.components = operators.map((operator) => ({
    operatorId: operator.uuid,
    notebookPath: operator.trainingNotebookPath,
  }));

  // filtering dataset
  trainObject.components = trainObject.components.filter(
    (operator) => operator.operatorId !== 'dataset'
  );

  // training experiment
  pipelinesApi
    .trainExperiment(trainObject)
    .then(() => dispatch(trainExperimentSuccess()))
    .catch((error) => dispatch(trainExperimentFail(error)));
};

// // // // // // // // // //

// ** GET TRAIN EXPERIMENT STATUS
/**
 * get train experiment status success action
 * @param {Object} response
 * @returns {Object} { type }
 */
const getTrainExperimentStatusSuccess = (response) => (dispatch) => {
  // getting status from response
  const { status } = response.data;

  // training experiment is running?
  let isRunning = false;

  // training experiment is succeeded
  let isSucceeded = true;

  // checking status operators to verify if traning is running or pending
  if (
    Object.values(status).includes('Running') ||
    Object.values(status).includes('Pending')
  )
    isRunning = true;

  // checking status operators to verify if traning is succeeded
  Object.values(status).forEach((statusValue) => {
    if (
      statusValue === 'Running' ||
      statusValue === 'Failed' ||
      statusValue === '' ||
      statusValue === 'Pending'
    )
      isSucceeded = false;
  });

  // experiment training is succeeded
  if (isSucceeded)
    dispatch({ type: experimentActionTypes.TRAINING_EXPERIMENT_SUCCEEDED });

  // experiment training not is running
  if (!isRunning) dispatch(experimentTrainingDataLoaded());
  else dispatch(experimentTrainingLoadingData());

  dispatch({
    type: actionTypes.GET_TRAIN_EXPERIMENT_STATUS_SUCCESS,
    status,
  });
};

/**
 * get train experiment status fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const getTrainExperimentStatusFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // experiment training not is running
  if (errorMessage !== 'Network Error') {
    dispatch(experimentTrainingDataLoaded());
    dispatch({ type: experimentActionTypes.TRAINING_EXPERIMENT_NOT_SUCCEEDED });
  }

  dispatch({
    type: actionTypes.GET_TRAIN_EXPERIMENT_STATUS_FAIL,
    errorMessage,
  });
};

/**
 * get train experiment status request action
 * @param {string} experimentId
 * @param {Object[]} operators
 * @returns {Function}
 */
export const getTrainExperimentStatusRequest = (experimentId) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.GET_TRAIN_EXPERIMENT_STATUS_REQUEST,
  });

  // training experiment
  pipelinesApi
    .getTrainExperimentStatus(experimentId)
    .then((response) => dispatch(getTrainExperimentStatusSuccess(response)))
    .catch((error) => dispatch(getTrainExperimentStatusFail(error)));
};

// // // // // // // // // //

// ** DEPLOY EXPERIMENT
/**
 * deploy experiment success action
 * @returns {Object} { type }
 */
const deployExperimentSuccess = () => {
  return {
    type: actionTypes.DEPLOY_EXPERIMENT_SUCCESS,
  };
};

/**
 * deploy experiment fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const deployExperimentFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.DEPLOY_EXPERIMENT_FAIL,
    errorMessage,
  };
};

/**
 * deploy experiment request action
 * @param {Object} experiment
 * @param {Object[]} operators
 * @returns {Function}
 */
export const deployExperimentRequest = (experiment, operators) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.DEPLOY_EXPERIMENT_REQUEST,
  });

  // getting experiment data
  const { uuid: experimentId, dataset, target } = experiment;

  // creating deploy object
  const deployObject = { experimentId, dataset, target };

  // getting operators
  deployObject.components = operators.map((operator) => ({
    operatorId: operator.uuid,
    notebookPath: operator.inferenceNotebookPath,
  }));

  // filtering dataset
  deployObject.components = deployObject.components.filter(
    (operator) => operator.operatorId !== 'dataset'
  );

  // deploying experiment
  pipelinesApi
    .deployExperiment(deployObject)
    .then(() => dispatch(deployExperimentSuccess()))
    .catch((error) => dispatch(deployExperimentFail(error)));
};

// // // // // // // // // //

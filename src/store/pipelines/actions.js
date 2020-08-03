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

// UTILS
import utils from '../../utils';

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
export const trainExperimentRequest = (experiment, operators) => (
  dispatch,
  getState
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.TRAIN_EXPERIMENT_REQUEST,
  });

  // dispatching experiment training loading data action
  dispatch(experimentTrainingLoadingData());

  // getting componenst from store
  const { componentsReducer: components } = getState();

  // get dataset name
  const datasetName = utils.getDatasetName(components, operators);

  // getting experiment data
  const { uuid: experimentId } = experiment;

  // creating train object
  const trainObject = { experimentId };

  // getting operators
  trainObject.components = operators.map((operator) => {
    // configuring parameters
    const configuredParameters = operator.parameters.map((parameter) => ({
      name: parameter.name,
      value: parameter.value,
    }));

    // add dataset parameter
    if (datasetName && !operator.tags.includes('DATASETS')) {
      configuredParameters.push({ name: 'dataset', value: datasetName });
    }

    return {
      operatorId: operator.uuid,
      notebookPath: operator.experimentNotebookPath,
      commands: operator.commands,
      dependencies: operator.dependencies,
      parameters: configuredParameters,
    };
  });

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

  // checking status operators to verify if training is running or pending
  if (
    Object.values(status).includes('Running') ||
    Object.values(status).includes('Pending')
  ) {
    isRunning = true;
  }

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
    experimentIsRunning: isRunning,
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
 * @param {string} experimentId
 * @param {Object} routerProps
 * @returns {Object} { type }
 */
const deployExperimentSuccess = (experimentId, routerProps) => () => {
  // go to deployed experiments
  routerProps.history.push(`/fluxos-implantados?experiment=${experimentId}`);

  // dispatching deploy experiment success
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
 * @param {Object} routerProps
 * @returns {Function}
 */
export const deployExperimentRequest = (
  project,
  experiment,
  operators,
  routerProps
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.DEPLOY_EXPERIMENT_REQUEST,
  });

  // creating deploy object
  const deployObject = {
    name: `${project.name}/${experiment.name}`,
    dataset: experiment.dataset,
  };

  // getting operators
  deployObject.components = operators.map((operator) => ({
    commands: operator.commands,
    dependencies: operator.dependencies,
    notebookPath: operator.deploymentNotebookPath,
    operatorId: operator.uuid,
  }));

  // deploying experiment
  pipelinesApi
    .deployExperiment(experiment.uuid, deployObject)
    .then(() => dispatch(deployExperimentSuccess(experiment.uuid, routerProps)))
    .catch((error) => dispatch(deployExperimentFail(error)));
};

// // // // // // // // // //

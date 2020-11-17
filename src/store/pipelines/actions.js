// ACTION TYPES
import actionTypes from './actionTypes';

// EXPERIMENT ACTION TYPES
import experimentActionTypes from '../experiment/actionTypes';

// SERVICES
import pipelinesApi from '../../services/PipelinesApi';

// UI LIBS
import { message } from 'antd';

// UI ACTIONS
import {
  experimentTrainingLoadingData,
  experimentTrainingDataLoaded,
  experimentDeleteTrainingLoadingData,
  experimentDeleteTrainingDataLoaded,
} from '../ui/actions';

// UTILS
import utils from '../../utils';

// ACTIONS
// ** TRAIN EXPERIMENT
/**
 * train experiment success action
 *
 * @returns {object} { type }
 */
const fetchTrainExperimentSuccess = () => {
  message.success('Treinamento iniciado!');
};

/**
 * train experiment fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const fetchTrainExperimentFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiment training data loaded
  dispatch(experimentTrainingDataLoaded());

  message.error(errorMessage);
};

/**
 * train experiment request action
 *
 * @param {object} experiment
 * @param {object[]} operators
 * @returns {Function}
 */
export const createExperimentRunRequest = (experiment, operators) => (
  dispatch,
  getState
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.TRAIN_EXPERIMENT_REQUEST,
  });

  // dispatching experiment training loading data action
  dispatch(experimentTrainingLoadingData());

  // getting tasks from store
  const { tasksReducer } = getState();
  const tasks = tasksReducer.tasks;

  // get dataset name
  const datasetName = utils.getDatasetName(tasks, operators);

  // getting experiment data
  const { uuid: experimentId } = experiment;

  // creating train object
  const trainObject = { experimentId };

  // getting operators
  trainObject.operators = operators.map((operator) => {
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
      image: operator.image,
      commands: operator.commands,
      arguments: operator.args,
      dependencies: operator.dependencies,
      notebookPath: operator.experimentNotebookPath,
      parameters: configuredParameters,
      operatorId: operator.uuid,
    };
  });

  // training experiment
  pipelinesApi
    .trainExperiment(trainObject)
    .then(() => fetchTrainExperimentSuccess())
    .catch((error) => dispatch(fetchTrainExperimentFail(error)));
};

// // // // // // // // // //

// ** GET TRAIN EXPERIMENT STATUS
/**
 * get train experiment status success action
 *
 * @param {object} response
 * @returns {object} { type }
 */
const fetchTrainExperimentStatusSuccess = (response) => (
  dispatch,
  getState
) => {
  // getting operators from response
  const { operators } = response.data;

  // training experiment is running?
  let isRunning = false;

  // training experiment is succeeded
  let isSucceeded = true;

  // checking status operators to verify if training is running, pending or succeeded
  Object.values(operators).forEach((operator) => {
    const status = operator.status;
    if (status === 'Pending' || status === 'Running') {
      isRunning = true;
      isSucceeded = false;
    } else if (
      status === '' ||
      status === 'Failed' ||
      status === 'Terminated'
    ) {
      isSucceeded = false;
    }
  });

  // experiment training is succeeded
  if (isSucceeded)
    dispatch({ type: experimentActionTypes.TRAINING_EXPERIMENT_SUCCEEDED });

  // get deleteLoading state
  const { uiReducer } = getState();
  let deleteLoading = uiReducer.experimentTraining.deleteLoading;

  // experiment training not is running
  if (!isRunning) {
    dispatch(experimentTrainingDataLoaded());
    // check if is interrupting flow
    if (deleteLoading) {
      dispatch(experimentDeleteTrainingDataLoaded());
      message.success('Treinamento interrompido!');
      deleteLoading = false;
    }
  } else {
    dispatch(experimentTrainingLoadingData());
  }

  dispatch({
    type: actionTypes.GET_TRAIN_EXPERIMENT_STATUS_SUCCESS,
    operatorsLatestTraining: operators,
    experimentIsRunning: isRunning,
    interruptIsRunning: deleteLoading,
  });
};

/**
 * get train experiment status fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const fetchTrainExperimentStatusFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // experiment training not is running
  if (errorMessage !== 'Network Error') {
    dispatch(experimentTrainingDataLoaded());
    dispatch({ type: experimentActionTypes.TRAINING_EXPERIMENT_NOT_SUCCEEDED });
  }
};

/**
 * get train experiment status request action
 *
 * @param {string} experimentId
 * @param {object[]} operators
 * @returns {Function}
 */
export const fetchTrainExperimentStatusRequest = (experimentId) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.GET_TRAIN_EXPERIMENT_STATUS_REQUEST,
  });

  // training experiment
  pipelinesApi
    .getTrainExperimentStatus(experimentId)
    .then((response) => dispatch(fetchTrainExperimentStatusSuccess(response)))
    .catch((error) => dispatch(fetchTrainExperimentStatusFail(error)));
};

// // // // // // // // // //

/**
 * Deploy experiment
 *
 * @param project
 * @param {object} experiment
 * @param {object[]} operators
 * @param {object} routerProps
 * @returns {Function}
 */
export const createDeploymentRequest = (
  project,
  experiment,
  operators,
  routerProps
) => (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_DEPLOYMENT_REQUEST,
  });

  // creating deploy object
  const deployObject = {
    name: `${project.name}/${experiment.name}`,
    dataset: experiment.dataset,
  };

  // getting operators
  deployObject.operators = operators.map((operator) => ({
    image: operator.image,
    commands: operator.commands,
    arguments: operator.args,
    dependencies: operator.dependencies,
    notebookPath: operator.deploymentNotebookPath,
    operatorId: operator.uuid,
  }));

  // deploying experiment
  pipelinesApi
    .deployExperiment(experiment.uuid, deployObject)
    .then(() => {
      dispatch({
        type: actionTypes.CREATE_DEPLOYMENT_SUCCESS,
      });
      routerProps.history.push(`/projetos/${project.uuid}`);
      message.success('Experimento implantado!');
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.CREATE_DEPLOYMENT_FAIL,
      });
      const errorMessage = error.message;
      message.error(errorMessage);
    });
};

// // // // // // // // // //

/**
 * Delete train experiment
 *
 * @param {string} experimentId
 * @returns {Function}
 */
export const fetchDeleteTrainExperiment = (experimentId) => (dispatch) => {
  dispatch(experimentDeleteTrainingLoadingData());
  pipelinesApi
    .deleteTrainExperiment(experimentId)
    .then(() => {
      message.loading('Interrompendo execução...', 5);
      dispatch(fetchTrainExperimentStatusRequest(experimentId));
    })
    .catch((error) => {
      dispatch(experimentDeleteTrainingDataLoaded());
      message.error(error.message);
    });
};

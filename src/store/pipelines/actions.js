// ACTION TYPES
import actionTypes from './actionTypes';

// EXPERIMENT ACTION TYPES
import experimentActionTypes from '../experiment/actionTypes';

// SERVICES
import experimentsApi from 'services/ExperimentsApi';
import pipelinesApi from 'services/PipelinesApi';

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

  // getting tasks from store
  const { tasksReducer } = getState();
  const tasks = tasksReducer.tasks;

  // get dataset name
  const datasetName = utils.getDatasetName(tasks, operators);

  // getting experiment data
  const { uuid: experimentId, projectId } = experiment;

  // creating train object
  const trainObject = { experimentId };
  trainObject.operators = operators.map((operator) => {
    const configuredParameters = configureTrainParamenters(
      datasetName,
      operator
    );
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
    .then(async (response) => {
      const runId = response.data.runId;
      const trainHistoryObject = { runId };
      trainHistoryObject.operators = operators.map((operator) => {
        const configuredParameters = configureTrainParamenters(
          datasetName,
          operator
        );
        return {
          parameters: configuredParameters,
          operatorId: operator.uuid,
          taskId: operator.taskId,
        };
      });

      await experimentsApi
        .createExperimentTrainingHistory(
          projectId,
          experimentId,
          trainHistoryObject
        )
        .catch((error) => {
          message.error('Erro ao salvar o histórico de treinamento!');
        });
      message.success('Treinamento iniciado!');
    })
    .catch((error) => {
      dispatch(experimentTrainingDataLoaded());
      const errorMessage = error.message;
      message.error(errorMessage);
    });
};

const configureTrainParamenters = (datasetName, operator) => {
  // configuring parameters
  const configuredParameters = operator.parameters.map((parameter) => ({
    name: parameter.name,
    value: parameter.value,
  }));

  // add dataset parameter
  if (datasetName && !operator.tags.includes('DATASETS')) {
    configuredParameters.push({ name: 'dataset', value: datasetName });
  }

  return configuredParameters;
};

// // // // // // // // // //

// ** GET TRAIN EXPERIMENT STATUS
/**
 * get train experiment status success action
 * @param {Object} response
 * @returns {Object} { type }
 */
const getTrainExperimentStatusSuccess = (response) => (dispatch, getState) => {
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

  message.success('Experimento implantado!');
};

/**
 * deploy experiment fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const deployExperimentFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  message.error(errorMessage);
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
    .then(() => deployExperimentSuccess(experiment.uuid, routerProps))
    .catch((error) => deployExperimentFail(error));
};

// // // // // // // // // //

/**
 * Delete train experiment
 *
 * @param {String} experimentId
 * @returns {Function}
 */
export const deleteTrainExperiment = (experimentId) => (dispatch) => {
  dispatch(experimentDeleteTrainingLoadingData());
  pipelinesApi
    .deleteTrainExperiment(experimentId)
    .then(() => {
      message.loading('Interrompendo execução...', 5);
      dispatch(getTrainExperimentStatusRequest(experimentId));
    })
    .catch((error) => {
      dispatch(experimentDeleteTrainingDataLoaded());
      message.error(error.message);
    });
};

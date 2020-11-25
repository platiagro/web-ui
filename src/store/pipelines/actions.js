// ACTION TYPES
import actionTypes from './actionTypes';

// EXPERIMENT ACTION TYPES
import experimentActionTypes from 'store/experiment/actionTypes';

// SERVICES
import pipelinesApi from 'services/PipelinesApi';

// UI LIBS
import { message } from 'antd';

// UI ACTIONS
import {
  experimentTrainingLoadingData,
  experimentTrainingDataLoaded,
  experimentDeleteTrainingLoadingData,
  experimentDeleteTrainingDataLoaded,
} from 'store/ui/actions';

// ACTIONS
// ** TRAIN EXPERIMENT
/**
 * train experiment success action
 *
 * @returns {object} { type }
 */
const trainExperimentSuccess = () => {
  message.success('Treinamento iniciado!');
};

/**
 * train experiment fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const trainExperimentFail = (error) => (dispatch) => {
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
 * @returns {Function}
 */
export const trainExperimentRequest = (experiment) => (dispatch) => {
  dispatch({
    type: actionTypes.TRAIN_EXPERIMENT_REQUEST,
  });

  dispatch(experimentTrainingLoadingData());

  const { projectId, uuid: experimentId } = experiment;

  pipelinesApi
    .trainExperiment(projectId, experimentId)
    .then(() => trainExperimentSuccess())
    .catch((error) => dispatch(trainExperimentFail(error)));
};

// // // // // // // // // //

// ** GET TRAIN EXPERIMENT STATUS
/**
 * get train experiment status success action
 *
 * @param {object} response
 * @returns {object} { type }
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
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
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
 *
 * @param {string} experimentId
 * @param {object[]} operators
 * @returns {Function}
 */
export const getTrainExperimentStatusRequest = (projectId, experimentId) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.GET_TRAIN_EXPERIMENT_STATUS_REQUEST,
  });

  // training experiment
  pipelinesApi
    .getTrainExperimentStatus(projectId, experimentId, experimentId)
    .then((response) => dispatch(getTrainExperimentStatusSuccess(response)))
    .catch((error) => dispatch(getTrainExperimentStatusFail(error)));
};

// // // // // // // // // //

/**
 * Deploy experiment
 *
 * @param {object} project
 * @param {object} experiment
 * @param {object} routerProps
 * @returns {Function}
 */
export const deployExperimentRequest = (project, experiment, routerProps) => (
  dispatch
) => {
  dispatch({
    type: actionTypes.DEPLOY_EXPERIMENT_REQUEST,
  });

  // deploying experiment
  pipelinesApi
    .deployExperiment(project.uuid, experiment.uuid)
    .then(() => {
      dispatch({
        type: actionTypes.DEPLOY_EXPERIMENT_SUCCESS,
      });
      routerProps.history.push(`/projetos/${project.uuid}/experimentos`);
      message.success('Experimento implantado!');
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.DEPLOY_EXPERIMENT_FAIL,
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
export const deleteTrainExperiment = (projectId, experimentId) => (
  dispatch
) => {
  dispatch(experimentDeleteTrainingLoadingData());
  pipelinesApi
    .deleteTrainExperiment(projectId, experimentId)
    .then(() => {
      message.loading('Interrompendo execução...', 5);
      dispatch(getTrainExperimentStatusRequest(projectId, experimentId));
    })
    .catch((error) => {
      dispatch(experimentDeleteTrainingDataLoaded());
      message.error(error.message);
    });
};

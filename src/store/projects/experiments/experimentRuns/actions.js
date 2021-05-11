// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import experimentRunsApi from 'services/ExperimentRunsApi';
import operatorsApi from 'services/OperatorsApi';

import { getExperiments } from 'store/projects/experiments/experiments.selectors';
import { getProjects } from 'store/projects/projects.selectors';
import { showError, showSuccess } from 'store/message';

// UI ACTIONS
import {
  experimentDeleteTrainingDataLoaded,
  experimentDeleteTrainingLoadingData,
  experimentTrainingDataLoaded,
  experimentTrainingLoadingData,
  implantedExperimentsLoadingData,
  resultsButtonBarLoadingData,
  resultsButtonBarDataLoaded,
} from 'store/ui/actions';

// UTILS
import utils from 'utils';

// ACTIONS
// ** FETCH EXPERIMENT RUNS
/**
 * Fetch experiment runs success action
 *
 * @param {object} response Response body
 * @returns {object} { type, experiment }
 */
const fetchExperimentRunsSuccess = (response) => (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_EXPERIMENT_RUNS_SUCCESS,
    runs: response.data,
  });
};

/**
 * Fetch experiment runs fail action
 *
 * @param {object} error
 * @param routerProps
 * @returns {object} { type, errorMessage }
 */
const fetchExperimentRunsFail = (error, routerProps) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching fetch experiment runs fail action response
  dispatch({
    type: actionTypes.FETCH_EXPERIMENT_RUNS_FAIL,
    errorMessage,
  });

  message.error(errorMessage, 5);

  // check if error is 404
  if (error.response?.status === 404) {
    // redirect to error page
    routerProps.history.replace('/erro-404');
  }
};

/**
 * Fetch experiment runs request action
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @param routerProps
 * @returns {Function}
 */
const fetchExperimentRunsRequest =
  (projectId, experimentId, routerProps) => (dispatch) => {
    // dispatching request action
    dispatch({
      type: actionTypes.FETCH_EXPERIMENT_RUNS_REQUEST,
    });

    // fetching experiment
    experimentRunsApi
      .fetchExperimentRuns(projectId, experimentId)
      .then((response) => {
        dispatch(fetchExperimentRunsSuccess(response));
      })
      .catch((error) => {
        dispatch(fetchExperimentRunsFail(error, routerProps));
      });
  };

// // // // // // // // // //

// ** CREATE EXPERIMENT RUN
/**
 * Create experiment run success action
 *
 * @param {string} projectId Project UUID
 * @param {object} response Response
 * @returns {object} { type }
 */
const createExperimentRunSuccess = (projectId, response) => (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_EXPERIMENT_RUN_SUCCESS,
    runId: response.data.uuid,
  });

  message.success('Treinamento iniciado!');
};

/**
 * Create experiment run fail action
 *
 * @param {object} error
 * @returns {object} { type }
 */
const createExperimentRunFail = (error) => (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_EXPERIMENT_RUN_FAIL,
  });

  // dispatching experiment training data loaded
  dispatch(experimentTrainingDataLoaded());

  const errorMessage = error.message;
  message.error(errorMessage);
};

/**
 * Create experiment run request
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment id
 * @param {object} history Router history
 * @returns {Function} Disapatch
 */
const createExperimentRunRequest = (projectId, experimentId) => (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_EXPERIMENT_RUN_REQUEST,
  });

  // dispatching experiment training loading data action
  dispatch(experimentTrainingLoadingData());

  experimentRunsApi
    .createExperimentRun(projectId, experimentId)
    .then((response) =>
      dispatch(createExperimentRunSuccess(projectId, response))
    )
    .catch((error) => dispatch(createExperimentRunFail(error)));
};

// // // // // // // // // //

// ** DELETE EXPERIMENT RUN
/**
 * Delete experiment run success action
 *
 * @param response
 * @returns {object} { type }
 */
const deleteExperimentRunSuccess = (response) => (dispatch) => {
  dispatch(implantedExperimentsLoadingData());

  dispatch({
    type: actionTypes.DELETE_EXPERIMENT_RUN_SUCCESS,
    runs: [],
  });

  message.loading('Interrompendo execução...', 5);
};

/**
 * Delete experiment run fail action
 *
 * @param {object} error
 * @returns {object} { type }
 */
const deleteExperimentRunFail = (error) => (dispatch) => {
  dispatch(experimentDeleteTrainingDataLoaded());

  dispatch({
    type: actionTypes.DELETE_EXPERIMENT_RUN_FAIL,
  });

  const errorMessage = error.message;
  message.error(errorMessage);
};

/**
 * Delete experiment run request
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId ExperimentUUID
 * @returns {Function}
 */
const deleteExperimentRunRequest = (projectId, experimentId) => (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_EXPERIMENT_RUN_REQUEST,
  });

  dispatch(experimentDeleteTrainingLoadingData());

  experimentRunsApi
    .deleteExperimentRun(projectId, experimentId)
    .then((response) => dispatch(deleteExperimentRunSuccess(response)))
    .catch((error) => dispatch(deleteExperimentRunFail(error)));
};

// // // // // // // // // //
// ** RETRY EXPERIMENT RUN

// // // // // // // // // //
// ** GET EXPERIMENT RUN STATUS
/**
 * fetch train experiment status success action
 *
 * @param {object} response Response object
 * @param {string} projectId Project id
 * @param {string} experimentId The experiment id
 * @returns {object} { type }
 */
const fetchExperimentRunStatusSuccess =
  (response, projectId, experimentId) => (dispatch, getState) => {
    const { uiReducer } = getState();
    const state = getState();

    const oldExperiments = getExperiments(state, projectId);
    const projects = getProjects(state);

    const { changeExperimentSucceededStatus } = utils;

    const operators = response.data.operators;

    let isRunning = false;
    let interruptExperiment = uiReducer.experimentTraining.deleteLoading;

    if (operators.length > 0) {
      const succeededRun = operators.every((operator) => {
        return operator.status === 'Succeeded';
      });

      const stoppedRun = operators.some((operator) => {
        return operator.status === 'Failed' || operator.status === 'Terminated';
      });

      const isAllPending = operators.every((operator) => {
        return operator.status === 'Pending';
      });

      if (isAllPending) {
        dispatch(experimentTrainingLoadingData());
        dispatch(resultsButtonBarLoadingData());
      } else {
        dispatch(experimentTrainingDataLoaded());
        dispatch(resultsButtonBarDataLoaded());
      }

      if (!stoppedRun) {
        operators.forEach((operator) => {
          if (operator.status === 'Running' || operator.status === 'Pending')
            isRunning = true;
        });
      }

      // experiment run finished successfully
      if (succeededRun) {
        isRunning = false;

        const experiments = changeExperimentSucceededStatus(
          oldExperiments,
          experimentId,
          true
        );

        const newProjects = projects.map((projectItem) =>
          projectItem.uuid === projectId
            ? { ...projectItem, experiments: experiments }
            : projectItem
        );

        dispatch(showSuccess('Treinamento concluído'));

        dispatch({
          type: actionTypes.EXPERIMENT_RUN_SUCCEEDED,
          payload: { projects: newProjects },
        });
      }

      // experiment run has stopped
      if (!isRunning) {
        dispatch(experimentTrainingDataLoaded());

        // check if was manual interrupted
        if (interruptExperiment) {
          dispatch(experimentDeleteTrainingDataLoaded());
          dispatch(showSuccess('Treinamento interrompido!'));
          interruptExperiment = false;
        }
      } else {
        dispatch(experimentTrainingLoadingData());
      }
    }

    utils.retrieveStatusMessageFromOperators(operators);
    dispatch({
      type: actionTypes.GET_EXPERIMENT_RUN_STATUS_SUCCESS,
      operatorsLatestTraining: operators,
      experimentIsRunning: isRunning,
      interruptIsRunning: interruptExperiment,
    });
  };

/**
 * fetch train experiment status fail action
 *
 * @param {object} error Error object
 * @param {string} projectId Project Id
 * @param {string} experimentId Experiment Id
 * @returns {Function} Dispatch
 */
const fetchExperimentRunStatusFail =
  (error, projectId, experimentId) => (dispatch, getState) => {
    const state = getState();
    const projects = getProjects(state);
    const oldExperiments = getExperiments(state, projectId);

    const { changeExperimentSucceededStatus } = utils;

    let experiments;

    const errorMessage = error.message;

    // experiment training isn't running
    if (errorMessage !== 'Network Error') {
      experiments = changeExperimentSucceededStatus(
        oldExperiments,
        experimentId,
        true
      );
    }

    const newProjects = projects.map((projectItem) =>
      projectItem.uuid === projectId
        ? { ...projectItem, experiments: experiments || oldExperiments }
        : projectItem
    );

    dispatch(showError(errorMessage));

    dispatch(experimentTrainingDataLoaded());
    dispatch({
      type: actionTypes.EXPERIMENT_RUN_NOT_SUCCEEDED,
      payload: { projects: newProjects },
    });
  };

/**
 * fetch experiment run status request action
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @returns {Function} Dispatch
 */
export const fetchExperimentRunStatusRequest =
  (projectId, experimentId) => (dispatch) => {
    // dispatching request action
    dispatch({
      type: actionTypes.GET_EXPERIMENT_RUN_STATUS_REQUEST,
    });

    // get experiment run status
    // the status of the experiment is defined by the status of its operators
    operatorsApi
      .listOperators(projectId, experimentId)
      .then((response) =>
        dispatch(
          fetchExperimentRunStatusSuccess(response, projectId, experimentId)
        )
      )
      .catch((error) =>
        dispatch(fetchExperimentRunStatusFail(error, projectId, experimentId))
      );
  };

// EXPORT DEFAUL
export default {
  fetchExperimentRunsRequest,
  createExperimentRunRequest,
  deleteExperimentRunRequest,
  fetchExperimentRunStatusRequest,
};

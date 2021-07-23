// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import experimentRunsApi from 'services/ExperimentRunsApi';
import operatorsApi from 'services/OperatorsApi';

import { getExperiments } from 'store/projects/experiments/experiments.selectors';
import { showError, showSuccess, showInfo } from 'store/message';
import { getProjects } from 'store/projects/projects.selectors';

// UI ACTIONS
import {
  experimentDeleteTrainingDataLoaded,
  experimentDeleteTrainingLoadingData,
  experimentTrainingDataLoaded,
  experimentTrainingLoadingData,
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
 * @param {object} error Error from API
 * @param {object} routerProps Props from React Router
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
 * @param {object} routerProps Props from React Router
 * @returns {Promise} Request
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
const createExperimentRunSuccess =
  (projectId, response) => (dispatch, getState) => {
    const { operatorsReducer } = getState();

    let operators = [...operatorsReducer];

    operators = operators.map((operator) => ({
      ...operator,
      status: operator.uuid === 'dataset' ? 'Succeeded' : 'Pending',
    }));

    dispatch({
      type: actionTypes.CREATE_EXPERIMENT_RUN_SUCCESS,
      payload: {
        runId: response.data.uuid,
        operators: operators,
      },
    });

    message.success('Treinamento iniciado!');
  };

/**
 * Create experiment run fail action
 *
 * @param {object} error Error from API
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
 * @returns {Function} Dispatch function
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
 * @returns {object} { type }
 */
const deleteExperimentRunSuccess = () => (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_EXPERIMENT_RUN_SUCCESS,
    runs: [],
  });

  message.loading('Interrompendo execução...', 5);
};

/**
 * Delete experiment run fail action
 *
 * @param {object} error Error from API
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
 * @returns {Function} Dispatch function
 */
const deleteExperimentRunRequest = (projectId, experimentId) => (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_EXPERIMENT_RUN_REQUEST,
  });

  dispatch(experimentDeleteTrainingLoadingData());

  experimentRunsApi
    .deleteExperimentRun(projectId, experimentId)
    .then(() => dispatch(deleteExperimentRunSuccess()))
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
    const operators = response.data.operators;
    const hasOperators = !!operators?.length;
    if (!hasOperators) return; // Não faz sentido continuar se não tem operadores

    const state = getState();
    const projects = getProjects(state);
    const oldExperiments = getExperiments(state, projectId);

    const { operatorsReducer: oldOperators } = state;

    const isInterruptingExperiment =
      state.uiReducer.experimentTraining.deleteLoading;

    let shouldContinueInterrupting = true;

    const wereAllOperatorsSuccessful = utils.checkExperimentSuccess({
      operators,
    });

    const areSomeOperatorsRunning = operators.some((operator) => {
      return operator.status === 'Running' || operator.status === 'Pending';
    });

    const areSomeOldOperatorsRunning = oldOperators.some((oldOperator) => {
      return (
        oldOperator.status === 'Running' ||
        oldOperator.status === 'Pending' ||
        oldOperator.experimentIsRunning
      );
    });

    if (wereAllOperatorsSuccessful && areSomeOldOperatorsRunning) {
      const experiments = utils.changeExperimentSucceededStatus(
        oldExperiments,
        experimentId,
        true
      );

      const newProjects = utils.changeProjectExperiments(
        projects,
        projectId,
        experiments
      );

      dispatch({
        type: actionTypes.EXPERIMENT_RUN_SUCCEEDED,
        payload: { projects: newProjects },
      });

      dispatch(showSuccess('Treinamento concluído'));
    }

    if (areSomeOperatorsRunning) {
      dispatch(experimentTrainingLoadingData());
    } else {
      dispatch(experimentTrainingDataLoaded());

      if (isInterruptingExperiment) {
        dispatch(experimentDeleteTrainingDataLoaded());
        dispatch(showSuccess('Treinamento interrompido!'));
        shouldContinueInterrupting = false;
      } else if (areSomeOldOperatorsRunning) {
        dispatch(showInfo('O fluxo terminou de executar'));
      }
    }

    // Update the status and loadings of all operators
    dispatch({
      type: actionTypes.GET_EXPERIMENT_RUN_STATUS_SUCCESS,
      operatorsLatestTraining: operators,
      experimentIsRunning: areSomeOperatorsRunning,
      interruptIsRunning:
        isInterruptingExperiment && shouldContinueInterrupting,
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

export default {
  fetchExperimentRunsRequest,
  createExperimentRunRequest,
  deleteExperimentRunRequest,
  fetchExperimentRunStatusRequest,
};

// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import experimentRunsApi from '../../../services/ExperimentRunsApi';
import operatorsApi from '../../../services/OperatorsApi';

// UI ACTIONS
import {
  experimentDeleteTrainingDataLoaded,
  experimentDeleteTrainingLoadingData,
  experimentTrainingDataLoaded,
  experimentTrainingLoadingData,
  implantedExperimentsLoadingData,
  experimentNameLoadingData,
  experimentNameDataLoaded
} from 'store/ui/actions';

// ACTIONS
// ** FETCH EXPERIMENT RUNS
/**
 * Fetch experiment runs success action
 *
 * @param {object} response Response body
 * @returns {object} { type, experiment }
 */
const fetchExperimentRunsSuccess = (response) => (
  dispatch
) => {
  dispatch({
    type: actionTypes.FETCH_EXPERIMENT_RUNS_SUCCESS,
    runs: response.data
  });
};

/**
 * Fetch experiment runs fail action
 *
 * @param {object} error
 * @param routerProps
 * @returns {object} { type, errorMessage }
 */
const fetchExperimentRunsFail = (error, routerProps) => (
  dispatch
) => {
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
const fetchExperimentRunsRequest = (
  projectId,
  experimentId,
  routerProps
) => (dispatch) => {
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
    })
  };

// // // // // // // // // //

// ** CREATE EXPERIMENT RUN
/**
 * Create experiment run success action
 *
 * @param {string} projectId Project UUID
 * @param {object} routerProps Router
 * @param {object} response Response
 * @returns {object} { type }
 */
const createExperimentRunSuccess = (projectId, routerProps, response) => (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_EXPERIMENT_RUN_SUCCESS,
    runId: response.data.uuid
  });

  routerProps.history.push(`/projetos/${projectId}/experimentos`);
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
    type: actionTypes.CREATE_EXPERIMENT_RUN_FAIL
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
 * @param experimentId
 * @param routerProps
 * @returns {Function}
 */
const createExperimentRunRequest = (projectId, experimentId, routerProps) => (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_EXPERIMENT_RUN_REQUEST,
  });

  // dispatching experiment training loading data action
  dispatch(experimentTrainingLoadingData())

  experimentRunsApi
    .createExperimentRun(projectId, experimentId)
    .then((response) => dispatch(createExperimentRunSuccess(projectId, routerProps, response)))
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
  dispatch(implantedExperimentsLoadingData())
  
  dispatch({
    type: actionTypes.DELETE_EXPERIMENT_RUN_SUCCESS,
    runs: []
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
    type: actionTypes.DELETE_EXPERIMENT_RUN_FAIL
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
  })

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
 * @param {string} experimentId The experiment id
 * @returns {object} { type }
 */
const fetchExperimentRunStatusSuccess = (response, experimentId) => (dispatch, getState) => {
  // getting operators from response
  const operators = response.data;

  const isSucceeded = operators.every((operator) => {
    return operator.status === 'Succeeded';
  });

  // TODO: se todos os operadores estiverem com status `pending` por muito tempo, pode ser devido a algum
  // erro no cluster e caso fique assim pra sempre, não dará pra utilizar o experimento.
  // Uma solução viável seria depois de algum tempo com o status `pending`, forçar a finalização da tarefa.  
  const isAllPending = operators.every((operator) => {
    return operator.status === 'Pending';
  });

  if (isAllPending) {
    // block "Interromper" button since there's any kfp pod running yet
    dispatch(experimentNameLoadingData());
  } else {
    dispatch(experimentNameDataLoaded());
  }

  const operatorHasStopped = (operator) => {
    return operator.status === '' ||
           operator.status === 'Failed' ||
           operator.status === 'Terminated';
  };

  // checking operators status to verify if training is running, pending or succeeded
  const isRunning = operators.every((operator) => {
      return (operator.status === 'Running' && !operatorHasStopped(operator));
  });

  // experiment run finished successfully
  if (isSucceeded) {
    const currentState = getState();
    const experimentsState = currentState.experimentsReducer;

    const experiments = experimentsState.map((experiment) => {
      return experiment.uuid !== experimentId
        ? experiment
        : { ...experiment, succeded: true };
    });

    dispatch({
      type: actionTypes.EXPERIMENT_RUN_SUCCEEDED,
      experiments
    });
  }

  // get deleteLoading state
  const { uiReducer } = getState();
  let interruptExperiment = uiReducer.experimentTraining.deleteLoading;

  // experiment run has stopped
  if (!isRunning) {
    dispatch(experimentTrainingDataLoaded());

    // check if was manual interrupted
    if (interruptExperiment) {
      dispatch(experimentDeleteTrainingDataLoaded());
      message.success('Treinamento interrompido!');
      interruptExperiment = false;
    }
  } else {
    dispatch(experimentTrainingLoadingData());
  }

  dispatch({
    type: actionTypes.GET_EXPERIMENT_RUN_STATUS_SUCCESS,
    operatorsLatestTraining: operators,
    experimentIsRunning: isRunning,
    interruptIsRunning: interruptExperiment ? true : false,
  });
};

/**
 * fetch train experiment status fail action
 *
 * @param {object} error
 * @param experimentId
 * @returns {object} { type, errorMessage }
 */
const fetchExperimentRunStatusFail = (error, experimentId) => (dispatch, getState) => {
  const errorMessage = error.message;

  // experiment training isn't running
  if (errorMessage !== 'Network Error') {
    const currentState = getState();
    const experimentsState = currentState.experimentsReducer;

    const experiments = experimentsState.map((experiment) => {
      return experiment.uuid !== experimentId
        ? experiment
        : { ...experiment, succeded: true };
    });

    dispatch(experimentTrainingDataLoaded());
    dispatch({
      type: actionTypes.EXPERIMENT_RUN_NOT_SUCCEEDED,
      experiments
    });
  }
};

/**
 * fetch experiment run status request action
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @returns {Function}
 */
export const fetchExperimentRunStatusRequest = (projectId, experimentId) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.GET_EXPERIMENT_RUN_STATUS_REQUEST,
  });

  // get experiment run status
  // the experiment status is defined by the operators who belong to it
  operatorsApi
    .listOperators(projectId, experimentId)
    .then((response) => dispatch(fetchExperimentRunStatusSuccess(response, experimentId)))
    .catch((error) => dispatch(fetchExperimentRunStatusFail(error, experimentId)));
};

// EXPORT DEFAUL
export default {
  fetchExperimentRunsRequest,
  createExperimentRunRequest,
  deleteExperimentRunRequest,
  fetchExperimentRunStatusRequest,
}
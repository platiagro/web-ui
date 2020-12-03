// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import experimentRunsApi from '../../../services/ExperimentRunsApi';

// UI ACTIONS
import {
  experimentDeleteTrainingDataLoaded,
  experimentDeleteTrainingLoadingData,
  experimentTrainingDataLoaded,
  experimentTrainingLoadingData,
  implantedExperimentsLoadingData
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
 * @param routerProps
 * @param response
 * @returns {object} { type }
 */
const createExperimentRunSuccess = (projectId, routerProps, response) => (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_EXPERIMENT_RUN_SUCCESS,
    runId: response.runId
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
const deleteExperimentRunSuccess = (response) => (dispatch, getState) => {
  dispatch(implantedExperimentsLoadingData())

  const currentState = getState();
  const experimentRuns = currentState.experimentRunsReducer;

  const runs = experimentRuns.filter((run) => {
    return run.runId !== response.data.runId
  })
  
  
  dispatch({
    type: actionTypes.DELETE_EXPERIMENT_RUN_SUCCESS,
    runs
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
 * get train experiment status success action
 *
 * @param {object} response
 * @param experimentId
 * @returns {object} { type }
 */
const getExperimentRunStatusSuccess = (response, experimentId) => (dispatch, getState) => {
  // getting operators from response
  const { operators } = response.data;

  // experiment run  is running?
  let isRunning = false;

  // experiment run is succeeded
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

  // experiment run is succeeded
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
  let deleteLoading = uiReducer.experimentTraining.deleteLoading;

  // experiment run not is running
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
    type: actionTypes.GET_EXPERIMENT_RUN_STATUS_SUCCESS,
    operatorsLatestTraining: operators,
    experimentIsRunning: isRunning,
    interruptIsRunning: deleteLoading,
  });
};

/**
 * get train experiment status fail action
 *
 * @param {object} error
 * @param experimentId
 * @returns {object} { type, errorMessage }
 */
const getExperimentRunStatusFail = (error, experimentId) => (dispatch, getState) => {
  // getting error message
  const errorMessage = error.message;

  // experiment training not is running
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
 * get experiment run status request action
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @returns {Function}
 */
export const getExperimentRunStatusRequest = (projectId, experimentId) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.GET_EXPERIMENT_RUN_STATUS_REQUEST,
  });

  // experiment run status
  experimentRunsApi
    .fetchExperimentRunStatus(projectId, experimentId, experimentId)
    .then((response) => dispatch(getExperimentRunStatusSuccess(response, experimentId)))
    .catch((error) => dispatch(getExperimentRunStatusFail(error, experimentId)));
};

// EXPORT DEFAUL
export default {
  fetchExperimentRunsRequest,
  createExperimentRunRequest,
  deleteExperimentRunRequest,
  getExperimentRunStatusRequest,
}
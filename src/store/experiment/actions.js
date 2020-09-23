// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import experimentsApi from '../../services/ExperimentsApi';
import implantedExperimentsApi from '../../services/implantedExperimentsApi';

// UI ACTIONS
import {
  hideNewExperimentModal,
  experimentsTabsDataLoaded,
  experimentsTabsLoadingData,
  experimentNameDataLoaded,
  experimentNameLoadingData,
  experimentOperatorsDataLoaded,
  experimentOperatorsLoadingData,
} from '../ui/actions';

// OPERATORS ACTIONS
import { fetchOperatorsRequest } from '../operators/actions';

const exist = 'Já existe um experimento com este nome!';

// ACTIONS
// ** FETCH EXPERIMENT
/**
 * fetch experiment success action
 *
 * @param {object} response
 * @param {object} projectId
 * @param {object} experimentId
 * @returns {object} { type, experiment }
 */
const fetchExperimentSuccess = (response, projectId, experimentId) => (
  dispatch
) => {
  // getting experiment from response
  const experiment = response.data;

  // dispatching experiment name data loaded action
  dispatch(experimentNameDataLoaded());

  // dispatching fetch experiment deploy status
  dispatch(fetchExperimentDeployStatusRequest(experimentId));

  // fetching operators
  dispatch(fetchOperatorsRequest(projectId, experimentId));

  dispatch({
    type: actionTypes.FETCH_EXPERIMENT_SUCCESS,
    experiment,
  });
};

/**
 * fetch experiment fail action
 *
 * @param {object} error
 * @param routerProps
 * @returns {object} { type, errorMessage }
 */
const fetchExperimentFail = (error, routerProps) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiment name data loaded action
  dispatch(experimentNameDataLoaded());

  // dispatching fetch experiment fail action response
  dispatch({
    type: actionTypes.FETCH_EXPERIMENT_FAIL,
    errorMessage,
  });

  // check if error is 404
  if (error.response.status === 404) {
    // redirect to error page
    routerProps.history.replace('/erro-404');
  }
};

/**
 * fetch experiment request action
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param routerProps
 * @returns {Function}
 */
export const fetchExperimentRequest = (
  projectId,
  experimentId,
  routerProps
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_EXPERIMENT_REQUEST,
  });

  // dispatching experiment name loading data action
  dispatch(experimentNameLoadingData());

  // fetching experiment
  experimentsApi
    .detailExperiment(projectId, experimentId)
    .then((response) => {
      dispatch(fetchExperimentSuccess(response, projectId, experimentId));
    })
    .catch((error) => dispatch(fetchExperimentFail(error, routerProps)));
};

/**
 * fetch experiment request action
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @returns {Function}
 */
export const fetchExperimentActiveRequest = (projectId, experimentId) => (
  dispatch
) => {
  // constant
  const experiment = { isActive: true };
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_EXPERIMENT_REQUEST,
  });

  // dispatching experiment name loading data action
  dispatch(experimentNameLoadingData());

  // At first should updtate isActive of clicked experiment
  experimentsApi
    .updateExperiment(projectId, experimentId, experiment)
    .then(() => {
      // then when update is successful fetch experiments detail
      experimentsApi
        .detailExperiment(projectId, experimentId)
        .then((response) =>
          dispatch(fetchExperimentSuccess(response, projectId, experimentId))
        )
        .catch((error) => dispatch(fetchExperimentFail(error)));
    })
    .catch((error) => dispatch(fetchExperimentFail(error)));
};

// // // // // // // // // //

// ** CREATE EXPERIMENT
/**
 * create experiment success action
 *
 * @param {object} response
 * @param {string} projectId
 * @param {object} routerProps
 * @returns {object} { type, experiment }
 */
const createExperimentSuccess = (response, projectId, routerProps) => (
  dispatch
) => {
  // getting experiment from response
  const experiment = response.data;

  // dispatching hide new experiment modal action
  dispatch(hideNewExperimentModal());

  // dispatching experiments tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  // dispatching experiment name data loaded action
  dispatch(experimentNameDataLoaded());

  // fetching operators
  dispatch(fetchOperatorsRequest(projectId, experiment.uuid));

  // dispatching experiment success
  dispatch({
    type: actionTypes.CREATE_EXPERIMENT_SUCCESS,
    experiment,
  });

  // go to new experiment
  routerProps.history.push(`/projetos/${projectId}/${experiment.uuid}`);
};

/**
 * create experiment fail action
 *
 * @param {object} error
 * @param {string} duplicate
 * @returns {object} { type, errorMessage }
 */
const createExperimentFail = (error, duplicate) => (dispatch) => {
  // dispatching experiments tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  // dispatching experiment name data loaded action
  dispatch(experimentNameDataLoaded());

  // getting error message
  let errorMessage;
  if (error.response.status === 500) {
    errorMessage = error.message;
    message.error(errorMessage, 5);
  } else {
    errorMessage = error.response.data.message;
    if (errorMessage.includes('name already exist') && !duplicate) {
      errorMessage = exist;
      dispatch({
        type: actionTypes.CREATE_EXPERIMENT_FAIL,
        errorMessage,
      });
    } else if (errorMessage.includes('name already exist') && duplicate) {
      errorMessage = exist;
      dispatch({ type: actionTypes.DUPLICATE_EXPERIMENT_FAIL, errorMessage });
      message.error(errorMessage, 5);
    } else {
      message.error(errorMessage, 5);
    }
  }
};

/**
 * create experiment request action
 *
 * @param {string} projectId
 * @param {string} experimentName
 * @param {string} copyFrom
 * @param {string} duplicate
 * @param {object} routerProps
 * @returns {Function}
 */
export const createExperimentRequest = (
  projectId,
  experimentName,
  copyFrom,
  duplicate,
  routerProps
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.CREATE_EXPERIMENT_REQUEST,
  });

  // dispatching experiments tabs loading data action
  dispatch(experimentsTabsLoadingData());

  // dispatching experiment name loading data action
  dispatch(experimentNameLoadingData());

  // creating experiment
  experimentsApi
    .createExperiment(projectId, experimentName, copyFrom)
    .then((response) =>
      dispatch(createExperimentSuccess(response, projectId, routerProps))
    )
    .catch((error) => dispatch(createExperimentFail(error, duplicate)));
};

// // // // // // // // // //

// ** EDIT EXPERIMENT NAME
/**
 * edit experiment name success action
 *
 * @param {object} response
 * @returns {object} { type, experiment }
 */
const editExperimentNameSuccess = (response) => (dispatch) => {
  // getting experiment from response
  const experiment = response.data;

  // dispatching experiments tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  // dispatching experiment name data loaded action
  dispatch(experimentNameDataLoaded());

  // dispatching edit experiment name success
  dispatch({
    type: actionTypes.EDIT_EXPERIMENT_NAME_SUCCESS,
    experiment,
  });
};

/**
 * edit experiment name fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const editExperimentNameFail = (error) => (dispatch) => {
  // dispatching experiments tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  // dispatching experiment name data loaded action
  dispatch(experimentNameDataLoaded());

  // getting error message
  let errorMessage;
  if (error.response.status === 500) {
    errorMessage = error.message;
  } else {
    errorMessage = error.response.data.message;
    if (errorMessage.includes('name already exist')) {
      errorMessage = 'Já existe um experimento com este nome!';
    }
  }
  message.error(errorMessage, 5);
};

/**
 * edit experiment name request action
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} newName
 * @returns {Function}
 */
export const editExperimentNameRequest = (projectId, experimentId, newName) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.EDIT_EXPERIMENT_NAME_REQUEST,
  });

  // dispatching experiments tabs loading data action
  dispatch(experimentsTabsLoadingData());

  // dispatching experiment name loading data action
  dispatch(experimentNameLoadingData());

  // creating experiment object
  const experiment = { name: newName };

  // creating experiment
  experimentsApi
    .updateExperiment(projectId, experimentId, experiment)
    .then((response) => dispatch(editExperimentNameSuccess(response)))
    .catch((error) => dispatch(editExperimentNameFail(error)));
};

// // // // // // // // // //

// ** DELETE EXPERIMENT
/**
 * delete experiment success action
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {object} routerProps
 * @returns {object} { type }
 */
const deleteExperimentSuccess = (projectId, experimentId, routerProps) => (
  dispatch
) => {
  // dispatching experiments tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  // dispatching experiment name data loaded action
  dispatch(experimentNameDataLoaded());

  // dispatching experiment operators data loaded action
  dispatch(experimentOperatorsDataLoaded());

  // dispatching delete experiment success
  dispatch({
    type: actionTypes.DELETE_EXPERIMENT_SUCCESS,
    experimentId,
  });

  // go to project
  routerProps.history.push(`/projetos/${projectId}`);
};

/**
 * delete experiment fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const deleteExperimentFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiments tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  // dispatching experiment name data loaded action
  dispatch(experimentNameDataLoaded());

  // dispatching experiment operators data loaded action
  dispatch(experimentOperatorsDataLoaded());

  // dispatching delete experiment fail
  dispatch({
    type: actionTypes.DELETE_EXPERIMENT_FAIL,
    errorMessage,
  });
};

/**
 * delete experiment request action
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {object} routerProps
 * @returns {Function}
 */
export const deleteExperimentRequest = (
  projectId,
  experimentId,
  routerProps
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.DELETE_EXPERIMENT_REQUEST,
  });

  // dispatching experiments tabs loading data action
  dispatch(experimentsTabsLoadingData());

  // dispatching experiment name loading data action
  dispatch(experimentNameLoadingData());

  // dispatching experiment operators loading data action
  dispatch(experimentOperatorsLoadingData());

  // deleting experiment
  experimentsApi
    .deleteExperiment(projectId, experimentId)
    .then(() =>
      dispatch(deleteExperimentSuccess(projectId, experimentId, routerProps))
    )
    .catch((error) => dispatch(deleteExperimentFail(error)));
};

// // // // // // // // // //

/**
 * train experiment action
 *
 * @param {string} uuid
 * @returns {type, experiment}
 */
export const trainExperiment = (uuid) => ({
  type: actionTypes.TRAIN_EXPERIMENT,
  experiment: {},
});

/**
 * deploy experiment name action
 *
 * @param {string} uuid
 * @returns {type, experiment}
 */
export const deployExperiment = (uuid) => ({
  type: actionTypes.DEPLOY_EXPERIMENT,
  experiment: {},
});

// // // // // // // // // //

// ** FETCH EXPERIMENT DEPLOY STATUS
/**
 * fetch experiment deploy status success action
 *
 * @param {object} response
 * @returns {object} { type, status }
 */
const fetchExperimentDeployStatusSuccess = (response) => (dispatch) => {
  // getting deploy list from response
  const experiment = response.data;
  const { status } = experiment;

  dispatch({
    type: actionTypes.FETCH_EXPERIMENT_DEPLOY_STATUS_SUCCESS,
    status,
  });
};

/**
 * fetch experiment deploy status request action
 *
 * @param {string} experimentId
 * @returns {Function}
 */
export const fetchExperimentDeployStatusRequest = (experimentId) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_EXPERIMENT_DEPLOY_STATUS_REQUEST,
  });

  // fetching id experiment deploy status
  implantedExperimentsApi
    .getExperimentDeployStatus(experimentId)
    .then((response) => {
      dispatch(fetchExperimentDeployStatusSuccess(response));
    })
    .catch((err) => {});
};

// // // // // // // // // //

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
  experimentTargetDataLoaded,
  experimentTargetLoadingData,
  datasetOperatorDataLoaded,
} from '../ui/actions';

// OPERATORS ACTIONS
import {
  fetchOperatorsRequest,
  clearOperatorsFeatureParametersRequest,
} from '../operators/actions';

// ACTIONS
// ** FETCH EXPERIMENT
/**
 * fetch experiment success action
 * @param {Object} response
 * @param {Object} projectId
 * @param {Object} experimentId
 * @returns {Object} { type, experiment }
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
  dispatch(fetchOperatorsRequest(projectId, experimentId, experiment.dataset));

  dispatch({
    type: actionTypes.FETCH_EXPERIMENT_SUCCESS,
    experiment,
  });
};

/**
 * fetch experiment fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const fetchExperimentFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiment name data loaded action
  dispatch(experimentNameDataLoaded());

  // dispatching fetch experiment fail action response
  dispatch({
    type: actionTypes.FETCH_EXPERIMENT_FAIL,
    errorMessage,
  });
};

/**
 * fetch experiment request action
 * @param {string} projectId
 * @param {string} experimentId
 * @returns {Function}
 */
export const fetchExperimentRequest = (projectId, experimentId) => (
  dispatch
) => {
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
    .catch((error) => dispatch(fetchExperimentFail(error)));
};

/**
 * fetch experiment request action
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
 * @param {Object} response
 * @param {string} projectId
 * @param {Object} routerProps
 * @returns {Object} { type, experiment }
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
  dispatch(
    fetchOperatorsRequest(projectId, experiment.uuid, experiment.dataset)
  );

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
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const createExperimentFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiments tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  // dispatching experiment name data loaded action
  dispatch(experimentNameDataLoaded());

  // dispatching create experiment fail action
  dispatch({
    type: actionTypes.CREATE_EXPERIMENT_FAIL,
    errorMessage,
  });
};

/**
 * create experiment request action
 * @param {string} projectId
 * @param {string} experimentName
 * @param {Object} routerProps
 * @returns {Function}
 */
export const createExperimentRequest = (
  projectId,
  experimentName,
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
    .createExperiment(projectId, experimentName)
    .then((response) =>
      dispatch(createExperimentSuccess(response, projectId, routerProps))
    )
    .catch((error) => dispatch(createExperimentFail(error)));
};

// // // // // // // // // //

// ** EDIT EXPERIMENT NAME
/**
 * edit experiment name success action
 * @param {Object} response
 * @returns {Object} { type, experiment }
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
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const editExperimentNameFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiments tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  // dispatching experiment name data loaded action
  dispatch(experimentNameDataLoaded());

  // dispatching edit experiment name fail action
  dispatch({
    type: actionTypes.EDIT_EXPERIMENT_NAME_FAIL,
    errorMessage,
  });
};

/**
 * edit experiment name request action
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
 * @param {string} projectId
 * @param {string} experimentId
 * @param {Object} routerProps
 * @returns {Object} { type }
 */
const deleteExperimentSuccess = (projectId, experimentId, routerProps) => (
  dispatch
) => {
  // go to project
  routerProps.history.push(`/projetos/${projectId}`);

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
};

/**
 * delete experiment fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
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
 * @param {string} projectId
 * @param {string} experimentId
 * @param {Object} routerProps
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

// ** SET DATASET
/**
 * set dataset success action
 * @param {Object} response
 * @param {string} projectId
 * @param {string} experimentId
 * @returns {Object} { type, experiment }
 */
const setDatasetSuccess = (response, projectId, experimentId) => (dispatch) => {
  // getting experiment from response
  const experiment = response.data;

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  // dispatching clear operator feature parameters
  dispatch(
    clearOperatorsFeatureParametersRequest(
      projectId,
      experimentId,
      experiment.dataset
    )
  );

  dispatch({
    type: actionTypes.SET_DATASET_SUCCESS,
    experiment,
  });
};

/**
 * set dataset fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const setDatasetFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  dispatch({
    type: actionTypes.SET_DATASET_FAIL,
    errorMessage,
  });
};

/**
 * set dataset request action
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} datasetName
 * @returns {Function}
 */
export const setDatasetRequest = (projectId, experimentId, datasetName) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.SET_DATASET_REQUEST,
  });

  // creating experiment object
  const experiment = { dataset: datasetName, target: null };

  // creating experiment
  experimentsApi
    .updateExperiment(projectId, experimentId, experiment)
    .then((response) =>
      dispatch(setDatasetSuccess(response, projectId, experimentId))
    )
    .catch((error) => dispatch(setDatasetFail(error)));
};

// // // // // // // // // //

// ** SET TARGET COLUMN
/**
 * set target column success action
 * @param {Object} response
 * @returns {Object} { type, experiment }
 */
const setTargetColumnSuccess = (response) => (dispatch) => {
  // getting experiment from response
  const experiment = response.data;

  // dispatching experiment target data loaded
  dispatch(experimentTargetDataLoaded());

  dispatch({
    type: actionTypes.SET_TARGET_COLUMN_SUCCESS,
    experiment,
  });
};

/**
 * set target column fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const setTargetColumnFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiment target data loaded
  dispatch(experimentTargetDataLoaded());

  dispatch({
    type: actionTypes.SET_TARGET_COLUMN_FAIL,
    errorMessage,
  });
};

/**
 * set target column request action
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} targetColumnName
 * @returns {Function}
 */
export const setTargetColumnRequest = (
  projectId,
  experimentId,
  targetColumnName
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.SET_TARGET_COLUMN_REQUEST,
  });

  // dispatching experiment target loading data
  dispatch(experimentTargetLoadingData());

  // creating experiment object
  const experiment = { target: targetColumnName };

  // creating experiment
  experimentsApi
    .updateExperiment(projectId, experimentId, experiment)
    .then((response) => dispatch(setTargetColumnSuccess(response)))
    .catch((error) => dispatch(setTargetColumnFail(error)));
};

// // // // // // // // // //

/**
 * train experiment action
 * @param {string} uuid
 * @returns {type, experiment}
 */
export const trainExperiment = (uuid) => ({
  type: actionTypes.TRAIN_EXPERIMENT,
  experiment: {}, // { ...experimentMock, running: true },
});

/**
 * deploy experiment name action
 * @param {string} uuid
 * @returns {type, experiment}
 */
export const deployExperiment = (uuid) => ({
  type: actionTypes.DEPLOY_EXPERIMENT,
  experiment: {}, // { ...experimentMock, deployed: true },
});

// // // // // // // // // //

// ** FETCH EXPERIMENT DEPLOY STATUS
/**
 * fetch experiment deploy status success action
 * @param {Object} response
 * @param {Object} experimentId
 * @returns {Object} { type, status }
 */
const fetchExperimentDeployStatusSuccess = (response, experimentId) => (
  dispatch
) => {
  // getting deploy list from response
  const deployList = response.data;

  // getting experiment deploy from list
  const experimentDeploy = deployList.find(
    (deploy) => deploy.experimentId === experimentId
  );

  // getting experiment status
  const status = experimentDeploy ? experimentDeploy.status : '';

  dispatch({
    type: actionTypes.FETCH_EXPERIMENT_DEPLOY_STATUS_SUCCESS,
    status,
  });
};

/**
 * fetch experiment deploy status fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const fetchExperimentDeployStatusFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching fetch experiment deploy status fail action response
  dispatch({
    type: actionTypes.FETCH_EXPERIMENT_DEPLOY_STATUS_FAIL,
    errorMessage,
  });
};

/**
 * fetch experiment deploy status request action
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

  // fetching all experiment deploy status
  implantedExperimentsApi
    .getDeployedExperiments()
    .then((response) => {
      dispatch(fetchExperimentDeployStatusSuccess(response, experimentId));
    })
    .catch((error) => dispatch(fetchExperimentDeployStatusFail(error)));
};

// // // // // // // // // //

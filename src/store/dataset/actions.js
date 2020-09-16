// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import datasetsApi from '../../services/DatasetsApi';

// OPERATOR ACTIONS
import { setOperatorParametersRequest } from '../operator/actions';
import { clearOperatorsFeatureParametersRequest } from '../operators/actions';

// UI ACTIONS
import {
  datasetOperatorDataLoaded,
  datasetOperatorLoadingData,
} from '../ui/actions';

// UTILS
import utils from '../../utils';

// ACTIONS
// ** FETCH DATASET COLUMNS
/**
 * fetch dataset columns success action
 *
 * @param {object} response
 * @returns {object} { type, columns }
 */
const fetchDatasetColumnsSuccess = (response) => (dispatch) => {
  // getting dataset columns from response
  const columns = response.data;

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  // dispatching fetch dataset columns success
  dispatch({
    type: actionTypes.FETCH_DATASET_COLUMNS_SUCCESS,
    columns,
  });
};

/**
 * fetch dataset columns fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const fetchDatasetColumnsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  // dispatching fetch dataset columns fail
  dispatch({
    type: actionTypes.FETCH_DATASET_COLUMNS_FAIL,
    errorMessage,
  });
};

/**
 * fetch dataset columns request action
 *
 * @param datasetName
 * @returns {Function}
 */
export const fetchDatasetColumnsRequest = (datasetName) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_DATASET_COLUMNS_REQUEST,
  });

  // dispatching dataset operator loading data action
  dispatch(datasetOperatorLoadingData());

  if (datasetName)
    // fetching dataset columns
    datasetsApi
      .listDatasetColumns(datasetName)
      .then((response) => dispatch(fetchDatasetColumnsSuccess(response)))
      .catch((error) => dispatch(fetchDatasetColumnsFail(error)));
  else dispatch(fetchDatasetColumnsSuccess({ data: [] }));
};

// // // // // // // // // //

// ** DATASET UPLOAD
/**
 * Cancel dataset upload action
 *
 * @returns {Function} Dispatch function
 */
export const cancelDatasetUpload = () => (dispatch) => {
  const successMessage = 'Dados de entrada removidos';

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  // dispatching create dataset fail
  dispatch({
    type: actionTypes.CREATE_DATASET_CANCEL,
    successMessage,
  });
};

/**
 * Dataset upload success action
 *
 * @param {object} dataset Response dataset object
 * @param {string} projectId Current Project id
 * @param {string} experimentId Current Experiment id
 * @returns {Function} Dispatch function
 */
export const datasetUploadSuccess = (dataset, projectId, experimentId) => (
  dispatch,
  getState
) => {
  // get select operator from store
  const { operatorReducer: operator } = getState();
  const featuretypes = utils.getFeaturetypes(dataset);

  // update dataset parameter
  dispatch(
    setOperatorParametersRequest(
      projectId,
      experimentId,
      operator,
      'dataset',
      dataset.name
    )
  );

  // dispatching clear operator feature parameters
  dispatch(clearOperatorsFeatureParametersRequest(projectId, experimentId));

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  dispatch({
    type: actionTypes.CREATE_DATASET_SUCCESS,
    payload: {
      filename: dataset.filename || '',
      name: dataset.name || '',
      columns: dataset.columns || [],
      featuretypes: featuretypes || '',
    },
  });
};

/**
 * Dataset upload fail action
 *
 * @returns {Function} Dispatch function
 */
export const datasetUploadFail = () => (dispatch) => {
  const errorMessage = 'Ocorreu um erro no processamento do arquivo';

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  // dispatching create dataset fail
  dispatch({
    type: actionTypes.CREATE_DATASET_FAIL,
    errorMessage,
  });
};

/**
 * Start dataset upload action
 *
 * @returns {Function} Dispatch function
 */
export const startDatasetUpload = () => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.CREATE_DATASET_REQUEST,
  });

  // dispatching dataset operator loading data action
  dispatch(datasetOperatorLoadingData());
};

// // // // // // // // // //

// ** UPDATE DATASET COLUMN
/**
 * update dataset column success action
 *
 * @param {object} response
 * @returns {object} { type, column }
 */
const updateDatasetColumnSuccess = (response) => (dispatch) => {
  // getting column from response
  const column = response.data;

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  // dispatching update dataset column success
  dispatch({
    type: actionTypes.UPDATE_DATASET_COLUMN_SUCCESS,
    column,
  });
};

/**
 * update dataset column fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const updateDatasetColumnFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  // dispatching update dataset column fail
  dispatch({
    type: actionTypes.UPDATE_DATASET_COLUMN_FAIL,
    errorMessage,
  });
};

/**
 * update dataset column request action
 *
 * @param {string} datasetName
 * @param {string} columnName
 * @param {string} columnNewType
 * @returns {Function}
 */
export const updateDatasetColumnRequest = (columnName, columnNewType) => (
  dispatch,
  getState
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.UPDATE_DATASET_COLUMN_REQUEST,
  });

  // dispatching dataset operator loading data action
  dispatch(datasetOperatorLoadingData());

  // getting operators and tasks from store
  const { operatorsReducer, tasksReducer } = getState();
  const tasks = tasksReducer.tasks;

  // get dataset name
  const datasetName = utils.getDatasetName(tasks, operatorsReducer);

  // updating dataset columns
  datasetsApi
    .updateDatasetColumn(datasetName, columnName, columnNewType)
    .then((response) => dispatch(updateDatasetColumnSuccess(response)))
    .catch((error) => dispatch(updateDatasetColumnFail(error)));
};

// // // // // // // // // //

// ** GET DATASET
/**
 * get dataset success action
 *
 * @param {object} response
 * @returns {object} { type, columns }
 */
const getDatasetSuccess = (response) => (dispatch) => {
  // getting dataset from response
  const dataset = response.data;
  const featuretypes = utils.getFeaturetypes(dataset);

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  // dispatching get dataset success
  dispatch({
    type: actionTypes.GET_DATASET_SUCCESS,
    payload: {
      filename: dataset.filename || '',
      name: dataset.name || '',
      columns: dataset.columns || [],
      featuretypes: featuretypes || '',
    },
  });
};

/**
 * get dataset fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const getDatasetFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  // dispatching get dataset fail
  dispatch({
    type: actionTypes.GET_DATASET_FAIL,
    errorMessage,
  });
};

/**
 * get dataset request action
 *
 * @param datasetName
 * @returns {Function}
 */
export const getDatasetRequest = (datasetName) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.GET_DATASET_REQUEST,
  });

  // dispatching dataset operator loading data action
  dispatch(datasetOperatorLoadingData());

  if (datasetName) {
    // fetching dataset
    datasetsApi
      .getDataset(datasetName, 1, 10)
      .then((response) => dispatch(getDatasetSuccess(response)))
      .catch((error) => dispatch(getDatasetFail(error)));

    // dispatching get dataset featuretypes
  } else {
    dispatch(
      getDatasetSuccess({
        data: {
          filename: '',
          name: '',
          columns: [],
        },
      })
    );
  }
};

// // // // // // // // // //

// ** DELETE DATASET

/**
 * delete dataset success action
 *
 * @returns {Function} Dispatch function
 */
export const deleteDatasetSuccess = () => (dispatch) => {
  const dataset = { filename: '', name: '', columns: [] };

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  dispatch({
    type: actionTypes.DELETE_DATASET_SUCCESS,
    dataset,
  });
};

/**
 * Dataset upload fail action
 *
 * @returns {Function} Dispatch function
 */
export const deleteDatasetFail = () => (dispatch) => {
  const errorMessage = 'Ocorreu um erro ao excluir arquivo';

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  // dispatching create dataset fail
  dispatch({
    type: actionTypes.DELETE_DATASET_FAIL,
    errorMessage,
  });
};

/**
 * Delete dataset request action
 *
 * @param projectId
 * @param experimentId
 * @param projectId
 * @param experimentId
 * @returns {Function} Dispatch function
 */
export const deleteDatasetRequest = (projectId, experimentId) => (
  dispatch,
  getState
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.DELETE_DATASET_REQUEST,
  });

  // get select operator from store
  const { operatorReducer: operator } = getState();

  // dispatching dataset operator loading data action
  dispatch(datasetOperatorLoadingData());

  try {
    // update dataset parameter
    dispatch(
      setOperatorParametersRequest(
        projectId,
        experimentId,
        operator,
        'dataset',
        ''
      )
    );

    dispatch(deleteDatasetSuccess());
  } catch (e) {
    dispatch(deleteDatasetFail());
  }
};

/**
 * Set google dataset status
 *
 * @param fileName
 * @param status
 */
const setGoogleDatasetStatus = (fileName, status) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_GOOGLE_DATASET_STATUS,
    fileName,
    status,
  });
};

/**
 * Create google dataset
 *
 * @param projectId
 * @param experimentId
 * @param gfile
 */
export const createGoogleDataset = (projectId, experimentId, gfile) => (
  dispatch
) => {
  dispatch(datasetOperatorLoadingData());
  dispatch(setGoogleDatasetStatus(gfile.name, 'uploading'));
  datasetsApi
    .createGoogleDataset(gfile)
    .then((response) => {
      const dataset = response.data;
      dispatch(datasetUploadSuccess(dataset, projectId, experimentId));
      dispatch(setGoogleDatasetStatus(gfile.name, 'done'));
    })
    .catch(() => {
      dispatch(datasetUploadFail());
      dispatch(setGoogleDatasetStatus(gfile.name, 'error'));
    });
};

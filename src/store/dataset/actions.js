// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import datasetsApi from '../../services/DatasetsApi';

// OPERATOR ACTIONS
import { setOperatorParametersRequest } from '../operator/actions';
import { clearOperatorsFeatureParametersRequest } from '../operators/actions';

// UI ACTIONS
import {
  fetchDatasetOperatorDataLoaded,
  fetchDatasetOperatorLoadingData,
  fetchLoadingOffDataViewModal,
  fetchLoadingOnDataViewModal,
} from '../ui/actions';

// UTILS
import utils from '../../utils';
import { CancelToken, isCancel } from 'axios';

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
  dispatch(fetchDatasetOperatorDataLoaded());

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
  dispatch(fetchDatasetOperatorDataLoaded());

  // dispatching fetch dataset columns fail
  dispatch({
    type: actionTypes.FETCH_DATASET_COLUMNS_FAIL,
    errorMessage,
  });

  message.error(errorMessage, 5);
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
  dispatch(fetchDatasetOperatorLoadingData());

  if (datasetName)
    // fetching dataset columns
    datasetsApi
      .listDatasetColumns(datasetName)
      .then((response) => dispatch(fetchDatasetColumnsSuccess(response)))
      .catch((error) => dispatch(fetchDatasetColumnsFail(error)));
  else dispatch(fetchDatasetColumnsSuccess({ data: [] }));
};

// // // // // // // // // //
/**
 * Cancel dataset upload action
 *
 * @returns {Function} Dispatch function
 */
export const fetchCancelDatasetUpload = () => (dispatch, getState) => {
  const successMessage = 'Dados de entrada removidos';

  // get dataset reducer from store
  const { datasetReducer } = getState();

  // invoke cancel upload
  datasetReducer.cancelToken.cancel();

  // dispatching dataset operator data loaded action
  dispatch(datasetOperatorDataLoaded());

  // dispatching create dataset cancel
  dispatch({
    type: actionTypes.CREATE_DATASET_CANCEL,
    payload: {
      filename: '',
      progress: 0,
      file: null,
      status: null,
      isUploading: false,
      cancelToken: null,
    },
  });

  // display success message
  message.success(successMessage, 5);
};

/**
 * Dataset upload success action
 *
 * @param {object} dataset Response dataset object
 * @param {string} projectId Current Project id
 * @param {string} experimentId Current Experiment id
 * @param {object} datasetOperator Dataset operator
 * @returns {Function} Dispatch function
 */
export const fetchDatasetUploadSuccess = (
  dataset,
  projectId,
  experimentId,
  datasetOperator
) => (dispatch) => {
  const featuretypes = utils.getFeaturetypes(dataset);

  // TODO: Descomentar para ativar running no operador, porém o clique no operador é bloqueado se estiver running
  /*   const { operatorsReducer } = getState();

  const operators = operatorsReducer.map((operatorItem) =>
    operatorItem.uuid === operator.uuid
      ? { ...operatorItem, status: 'Running' }
      : operatorItem
  );

  // dispatching fetch operators success action
  dispatch({
    type: operatorActionTypes.FETCH_OPERATORS_SUCCESS,
    operators,
  }); */

  // update dataset parameter
  dispatch(
    setOperatorParametersRequest(
      projectId,
      experimentId,
      datasetOperator,
      'dataset',
      dataset.name
    )
  );

  // dispatching clear operator feature parameters
  dispatch(clearOperatorsFeatureParametersRequest(projectId, experimentId));

  // dispatching dataset operator data loaded action
  dispatch(fetchDatasetOperatorDataLoaded());

  // dispatch action
  dispatch({
    type: actionTypes.CREATE_DATASET_SUCCESS,
    payload: {
      filename: dataset.filename || '',
      name: dataset.name || '',
      columns: dataset.columns || [],
      status: dataset && dataset.name ? 'done' : null,
      featuretypes: featuretypes || '',
      isUploading: false,
      cancelToken: null,
    },
  });

  message.success('Dados de entrada importados', 5);
};

/**
 * Dataset upload fail action
 *
 * @returns {Function} Dispatch function
 */
export const fetchDatasetUploadFail = () => (dispatch) => {
  const errorMessage = 'Ocorreu um erro no processamento do arquivo';

  // dispatching dataset operator data loaded action
  dispatch(fetchDatasetOperatorDataLoaded());

  // dispatching create dataset fail
  dispatch({
    type: actionTypes.CREATE_DATASET_FAIL,
    errorMessage,
  });

  message.error(errorMessage, 5);
};

/**
 * Dataset upload fail action
 *
 * @param {object} uploadProgress Upload progress
 * @returns {Function} Dispatch function
 */
export const fetchUpdateDatasetUpload = (uploadProgress) => (dispatch) => {
  // get uploaded and total progress
  const { loaded, total } = uploadProgress;

  // calculate percentage
  const progress = Math.floor((loaded / total) * 100);

  // dispatching create dataset fail
  dispatch({
    type: actionTypes.UPDATE_DATASET_UPLOAD,
    progress,
  });
};

/**
 * Start a file upload
 *
 * @param {object} file Dataset file
 *
 * @returns {Function} Dispatch function
 */
export const fetchStartFileDatasetUpload = (file) => (dispatch) => {
  // create cancel token
  const cancelToken = CancelToken.source();

  // dispatching request action
  dispatch({
    type: actionTypes.CREATE_DATASET_REQUEST,
    file: file,
    cancelToken: cancelToken,
  });

  // create new form data
  const fileFormData = new FormData();

  // append dataset file
  fileFormData.append('file', file);

  dispatch(fetchStartDatasetUpload(fileFormData, cancelToken));
};

/**
 * Start a Google upload
 *
 * @param {object} gfile Google file
 *
 * @returns {Function} Dispatch function
 */
export const fetchStartGoogleDatasetUpload = (gfile) => (dispatch) => {
  // create cancel token
  const cancelToken = CancelToken.source();

  // dispatching request action
  dispatch({
    type: actionTypes.CREATE_DATASET_REQUEST,
    file: gfile,
    cancelToken: cancelToken,
  });

  const file = { gfile };

  dispatch(fetchStartDatasetUpload(file, cancelToken));
};

/**
 * Start dataset upload action
 *
 * @param {object} file Dataset file
 * @param {object} cancelToken Cancel request token
 * @returns {Function} Dispatch function
 */
export const fetchStartDatasetUpload = (file, cancelToken) => async (
  dispatch,
  getState
) => {
  // get reducers from store
  const { projectReducer, experimentReducer, operatorReducer } = getState();

  // get project id
  const { uuid: projectId } = projectReducer;

  // get experiment id
  const { uuid: experimentId } = experimentReducer;

  // save dataset operator
  const datasetOperator = { ...operatorReducer };

  // dispatching dataset operator loading data action
  dispatch(fetchDatasetOperatorLoadingData());

  // TODO: Descomentar para ativar running no operador, porém o clique no operador é bloqueado se estiver running
  /* 
  const {
    operatorsReducer,
  } = getState();
  const operators = operatorsReducer.map((operatorItem) =>
    operatorItem.uuid === datasetOperator.uuid
      ? { ...operatorItem, status: 'Running' }
      : operatorItem
  );

  // dispatching fetch operators success action
  dispatch({
    type: operatorActionTypes.FETCH_OPERATORS_SUCCESS,
    operators,
  }); */

  // upload file block
  try {
    // call api
    const response = await datasetsApi.createDataset(
      file,
      cancelToken,
      (progress) => dispatch(fetchUpdateDatasetUpload(progress))
    );

    // get dataset from response
    const dataset = response.data;

    // dispatch success action
    dispatch(
      fetchDatasetUploadSuccess(dataset, projectId, experimentId, datasetOperator)
    );
    // on error
  } catch (error) {
    // error not is cancel action
    if (!isCancel(error)) {
      // dispatch fail action
      dispatch(fetchDatasetUploadFail());
    }
  }
};

// // // // // // // // // //

// ** UPDATE DATASET COLUMN
/**
 * update dataset column success action
 *
 * @param {object} response
 * @returns {object} { type, column }
 */
const fetchUpdateDatasetColumnSuccess = (response) => (dispatch) => {
  // getting column from response
  const column = response.data;

  // dispatching dataset operator data loaded action
  dispatch(fetchDatasetOperatorDataLoaded());

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
  dispatch(fetchDatasetOperatorDataLoaded());

  // dispatching update dataset column fail
  dispatch({
    type: actionTypes.UPDATE_DATASET_COLUMN_FAIL,
    errorMessage,
  });

  message.error(errorMessage, 5);
};

/**
 * update dataset column request action
 *
 * @param {string} datasetName
 * @param {string} columnName
 * @param {string} columnNewType
 * @returns {Function}
 */
export const fetchUpdateDatasetColumnRequest = (columnName, columnNewType) => (
  dispatch,
  getState
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.UPDATE_DATASET_COLUMN_REQUEST,
  });

  // dispatching dataset operator loading data action
  dispatch(fetchDatasetOperatorLoadingData());

  // getting operators and tasks from store
  const { operatorsReducer, tasksReducer } = getState();
  const tasks = tasksReducer.tasks;

  // get dataset name
  const datasetName = utils.getDatasetName(tasks, operatorsReducer);

  // updating dataset columns
  datasetsApi
    .updateDatasetColumn(datasetName, columnName, columnNewType)
    .then((response) => dispatch(fetchUpdateDatasetColumnSuccess(response)))
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
const fetchDatasetSuccess = (response) => (dispatch) => {
  // getting dataset from response
  const dataset = response.data;
  const featuretypes = utils.getFeaturetypes(dataset);

  // dispatching dataset operator data loaded action
  dispatch(fetchDatasetOperatorDataLoaded());

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
const fetchDatasetFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching dataset operator data loaded action
  dispatch(fetchDatasetOperatorDataLoaded());

  // dispatching get dataset fail
  dispatch({
    type: actionTypes.GET_DATASET_FAIL,
    errorMessage,
  });

  message.error(errorMessage, 5);
};

/**
 * get dataset request action
 *
 * @param datasetName
 * @returns {Function}
 */
export const fetchDatasetRequest = (datasetName) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.GET_DATASET_REQUEST,
  });

  // dispatching dataset operator loading data action
  dispatch(fetchDatasetOperatorLoadingData());

  if (datasetName) {
    // fetching dataset
    datasetsApi
      .getDataset(datasetName, 1, 10)
      .then((response) => dispatch(fetchDatasetSuccess(response)))
      .catch((error) => dispatch(fetchDatasetFail(error)));

    // dispatching get dataset featuretypes
  } else {
    dispatch(
      fetchDatasetSuccess({
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

// ** SELECT DATASET
/**
 * select dataset action
 *
 * @param {string} datasetName Dataset name
 * @param {string} projectId Project id
 * @param {string} experimentId Experiment id
 * @returns {Function} Action
 */
export const fetchSelectDataset = (datasetName, projectId, experimentId) => (
  dispatch,
  getState
) => {
  // dispatch action
  dispatch({
    type: actionTypes.SELECT_DATASET,
  });

  // get operator reducer from store
  const { operatorReducer } = getState();

  // save dataset operator
  const datasetOperator = { ...operatorReducer };

  // fetching dataset
  datasetsApi
    .getDataset(datasetName, 1, 10)
    .then((response) => {
      // get dataset from response
      const dataset = response.data;

      // dispatch action to save dataset
      dispatch(
        fetchDatasetUploadSuccess(dataset, projectId, experimentId, datasetOperator)
      );
    })
    .catch((error) => dispatch(fetchDatasetFail(error)));
};

// // // // // // // // // //

// ** DELETE DATASET

/**
 * delete dataset success action
 *
 * @returns {Function} Dispatch function
 */
export const fetchDeleteDatasetSuccess = () => (dispatch) => {
  // dispatching dataset operator data loaded action
  dispatch(fetchDatasetOperatorDataLoaded());

  // dispatch action
  dispatch({
    type: actionTypes.DELETE_DATASET_SUCCESS,
    payload: {
      columns: [],
      featuretypes: '',
      filename: '',
      name: '',
      progress: 0,
      file: null,
      status: null,
      isUploading: false,
    },
  });
};

/**
 * Dataset upload fail action
 *
 * @returns {Function} Dispatch function
 */
export const fetchDeleteDatasetFail = () => (dispatch) => {
  const errorMessage = 'Ocorreu um erro ao excluir arquivo';

  // dispatching dataset operator data loaded action
  dispatch(fetchDatasetOperatorDataLoaded());

  // dispatching create dataset fail
  dispatch({
    type: actionTypes.DELETE_DATASET_FAIL,
    errorMessage,
  });

  message.error(errorMessage, 5);
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
export const fetchDeleteDatasetRequest = (projectId, experimentId) => (
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
  dispatch(fetchDatasetOperatorLoadingData());

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

    // dispatching clear operator feature parameters
    dispatch(clearOperatorsFeatureParametersRequest(projectId, experimentId));

    dispatch(fetchDeleteDatasetSuccess());
  } catch (e) {
    dispatch(fetchDeleteDatasetFail());
  }
};

export const fetchUpdateAllDatasetColumnStart = () => (dispatch) => {
  // dispatching update dataset column success
  dispatch(fetchLoadingOnDataViewModal());
};

export const fetchUpdateAllDatasetColumnSuccess = (columns) => (dispatch) => {
  dispatch(fetchLoadingOffDataViewModal());

  // dispatching update dataset column success
  dispatch({
    type: actionTypes.UPDATE_ALL_DATASET_COLUMNS_SUCCESS,
    payload: columns,
  });
};

export const fetchUpdateAllDatasetColumnFail = (errorMessage) => (dispatch) => {
  dispatch(fetchLoadingOffDataViewModal());

  // dispatching update dataset column fail
  dispatch({
    type: actionTypes.UPDATE_ALL_DATASET_COLUMNS_FAIL,
    errorMessage,
  });

  message.error(errorMessage, 5);
};

/**
 * Function to fetch pagineted dataset and dispatch to reducer
 *
 * @param datasetName
 * @param page
 * @param pageSize
 */
export const fetchPaginatedDataset = (datasetName, page, pageSize) => {
  return (dispatch) => {
    dispatch(fetchDatasetOperatorLoadingData());
    return datasetsApi
      .getDataset(datasetName, page, pageSize)
      .then((response) => {
        dispatch(fetchDatasetOperatorDataLoaded());
        const dataset = response.data;
        dispatch({
          type: actionTypes.FETCH_PAGINATED_DATASET,
          currentPage: page,
          data: dataset.data,
          pageSize: pageSize,
          total: dataset.total,
        });
      })
      .catch((error) => {
        dispatch(fetchDatasetOperatorDataLoaded());
        const errorMessage = error.message;
        message.error(errorMessage, 5);
      });
  };
};

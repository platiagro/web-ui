import _ from 'lodash';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import DatasetsApi from 'services/DatasetsApi';
import operatorsApi from 'services/OperatorsApi';
import pipelinesApi from 'services/PipelinesApi';

// UI LIB
import { message } from 'antd';

// UI ACTIONS
import {
  showOperatorDrawer,
  hideOperatorDrawer,
  experimentOperatorsDataLoaded,
  experimentOperatorsLoadingData,
  operatorParameterLoadingData,
  operatorParameterDataLoaded,
  operatorResultsDataLoaded,
  operatorResultsLoadingData,
  operatorResultsDownloadDatasetLoaded,
  operatorResultsDownloadDatasetLoading,
  operatorMetricsLoadingData,
  operatorMetricsDataLoaded,
  dependenciesOperatorLoading,
  dependenciesOperatorLoaded,
} from 'store/ui/actions';

// DATASET ACTIONS
import { getDatasetRequest } from 'store/dataset/actions';

// OPERATORS ACTIONS
import {
  clearOperatorsFeatureParametersRequest,
  fetchOperatorsRequest,
  upadteOperatorDependencies,
} from 'store/operators/actions';

// UTILS
import utils from 'utils';

// ACTIONS
/**
 * Download operator result dataset
 */
export const downloadOperatorResultDataset = (
  experimentId,
  operatorId
) => async (dispatch) => {
  dispatch(operatorResultsDownloadDatasetLoading());
  dispatch({
    type: actionTypes.DOWNLOAD_OPERATOR_DATASET_RESULT_REQUEST,
  });

  let columns = [];
  let data = [];
  let page = 1;
  let operatorDatasetResponse;
  do {
    operatorDatasetResponse = await pipelinesApi
      .getOperatorDataset(experimentId, 'latest', operatorId, page, 100)
      .then((response) => {
        if (response) {
          return response.data;
        }
        return;
      })
      .catch((error) => {});
    if (operatorDatasetResponse) {
      columns = operatorDatasetResponse.columns;
      data = [...data, ...operatorDatasetResponse.data];
    }
    page++;
  } while (operatorDatasetResponse);

  dispatch(operatorResultsDownloadDatasetLoaded());
  dispatch({
    type: actionTypes.DOWNLOAD_OPERATOR_DATASET_RESULT_SUCCESS,
    resultDataset: [[...columns], ...data],
  });
};

// ** GET OPERATOR RESULTS
/**
 * get operator results success action
 *
 * @param {object} responseFigure
 * @param {object} responseTable
 * @param {string} operatorId
 * @returns {object} { type, results }
 */
const getOperatorResultsSuccess = (
  responseFigure,
  responseTable,
  operatorId,
  page,
  pageSize
) => (dispatch) => {
  // getting figure results
  const results = utils.transformResults(operatorId, responseFigure.data);
  if (responseTable) {
    // create columns in antd format
    let tableColumns = [];
    let index = 0;
    for (let column of responseTable.data.columns) {
      let tableColumn = {
        title: column,
        dataIndex: index,
      };
      tableColumns.push(tableColumn);
      index++;
    }

    results.push({
      type: 'table',
      uuid: `table-${operatorId}`,
      resultTable: {
        columns: tableColumns,
        rows: responseTable.data.data,
        total: responseTable.data.total,
        currentPage: page,
        pageSize: pageSize,
      },
    });
  }

  dispatch(operatorResultsDataLoaded());
  dispatch({
    type: actionTypes.GET_OPERATOR_RESULTS_SUCCESS,
    results,
  });
};

/**
 * get operator results fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const getOperatorResultsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching operator results data loaded action
  dispatch(operatorResultsDataLoaded());

  // dispatching get operator results fail
  dispatch({
    type: actionTypes.GET_OPERATOR_RESULTS_FAIL,
    errorMessage,
  });

  message.error(errorMessage);
};

/**
 *  get operator logs success action
 *
 * @param {object} response
 * @returns {Function}
 */
const getLogsSuccess = (response) => (dispatch) => {
  const logs = response.data;

  dispatch({
    type: actionTypes.GET_OPERATOR_LOGS_SUCCESS,
    logs: logs.traceback,
  });
};

const getLogsFail = (error) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_OPERATOR_LOGS_FAIL,
  });
  message.error(utils.getErrorMessage(error));
};

/**
 * Get operator logs
 *
 * @param {string} experimentId
 * @param {string} operatorId
 */
export const getOperatorLogs = (projectId, experimentId, operatorId) => async (
  dispatch
) => {
  pipelinesApi
    .getOperatorLog(projectId, experimentId, 'latest', operatorId)
    .then((res) => {
      dispatch(getLogsSuccess(res));
    })
    .catch((error) => {
      dispatch(getLogsFail(error));
    });
};

/**
 * Get operator results request
 *
 * @param {string} experimentId
 * @param {string} runId
 * @param {string} operatorId
 * @param page
 */
export const getOperatorResultsRequest = (
  projectId,
  experimentId,
  runId,
  operatorId,
  page,
  pageSize
) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_OPERATOR_RESULTS_REQUEST,
  });
  dispatch(operatorResultsLoadingData());

  pipelinesApi
    .getOperatorFigures(projectId, experimentId, runId, operatorId)
    .then((responseFigure) => {
      pipelinesApi
        .getOperatorDataset(projectId, experimentId, runId, operatorId, page)
        .then((responseTable) => {
          dispatch(
            getOperatorResultsSuccess(
              responseFigure,
              responseTable,
              operatorId,
              page,
              pageSize
            )
          );
        })
        .catch((error) => {
          console.log(error);
          dispatch(getOperatorResultsSuccess(responseFigure, null, operatorId));
        });
    })
    .catch((error) => dispatch(getOperatorResultsFail(error)));
};

/**
 * Get operator result dataset
 */
export const getOperatorResultDataset = (
  experimentId,
  operatorId,
  page,
  pageSize
) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_OPERATOR_DATASET_RESULT_REQUEST,
  });
  pipelinesApi
    .getOperatorDataset(experimentId, 'latest', operatorId, page, pageSize)
    .then((responseTable) => {
      let result = null;
      if (responseTable) {
        // create columns in antd format
        let tableColumns = [];
        let index = 0;
        for (let column of responseTable.data.columns) {
          let tableColumn = {
            title: column,
            dataIndex: index,
          };
          tableColumns.push(tableColumn);
          index++;
        }
        result = {
          type: 'table',
          uuid: `table-${operatorId}`,
          resultTable: {
            columns: tableColumns,
            rows: responseTable.data.data,
            total: responseTable.data.total,
            currentPage: page,
            pageSize: pageSize,
          },
        };
        dispatch({
          type: actionTypes.GET_OPERATOR_DATASET_RESULT_SUCCESS,
          result,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.GET_OPERATOR_DATASET_RESULT_FAIL,
      });
    });
};

export const getOperatorMetricsRequest = (
  projectId,
  experimentId,
  runId,
  operatorId
) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_OPERATOR_METRICS_REQUEST,
  });
  dispatch(operatorMetricsLoadingData());

  pipelinesApi
    .getOperatorMetrics(projectId, experimentId, runId, operatorId)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_OPERATOR_METRICS_SUCCESS,
        metrics: response.data,
      });
      dispatch(operatorMetricsDataLoaded());
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.GET_OPERATOR_METRICS_FAIL,
      });
      dispatch(operatorMetricsDataLoaded());
    });
};

// // // // // // // // // //
// ** SELECT OPERATOR
/**
 * select operator action
 *
 * @param {string} experimentId
 * @param {object} operator
 */
export const selectOperator = (experimentId, operator) => (
  dispatch,
  getState
) => {
  // dispatching action
  dispatch({
    type: actionTypes.SELECT_OPERATOR,
    operator,
  });

  // is operator dataset?
  const isDataset = operator.tags.includes('DATASETS');

  // get dataset reducer from store
  const { datasetReducer } = getState();

  // get is uploading status from dataset reducer
  const { isUploading } = datasetReducer;

  // fetching dataset columns
  if (isDataset && !isUploading) {
    // dataset value
    let datasetValue;

    // getting dataset value
    operator.parameters.forEach((parameter) => {
      if (parameter.name === 'dataset') datasetValue = parameter.value;
    });

    // fetching dataset columns
    dispatch(getDatasetRequest(datasetValue));
  }

  // getting results
  dispatch(
    getOperatorResultsRequest(
      projectId,
      experimentId,
      'latest',
      operator.uuid,
      page
    )
  );

  if (!isDataset && operator.status === 'Failed') {
    dispatch(getOperatorLogs(projectId, experimentId, operator.uuid));
  }

  dispatch(
    getOperatorMetricsRequest(projectId, experimentId, 'latest', operator.uuid)
  );

  // dispatching action to show drawer
  dispatch(showOperatorDrawer(operator.name, isDataset));
};

// // // // // // // // // //
/**
 * Deselect operator action
 */
export const deselectOperator = () => (dispatch) => {
  dispatch({
    type: actionTypes.DESELECT_OPERATOR,
  });
};

// // // // // // // // // //
// ** CREATE OPERATOR
/**
 * create operator fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const createOperatorFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiment operators data loaded action
  dispatch(experimentOperatorsDataLoaded());

  // dispatching create operator fail
  dispatch({
    type: actionTypes.CREATE_OPERATOR_FAIL,
    errorMessage,
  });

  message.error(errorMessage);
};

/**
 * create operator request action
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {object} taskId
 * @param {object[]} tasks,
 * @param tasks
 * @param isTemplate
 * @param position
 * @param isTemplate
 * @param position
 * @returns {Function}
 */
export const createOperatorRequest = (
  projectId,
  experimentId,
  taskId,
  tasks,
  isTemplate,
  position
) => async (dispatch, getState) => {
  // dispatching request action
  dispatch({
    type: actionTypes.CREATE_OPERATOR_REQUEST,
  });

  // getting dataset name and operators from store
  const { operatorsReducer: experimentOperators } = getState();

  // getting task data
  const { parameters, ...restTaskData } = utils.getTaskData(tasks, taskId);

  // verify if dataset operator already exist
  if (restTaskData.tags.includes('DATASETS')) {
    const datasetOperatorIndex = experimentOperators.findIndex((operator) =>
      operator.tags.includes('DATASETS')
    );
    if (datasetOperatorIndex > -1) {
      message.warn(
        'Não é permitido mais de um "Conjunto de dados" no mesmo fluxo',
        5
      );
      return;
    }
  }

  // dispatching experiment operators loading data action
  dispatch(experimentOperatorsLoadingData());

  // getting dataset columns
  const datasetName = utils.getDatasetName(tasks, experimentOperators);
  let datasetColumns = [];
  if (datasetName)
    try {
      const response = await DatasetsApi.listDatasetColumns(datasetName);
      datasetColumns = response.data;
    } catch (e) {
      dispatch(createOperatorFail(e));
    }

  // configuring feature options
  const featureOptions = utils.transformColumnsInParameterOptions(
    datasetColumns
  );

  // configuring parameters
  // necessary to check if dataset because dataset param is removed on getTaskData
  let configuredParameters;
  if (restTaskData.tags.includes('DATASETS')) {
    configuredParameters = [
      { name: 'dataset', value: '' },
      { name: 'target', value: '' },
    ];
  } else {
    configuredParameters = utils.configureOperatorParameters(
      parameters,
      parameters,
      featureOptions
    );
  }

  // creating empty dependencies
  const dependencies = [];

  // creating operator
  operatorsApi
    .createOperator(projectId, experimentId, taskId, dependencies, position)
    .then((response) => {
      // getting operator from response
      const operator = response.data;

      // dispatching experiment operators data loaded action
      dispatch(experimentOperatorsDataLoaded());

      // dispatching create operator success action
      dispatch({
        type: actionTypes.CREATE_OPERATOR_SUCCESS,
        operator: {
          ...operator,
          ...restTaskData,
          parameters: configuredParameters,
          settedUp: utils.checkOperatorSettedUp(operator),
          selected: false,
          status: '',
        },
      });
    })
    .catch((error) => dispatch(createOperatorFail(error)));
};

/**
 * Remove operator request action
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operatorId
 * @param operator
 */
export const removeOperatorRequest = (projectId, experimentId, operator) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.REMOVE_OPERATOR_REQUEST,
  });

  // dispatching experiment operators loading data action
  dispatch(experimentOperatorsLoadingData());

  // creating operator
  operatorsApi
    .deleteOperator(projectId, experimentId, operator.uuid)
    .then(() => {
      // dispatching hide drawer action
      dispatch(hideOperatorDrawer());

      //deselect operator after success remotion
      dispatch(deselectOperator());

      // dispatching to fetch operator
      if (operator.tags.includes('DATASETS')) {
        dispatch(
          clearOperatorsFeatureParametersRequest(projectId, experimentId)
        );
      } else {
        dispatch(fetchOperatorsRequest(projectId, experimentId));
      }

      message.success('Operador removido com sucesso!');
    })
    .catch((error) => {
      // getting error message
      const errorMessage = error.message;

      // dispatching experiment operators data loaded action
      dispatch(experimentOperatorsDataLoaded());

      // dispatching remove operator fail
      dispatch({
        type: actionTypes.REMOVE_OPERATOR_FAIL,
        errorMessage,
      });

      message.error(errorMessage);
    });
};

// ** SET OPERATOR PARAMS
/**
 * set operator params success action
 *
 * @param {object} operator
 * @returns {object} { type, operator }
 */
const setOperatorParametersSuccess = (operator) => (dispatch) => {
  // dispatching operator parameter data loaded action
  dispatch(operatorParameterDataLoaded());

  // dispatching set operator params success action
  dispatch({
    type: actionTypes.SET_OPERATOR_PARAMETERS_SUCCESS,
    operator,
  });
};

/**
 * set operator params fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const setOperatorParametersFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching operator parameter data loaded action
  dispatch(operatorParameterDataLoaded());

  // dispatching set operator params fail
  dispatch({
    type: actionTypes.SET_OPERATOR_PARAMETERS_FAIL,
    errorMessage,
  });

  message.error(errorMessage);
};

/**
 * set operator params request action
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {object} operator
 * @param {string} parameterName
 * @param {any} parameterValue
 * @returns {Function}
 */
export const setOperatorParametersRequest = (
  projectId,
  experimentId,
  operator,
  parameterName,
  parameterValue
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.SET_OPERATOR_PARAMETERS_REQUEST,
  });

  // dispatching operator parameter loading data action
  dispatch(operatorParameterLoadingData());

  // formating parameter value
  const formatedValue = Array.isArray(parameterValue)
    ? parameterValue.join(',')
    : parameterValue;

  // filtering parameters with value
  const parametersWithValue = operator.parameters.filter((parameter) => {
    if (parameter.name === parameterName) {
      return true;
    } else if (parameter.value !== undefined) {
      return true;
    } else {
      return false;
    }
  });

  // creating parameter object to update
  const parameters = {};
  parametersWithValue.forEach(({ name, value }) => {
    parameters[name] =
      name === parameterName
        ? formatedValue !== null
          ? formatedValue
          : undefined
        : Array.isArray(value)
        ? value.join(',')
        : value;
  });

  // creating operator object
  const operatorWithParameters = { parameters };

  // update operator
  operatorsApi
    .updateOperator(
      projectId,
      experimentId,
      operator.uuid,
      operatorWithParameters
    )
    .then((response) => {
      // getting operator data
      const successOperator = { ...operator };

      // changing param value
      successOperator.parameters = successOperator.parameters.map(
        (parameter) => ({
          ...parameter,
          value:
            parameter.name === parameterName
              ? parameterValue !== null
                ? parameterValue
                : undefined
              : parameter.value,
        })
      );

      // checking if operator is setted up
      successOperator.settedUp = utils.checkOperatorSettedUp(response.data);

      // dispatching success action
      dispatch(setOperatorParametersSuccess(successOperator));
    })
    .catch((error) => dispatch(setOperatorParametersFail(error)));
};

// // // // // // // // // //

export const saveOperatorPosition = (
  projectId,
  experimentId,
  operatorId,
  position
) => async (dispatch) => {
  const body = {
    positionX: position.x,
    positionY: position.y,
  };

  await operatorsApi
    .updateOperator(projectId, experimentId, operatorId, body)
    .catch((error) => {
      console.log(error);
    });
};

export const saveOperatorDependencies = (
  projectId,
  experimentId,
  operatorId,
  dependencies,
  operators
) => async (dispatch) => {
  const body = {
    dependencies: dependencies,
  };

  dispatch(
    dependenciesOperatorLoading(
      `${operatorId}-${dependencies[dependencies.length - 1]}`
    )
  );

  const modifiedOperators = _.cloneDeep(operators);

  const operatorWithNewDependencies = _.map(modifiedOperators, (el) => {
    if (el.uuid === operatorId) {
      el.dependencies = dependencies;
    }
    return el;
  });

  dispatch(upadteOperatorDependencies(operatorWithNewDependencies));

  await operatorsApi
    .updateOperator(projectId, experimentId, operatorId, body)
    .then(() => {
      dispatch(dependenciesOperatorLoaded());
    })
    .catch((error) => {
      dispatch(dependenciesOperatorLoaded());
      const errorMessage = error.message;
      message.error(errorMessage);
      dispatch(upadteOperatorDependencies(operators));
    });
};

export const saveTargetAttribute = (
  projectId,
  experimentId,
  parameters
) => async (dispatch, getState) => {
  const { operatorReducer: datasetOperator } = getState();

  dispatch(
    setOperatorParametersRequest(
      projectId,
      experimentId,
      datasetOperator,
      'target',
      parameters[0]
    )
  );
};

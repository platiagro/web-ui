// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import operatorsApi from '../../services/OperatorsApi';

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
  operatorMetricsLoadingData,
  operatorMetricsDataLoaded,
} from '../ui/actions';

// DATASET ACTIONS
import { getDatasetRequest } from '../dataset/actions';

// OPERATORS ACTIONS
import {
  clearOperatorsFeatureParametersRequest,
  fetchOperatorsRequest,
} from '../operators/actions';

// UTILS
import utils from '../../utils';
import DatasetsApi from 'services/DatasetsApi';

// ACTIONS
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
  operatorId
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
        currentPage: 1,
      },
    });
  }

  // dispatching operator results data loaded action
  dispatch(operatorResultsDataLoaded());

  // dispatching get operator results success action
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
    logs: logs.output.traceback,
  });
};

const getLogsFail = (error) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_OPERATOR_LOGS_FAIL,
  });
  message.error(utils.getErrorMessage(error));
};

/**
 * get operator log
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operatorId
 * @returns {Function}
 */
export const getOperatorLogs = (projectId, experimentId, operatorId) => async (
  dispatch
) => {
  operatorsApi
    .getNotebookLog(projectId, experimentId, operatorId)
    .then((res) => {
      dispatch(getLogsSuccess(res));
    })
    .catch((error) => {
      dispatch(getLogsFail(error));
    });
};

/**
 * set operator params request action
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operatorId
 * @param page
 * @returns {Function}
 */
export const getOperatorResultsRequest = (
  projectId,
  experimentId,
  operatorId,
  page
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.GET_OPERATOR_RESULTS_REQUEST,
  });

  // dispatching operator results loading data action
  dispatch(operatorResultsLoadingData());

  // get operator figure result
  operatorsApi
    .getOperatorResults(projectId, experimentId, operatorId)
    .then((responseFigure) => {
      // get operator dataset result
      operatorsApi
        .getOperatorResultsDataset(projectId, experimentId, operatorId, page)
        .then((responseTable) => {
          dispatch(
            getOperatorResultsSuccess(responseFigure, responseTable, operatorId)
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
 * get operator results success action
 *
 * @param {object} responseFigure
 * @param {object} responseTable
 * @param {string} operatorId
 * @param page
 * @returns {object} { type, results }
 */
const getDataSetResultSuccess = (responseTable, operatorId, page) => (
  dispatch
) => {
  // getting figure results
  const results = [];
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
      },
    });
  }

  // dispatching operator results data loaded action
  dispatch(operatorResultsDataLoaded());

  // dispatching get operator results success action
  dispatch({
    type: actionTypes.GET_OPERATOR_RESULTS_SUCCESS,
    results,
  });
};

/**
 * set operator params request action
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operatorId
 * @param page
 * @returns {Function}
 */
export const getPageDataSetRequest = (
  projectId,
  experimentId,
  operatorId,
  page
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.GET_OPERATOR_RESULTS_REQUEST,
  });

  // dispatching operator results loading data action
  dispatch(operatorResultsLoadingData());

  operatorsApi
    .getOperatorResultsDataset(projectId, experimentId, operatorId, page)
    .then((responseTable) => {
      dispatch(getDataSetResultSuccess(responseTable, operatorId, page));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getOperatorMetricsRequest = (
  projectId,
  experimentId,
  operatorId
) => (dispatch) => {
  // get operator figure metrics
  dispatch({
    type: actionTypes.GET_OPERATOR_METRICS_REQUEST,
  });
  dispatch(operatorMetricsLoadingData());

  operatorsApi
    .getOperatorMetrics(projectId, experimentId, operatorId)
    .then((metrics) => {
      dispatch({
        type: actionTypes.GET_OPERATOR_METRICS_SUCCESS,
        metrics,
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
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operator
 * @param {number} page
 * @returns {Function}
 */
export const selectOperator = (projectId, experimentId, operator, page) => (
  dispatch
) => {
  // dispatching action
  dispatch({
    type: actionTypes.SELECT_OPERATOR,
    operator,
  });

  // is operator dataset?
  const isDataset = operator.tags.includes('DATASETS');

  // fetching dataset columns
  if (isDataset) {
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
    getOperatorResultsRequest(projectId, experimentId, operator.uuid, page)
  );

  if (!isDataset && operator.status === 'Failed') {
    dispatch(getOperatorLogs(projectId, experimentId, operator.uuid));
  }

  dispatch(getOperatorMetricsRequest(projectId, experimentId, operator.uuid));

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
};

/**
 * create operator request action
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {object} taskId
 * @param {object[]} tasks,
 * @param tasks
 * @returns {Function}
 */
export const createOperatorRequest = (
  projectId,
  experimentId,
  taskId,
  tasks
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
    configuredParameters = [{ name: 'dataset', value: '' }];
  } else {
    configuredParameters = utils.configureOperatorParameters(
      parameters,
      parameters,
      featureOptions
    );
  }

  // put the last operator as dependencie of the new one
  const dependencies = [];
  if (experimentOperators.length > 0) {
    const lastOperator = experimentOperators[experimentOperators.length - 1];
    dependencies.push(lastOperator.uuid);
  }

  // creating operator
  operatorsApi
    .createOperator(projectId, experimentId, taskId, dependencies)
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

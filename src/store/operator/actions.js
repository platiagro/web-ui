// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import operatorsApi from '../../services/OperatorsApi';

// UI ACTIONS
import {
  showDrawer,
  hideDrawer,
  experimentOperatorsDataLoaded,
  experimentOperatorsLoadingData,
  operatorParameterLoadingData,
  operatorParameterDataLoaded,
  operatorResultsDataLoaded,
  operatorResultsLoadingData,
} from '../ui/actions';

// DATASET ACTIONS
import { fetchDatasetColumnsRequest } from '../dataset/actions';

// UTILS
import utils from '../../utils';

// ACTIONS
// ** GET OPERATOR RESULTS
/**
 * get operator results success action
 * @param {Object} responseFigure
 * @param {Object} responseTable
 * @param {string} operatorId
 * @returns {Object} { type, results }
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
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
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
 * set operator params request action
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operatorId
 * @returns {Function}
 */
export const getOperatorResultsRequest = (
  projectId,
  experimentId,
  operatorId
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
        .getOperatorResultsDataset(projectId, experimentId, operatorId)
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

// // // // // // // // // //
// ** SELECT OPERATOR
/**
 * select operator action
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operator
 * @returns {Function}
 */
export const selectOperator = (projectId, experimentId, operator) => (
  dispatch
) => {
  // dispatching action
  dispatch({
    type: actionTypes.SELECT_OPERATOR,
    operator,
  });

  // is operator dataset?
  const isDataset = operator.uuid === 'dataset';

  // fetching dataset columns
  if (isDataset) {
    // dataset value
    let datasetValue;

    // getting dataset value
    operator.parameters.forEach((parameter) => {
      if (parameter.name === 'dataset') datasetValue = parameter.value;
    });

    // fetching dataset columns
    dispatch(fetchDatasetColumnsRequest(datasetValue));
  }

  // getting results
  dispatch(getOperatorResultsRequest(projectId, experimentId, operator.uuid));

  // dispatching action to show drawer
  dispatch(showDrawer(operator.name, isDataset));
};

// // // // // // // // // //

// ** CREATE OPERATOR
/**
 * create operator success action
 * @param {Object} response
 * @param {string} componentIcon
 * @param {string} componentName
 * @param {string} trainingNotebookPath
 * @param {string} inferenceNotebookPath
 * @returns {Object} { type, operator }
 */
const createOperatorSuccess = (
  response,
  componentIcon,
  componentName,
  trainingNotebookPath,
  inferenceNotebookPath,
  parameters
) => (dispatch) => {
  // getting operator from response
  const operator = response.data;

  // dispatching experiment operators data loaded action
  dispatch(experimentOperatorsDataLoaded());

  // dispatching create operator success action
  dispatch({
    type: actionTypes.CREATE_OPERATOR_SUCCESS,
    operator: {
      ...operator,
      icon: componentIcon,
      name: componentName,
      trainingNotebookPath,
      inferenceNotebookPath,
      parameters,
      selected: false,
      settedUp: utils.checkOperatorSettedUp(parameters),
    },
  });
};

/**
 * create operator fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
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
 * @param {string} projectId
 * @param {string} experimentId
 * @param {Object} componentId
 * @param {Object[]} components,
 * @returns {Function}
 */
export const createOperatorRequest = (
  projectId,
  experimentId,
  componentId,
  components
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.CREATE_OPERATOR_REQUEST,
  });

  // dispatching experiment operators loading data action
  dispatch(experimentOperatorsLoadingData());

  // getting component icon
  const {
    name: componentName,
    icon: componentIcon,
    trainingNotebookPath,
    inferenceNotebookPath,
    parameters,
  } = utils.getComponentData(components, componentId);

  // configuring parameters
  const configuredParameters = utils.configureOperatorParameters(
    parameters,
    parameters
  );

  // creating operator
  operatorsApi
    .createOperator(projectId, experimentId, componentId)
    .then((response) =>
      dispatch(
        createOperatorSuccess(
          response,
          componentIcon,
          componentName,
          trainingNotebookPath,
          inferenceNotebookPath,
          configuredParameters
        )
      )
    )
    .catch((error) => dispatch(createOperatorFail(error)));
};

// // // // // // // // // //

// ** REMOVE OPERATOR
/**
 * remove operator success action
 * @param {Object} operatorId
 * @returns {Object} { type, operatorId }
 */
const removeOperatorSuccess = (operatorId) => (dispatch) => {
  // dispatching experiment operators data loaded action
  dispatch(experimentOperatorsDataLoaded());

  // dispatching hide drawer action
  dispatch(hideDrawer());

  // dispatching remove operator success action
  dispatch({
    type: actionTypes.REMOVE_OPERATOR_SUCCESS,
    operatorId,
  });
};

/**
 * remove operator fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const removeOperatorFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiment operators data loaded action
  dispatch(experimentOperatorsDataLoaded());

  // dispatching remove operator fail
  dispatch({
    type: actionTypes.REMOVE_OPERATOR_FAIL,
    errorMessage,
  });
};

/**
 * remove operator request action
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operatorId
 * @returns {Function}
 */
export const removeOperatorRequest = (projectId, experimentId, operatorId) => (
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
    .deleteOperator(projectId, experimentId, operatorId)
    .then(() => dispatch(removeOperatorSuccess(operatorId)))
    .catch((error) => dispatch(removeOperatorFail(error)));
};

// // // // // // // // // //

// ** SET OPERATOR PARAMS
/**
 * set operator params success action
 * @param {Object} operator
 * @returns {Object} { type, operator }
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
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
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
 * @param {string} projectId
 * @param {string} experimentId
 * @param {Object} operator
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
  const parametersWithValue = operator.parameters.filter(
    (parameter) => parameter.value
  );

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

  // creating operator
  operatorsApi
    .updateOperator(
      projectId,
      experimentId,
      operator.uuid,
      operatorWithParameters
    )
    .then(() => {
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

      // checking if is setted up
      successOperator.settedUp = utils.checkOperatorSettedUp(
        successOperator.parameters
      );

      // dispatching success action
      dispatch(setOperatorParametersSuccess(successOperator));
    })
    .catch((error) => dispatch(setOperatorParametersFail(error)));
};

// // // // // // // // // //

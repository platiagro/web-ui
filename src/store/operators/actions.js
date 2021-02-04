// UI LIB
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import datasetsApi from 'services/DatasetsApi';
import operatorsApi from 'services/OperatorsApi';
import tasksApi from 'services/TasksApi';

// UI ACTIONS
import {
  experimentOperatorsDataLoaded,
  experimentOperatorsLoadingData,
  operatorParameterLoadingData,
  operatorParameterDataLoaded,
  experimentsTabsLoadingData,
  experimentsTabsDataLoaded,
} from 'store/ui/actions';

// UTILS
import utils from 'utils';

// ACTIONS
// ** FETCH OPERATORS
/**
 * fetch operators success action
 *
 * @param {object} response
 * @param operators
 * @param projectId
 * @param experimentId
 * @param operators
 * @param experimentId
 * @returns {object} { type, operators }
 */
const fetchOperatorsSuccess = (operators) => (dispatch) => {
  // dispatching experiment operators data loaded action
  dispatch(experimentOperatorsDataLoaded());

  // dispatching experiment tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  // dispatching fetch operators success action
  dispatch({
    type: actionTypes.FETCH_OPERATORS_SUCCESS,
    operators,
  });
};

/**
 * fetch operators fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const fetchOperatorsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiment operators data loaded action
  dispatch(experimentOperatorsDataLoaded());

  // dispatching experiment tabs data loaded action
  dispatch(experimentsTabsDataLoaded());

  // dispatching fetch operators fail
  dispatch({
    type: actionTypes.FETCH_OPERATORS_FAIL,
    errorMessage,
  });

  message.error(errorMessage);
};

/**
 * fetch operators request action
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @returns {Function}
 */
export const fetchOperatorsRequest = (projectId, experimentId) => async (
  dispatch
) => {
  dispatch({
    type: actionTypes.FETCH_OPERATORS_REQUEST,
  });
  dispatch(experimentOperatorsLoadingData());
  dispatch(experimentsTabsLoadingData());

  try {
    // getting tasks
    const tasksResponse = await tasksApi.getAllTasks();
    const tasks = tasksResponse.data.tasks;

    // getting operators
    const operatorsResponse = await operatorsApi.listOperators(
      projectId,
      experimentId
    );
    const operators = operatorsResponse.data.operators;

    // getting dataset columns
    const datasetName = utils.getDatasetName(tasks, operators);
    let datasetColumns = [];
    if (datasetName) {
      const response = await datasetsApi.listDatasetColumns(datasetName);
      datasetColumns = response.data;
    }

    // configuring operators
    let configuredOperators = utils.configureOperators(
      tasks,
      operators,
      datasetColumns
    );
    dispatch(fetchOperatorsSuccess(configuredOperators));
  } catch (e) {
    dispatch(fetchOperatorsFail(e));
  }
};

/**
 * Clear operators feature parameters
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param dataset
 */
export const clearOperatorsFeatureParametersRequest = (
  projectId,
  experimentId,
  dataset
) => async (dispatch, getState) => {
  const { operatorsReducer: operators } = getState();

  dispatch({
    type: actionTypes.CLEAR_OPERATORS_FEATURE_PARAMETERS_REQUEST,
  });

  dispatch(operatorParameterLoadingData());

  try {
    // getting all operators with feature parameter
    const operatorsWithFeatureParameter = [];
    operators.forEach((operator) => {
      const newOperator = { ...operator };

      // getting operator feature parameters
      const operatorFeatureParameters = operator.parameters.filter(
        (parameter) => {
          if (parameter.type === 'feature') {
            return true;
          }
          return false;
        }
      );

      // adding operator to list if it has feature parameters
      if (operatorFeatureParameters.length > 0) {
        operatorsWithFeatureParameter.push(newOperator);
      }
    });

    // clear operators feature parameters
    for (const operator of operatorsWithFeatureParameter) {
      // creating parameter object to update without the feature parameter
      const parameters = {};
      operator.parameters.forEach(({ name, type, value }) => {
        if (type !== 'feature') {
          parameters[name] = value;
        }
      });
      const body = { parameters };
      await operatorsApi
        .updateOperator(projectId, experimentId, operator.uuid, body)
        .catch((error) => {
          console.log(error);
        });
    }

    dispatch({
      type: actionTypes.UPDATE_OPERATORS_OPTIONS,
      columns: dataset ? dataset.columns : [],
    });

    dispatch(operatorParameterDataLoaded());
  } catch (e) {
    dispatch(operatorParameterDataLoaded());
    console.log(e);
  }
};

// // // // // // // // // //

export const upadteOperatorDependencies = (operators) => async (dispatch) => {
  // getting tasks
  const tasksResponse = await tasksApi.getAllTasks();
  const tasks = tasksResponse.data.tasks;

  // getting dataset columns
  const datasetName = utils.getDatasetName(tasks, operators);
  let datasetColumns = [];
  if (datasetName) {
    const response = await datasetsApi.listDatasetColumns(datasetName);
    datasetColumns = response.data;
  }

  // configuring operators
  let configuredOperators = utils.configureOperators(
    tasks,
    operators,
    datasetColumns
  );

  dispatch({
    type: actionTypes.UPDATE_OPERATOR_DEPENDENCIES,
    operators: configuredOperators,
  });
};

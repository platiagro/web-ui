import _ from 'lodash';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import datasetsApi from 'services/DatasetsApi';
import deploymentsOperatorsApi from 'services/DeploymentsOperatorsApi';

// UI LIB
import { message } from 'antd';

// ACTIONS
import { fetchOperatorsRequest } from 'store/deployments/deploymentOperators/actions';

// UTILS
import utils from 'utils';

// ACTIONS
/**
 * Create operator request action
 *
 * @param {string} projectId
 * @param {string} deploymentId
 * @param {object} taskId
 * @param {object[]} tasks,
 * @param {object} position
 */
export const createOperatorRequest = (
  projectId,
  deploymentId,
  taskId,
  tasks,
  position
) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.CREATE_DEPLOYMENT_OPERATOR_REQUEST,
  });

  // getting dataset name and operators from store
  const { deploymentOperatorsReducer: deploymentOperators } = getState();

  // getting task data
  const { parameters, ...restTaskData } = utils.getTaskData(tasks, taskId);

  // verify if dataset operator already exist
  if (restTaskData.tags.includes('DATASETS')) {
    const datasetOperatorIndex = deploymentOperators.findIndex((operator) =>
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

  //TODO:
  // dispatch(experimentOperatorsLoadingData());

  // getting dataset columns
  const datasetName = utils.getDatasetName(tasks, experimentOperators);
  let datasetColumns = [];
  if (datasetName)
    try {
      const response = await datasetsApi.listDatasetColumns(datasetName);
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

  // creating operator
  deploymentsOperatorsApi
    .createOperator(projectId, deploymentId, taskId, [], position)
    .then((response) => {
      //TODO:
      // dispatch(experimentOperatorsDataLoaded());
      const operator = response.data;
      dispatch({
        type: actionTypes.CREATE_DEPLOYMENT_OPERATOR_SUCCESS,
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
    .catch((error) => {
      //TODO:
      // dispatch(experimentOperatorsDataLoaded());
      const errorMessage = error.message;
      dispatch({
        type: actionTypes.CREATE_DEPLOYMENT_OPERATOR_FAIL,
        errorMessage,
      });
      message.error(errorMessage);
    });
};

/**
 * Remove operator request action
 *
 * @param {string} projectId
 * @param {string} deploymentId
 * @param {object} operator
 */
export const removeOperatorRequest = (projectId, deploymentId, operator) => (
  dispatch
) => {
  dispatch({
    type: actionTypes.REMOVE_DEPLOYMENT_OPERATOR_REQUEST,
  });

  //TODO:
  // dispatch(experimentOperatorsLoadingData());

  deploymentsOperatorsApi
    .deleteOperator(projectId, deploymentId, operator.uuid)
    .then(() => {
      dispatch({
        type: actionTypes.REMOVE_DEPLOYMENT_OPERATOR_SUCCESS,
      });
      //TODO:
      // dispatch(hideOperatorDrawer());
      // dispatch(deselectOperator());
      // if (operator.tags.includes('DATASETS')) {
      //   dispatch(
      //     clearOperatorsFeatureParametersRequest(projectId, deploymentId, null)
      //   );
      // }
      dispatch(fetchOperatorsRequest(projectId, deploymentId));
      message.success('Operador removido com sucesso!');
    })
    .catch((error) => {
      //TODO:
      // dispatch(experimentOperatorsDataLoaded());
      const errorMessage = error.message;
      dispatch({
        type: actionTypes.REMOVE_DEPLOYMENT_OPERATOR_FAIL,
        errorMessage,
      });
      message.error(errorMessage);
    });
};

/**
 * Set operator params request action
 *
 * @param {string} projectId
 * @param {string} deploymentId
 * @param {object} operator
 * @param {string} parameterName
 * @param {any} parameterValue
 */
export const setOperatorParametersRequest = (
  projectId,
  deploymentId,
  operator,
  parameterName,
  parameterValue
) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_DEPLOYMENT_OPERATOR_PARAMETERS_REQUEST,
  });
  //TODO:
  // dispatch(operatorParameterLoadingData());

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
  deploymentsOperatorsApi
    .updateOperator(
      projectId,
      deploymentId,
      operator.uuid,
      operatorWithParameters
    )
    .then((response) => {
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
      //TODO:
      // dispatch(operatorParameterDataLoaded());
      dispatch({
        type: actionTypes.SET_DEPLOYMENT_OPERATOR_PARAMETERS_SUCCESS,
        successOperator,
      });
    })
    .catch((error) => {
      //TODO:
      // dispatch(operatorParameterDataLoaded());
      const errorMessage = error.message;
      dispatch({
        type: actionTypes.SET_DEPLOYMENT_OPERATOR_PARAMETERS_FAIL,
        errorMessage,
      });
      message.error(errorMessage);
    });
};

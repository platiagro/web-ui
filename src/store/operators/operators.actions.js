import { showError } from 'store/message';

import * as OPERATORS_TYPES from './operators.actionTypes';

// SERVICES
import tasksApi from 'services/TasksApi';
import datasetsApi from 'services/DatasetsApi';
import operatorsApi from 'services/OperatorsApi';
import deploymentRunsApi from 'services/DeploymentRunsApi';
import deploymentsOperatorsApi from 'services/DeploymentsOperatorsApi';

// UTILS
import utils from 'utils';
import { addLoading, removeLoading } from 'store/loading';

// ACTIONS
// ** FETCH OPERATORS
/**
 * fetch operators success action
 *
 * @param {object} operators Operators
 * @returns {object} { type, operators }
 */
const fetchOperatorsSuccess = (operators) => (dispatch) => {
  // dispatching fetch operators success action
  dispatch({
    type: OPERATORS_TYPES.FETCH_OPERATORS_SUCCESS,
    payload: { operators: operators },
  });
};

/**
 * fetch operators fail action
 *
 * @param {object} error Error from API
 * @returns {object} { type, errorMessage }
 */
const fetchOperatorsFail = (error) => (dispatch) => {
  // dispatching fetch operators fail
  dispatch({
    type: OPERATORS_TYPES.FETCH_OPERATORS_FAIL,
  });
  dispatch(showError(error.message));
};

/**
 * fetch operators request action
 *
 * @param {string} projectId Project ID
 * @param {string} experimentId Experiment ID
 * @param {boolean} withLoading Flag to check loading or not
 * @returns {Promise} Request
 */
export const fetchExperimentOperatorsRequest =
  (projectId, experimentId, withLoading = true) =>
  async (dispatch) => {
    dispatch({
      type: OPERATORS_TYPES.FETCH_OPERATORS_REQUEST,
    });

    if (withLoading) {
      dispatch(clearAllDeploymentOperators());
      dispatch(addLoading(OPERATORS_TYPES.FETCH_OPERATORS_REQUEST));
    }

    try {
      // getting operators
      const operatorsResponse = await operatorsApi.listOperators(
        projectId,
        experimentId
      );
      const operators = operatorsResponse.data.operators;

      // getting dataset columns
      const datasetName = utils.getDatasetName(undefined, operators);
      let datasetColumns = [];
      if (datasetName) {
        const response = await datasetsApi.listDatasetColumns(datasetName);
        datasetColumns = response.data;
      }

      // configuring operators
      let configuredOperators = utils.configureOperators(
        undefined,
        operators,
        datasetColumns
      );
      dispatch(fetchOperatorsSuccess(configuredOperators));
    } catch (e) {
      dispatch(fetchOperatorsFail(e));
    } finally {
      dispatch(removeLoading(OPERATORS_TYPES.FETCH_OPERATORS_REQUEST));
    }
  };

/**
 * Fetch operators request action
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @returns {Function} Dispatch function
 */
export const fetchDeploymentOperatorsRequest =
  (projectId, deploymentId) => async (dispatch) => {
    dispatch({
      type: OPERATORS_TYPES.FETCH_OPERATORS_REQUEST,
    });

    dispatch(addLoading(OPERATORS_TYPES.FETCH_OPERATORS_REQUEST));

    try {
      // getting tasks
      const tasksResponse = await tasksApi.getAllTasks();
      const tasks = tasksResponse.data.tasks;

      // getting operators
      const operatorsResponse = await deploymentsOperatorsApi.listOperators(
        projectId,
        deploymentId
      );

      const operators = operatorsResponse.data.operators;

      // get dataset name
      const datasetName = utils.getDatasetName(tasks, operators);

      // getting dataset columns
      let datasetColumns = [];
      if (datasetName) {
        const response = await datasetsApi.listDatasetColumns(datasetName);
        datasetColumns = response.data;
      }

      // gettins pipelines status
      const pipelinesResponse = await deploymentRunsApi.listDeploymentRuns(
        projectId,
        deploymentId
      );

      // configuring operators
      let configuredOperators = utils.configureOperators(
        tasks,
        operators,
        datasetColumns,
        pipelinesResponse.data
      );

      dispatch(fetchOperatorsSuccess(configuredOperators));
    } catch (e) {
      dispatch(fetchOperatorsFail(e));
    } finally {
      dispatch(removeLoading(OPERATORS_TYPES.FETCH_OPERATORS_REQUEST));
    }
  };

/**
 * Clear operators feature parameters
 *
 * @param {string} projectId Project ID
 * @param {string} experimentId Experiment ID
 * @param {object} dataset Dataset Object
 * @returns {Promise} Request
 */
export const clearOperatorsFeatureParametersRequest =
  // eslint-disable-next-line sonarjs/cognitive-complexity
  (projectId, experimentId, dataset) => async (dispatch, getState) => {
    try {
      const { operatorsReducer: operators } = getState();

      dispatch({
        type: OPERATORS_TYPES.CLEAR_OPERATORS_FEATURE_PARAMETERS_REQUEST,
      });

      dispatch(
        addLoading(OPERATORS_TYPES.CLEAR_OPERATORS_FEATURE_PARAMETERS_REQUEST)
      );

      // getting all operators with feature parameter
      const operatorsWithFeatureParameter = operators.filter((operator) =>
        operator.parameters.some((parameter) => parameter.type === 'feature')
      );

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

      const columns = dataset ? dataset.columns : [];

      let mappedOperators = [...operators];

      mappedOperators = mappedOperators.map((operator) => {
        const featureOptions =
          utils.transformColumnsInParameterOptions(columns);

        let paramUpdated = false;
        for (const param of operator.parameters) {
          if (param.type === 'feature') {
            param.options = featureOptions;
            param.value = param.multiple ? [] : null;
            paramUpdated = true;
          }
        }
        if (paramUpdated) {
          operator.settedUp = false;
        }
        return { ...operator };
      });

      dispatch({
        type: OPERATORS_TYPES.UPDATE_OPERATORS_OPTIONS,
        payload: { operators: mappedOperators },
      });
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(
        removeLoading(
          OPERATORS_TYPES.CLEAR_OPERATORS_FEATURE_PARAMETERS_REQUEST
        )
      );
    }
  };

export const upadteOperatorDependencies =
  (operators) => async (dispatch, getState) => {
    // getting store data
    const { tasksReducer, datasetReducer } = getState();

    // getting tasks
    const { tasks } = tasksReducer;

    // getting dataset columns
    const { columns } = datasetReducer;

    // configuring operators
    let configuredOperators = utils.configureOperators(
      tasks,
      operators,
      columns
    );

    // create/dispatch action
    dispatch({
      type: OPERATORS_TYPES.UPDATE_OPERATOR_DEPENDENCIES,
      payload: { operators: configuredOperators },
    });
  };

/**
 * CLear all deployment operators from DeploymentOperators reducer
 *
 * @returns {object} Action
 */
export const clearAllDeploymentOperators = () => {
  return {
    type: OPERATORS_TYPES.CLEAR_ALL_DEPLOYMENT_OPERATORS,
  };
};

/**
 * Edit a single operator data locally (do not make HTTP requests)
 * This action can be used to just edit data in the operators redux store
 *
 * @param {string} operatorId Operator ID
 * @param {object} operatorData Operator data
 * @returns {object} Action
 */
export const editOperatorStoreData = (operatorId, operatorData) => {
  return {
    type: OPERATORS_TYPES.EDIT_OPERATOR_STORE_DATA,
    payload: {
      operatorId,
      operatorData,
    },
  };
};

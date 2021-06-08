import _ from 'lodash';

// ACTION TYPES
import * as OPERATOR_TYPES from './operator.actionTypes';

// SERVICES
import DatasetsApi from 'services/DatasetsApi';
import operatorsApi from 'services/OperatorsApi';
import experimentRunsApi from 'services/ExperimentRunsApi';

import { showError, showSuccess, showWarning } from 'store/message';

// ACTIONS
import { getDatasetRequest } from 'store/dataset/actions';
import {
  clearOperatorsFeatureParametersRequest,
  fetchExperimentOperatorsRequest,
  upadteOperatorDependencies,
} from 'store/operators';
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
  dependenciesOperatorLoading,
  dependenciesOperatorLoaded,
} from 'store/ui/actions';

// UTILS
import utils from 'utils';
import DeploymentsOperatorsApi from 'services/DeploymentsOperatorsApi';

// ACTIONS
/**
 * Download operator result dataset
 *
 * @param projectId Project ID
 * @param experimentId Experiment ID
 * @param operatorId Operator ID
 * @returns {Promise} Request
 */

export const downloadOperatorResultDataset =
  (projectId, experimentId, operatorId) => (dispatch) => {
    dispatch(operatorResultsDownloadDatasetLoading());
    dispatch({
      type: OPERATOR_TYPES.DOWNLOAD_OPERATOR_DATASET_RESULT_REQUEST,
    });

    experimentRunsApi
      .listOperatorDatasets(
        projectId,
        experimentId,
        'latest',
        operatorId,
        1,
        -1
      )
      .then((response) => {
        dispatch(operatorResultsDownloadDatasetLoaded());
        const responseData = response.data;
        dispatch({
          type: OPERATOR_TYPES.DOWNLOAD_OPERATOR_DATASET_RESULT_SUCCESS,
          downloadDataset: [[...responseData.columns], ...responseData.data],
        });
      })
      .catch((error) => {
        dispatch(operatorResultsDownloadDatasetLoaded());
        dispatch(showError(error.message));
      });
  };

// ** GET OPERATOR RESULTS
/**
 *  get operator logs success action
 *
 * @param {object} response Response from API
 * @returns {object} { type }
 */
const getLogsSuccess = (response) => (dispatch) => {
  const logs = response.data;

  dispatch({
    type: OPERATOR_TYPES.GET_OPERATOR_LOGS_SUCCESS,
    logs: logs.traceback,
  });
};

/**
 *  get operator logs fail action
 *
 * @param {object} error Error from API
 * @returns {object} { type }
 */
const getLogsFail = (error) => (dispatch) => {
  dispatch({
    type: OPERATOR_TYPES.GET_OPERATOR_LOGS_FAIL,
    logs: error.response.data.message,
  });
};

/**
 *Get operator logs
 *
 * @param {string} projectId Project ID
 * @param {string} experimentId Experiment ID
 * @returns {Promise} Request
 */

export const getOperatorLogs =
  (projectId, experimentId, operatorId) => async (dispatch) => {
    experimentRunsApi
      .fetchOperatorLogs(projectId, experimentId, 'latest', operatorId)
      .then((res) => {
        dispatch(getLogsSuccess(res));
      })
      .catch((error) => {
        dispatch(getLogsFail(error));
      });
  };

/**
 *Get operator figures
 *
 * @param {string} projectId Project ID
 * @param {string} experimentId Experiment ID
 * @param {string} runId Run ID
 * @param {string} operatorId Operator ID
 * @returns {Promise} Request
 */

export const getOperatorFigures =
  (projectId, experimentId, runId, operatorId) => (dispatch) => {
    dispatch({
      type: OPERATOR_TYPES.GET_OPERATOR_FIGURES_REQUEST,
    });
    dispatch(operatorResultsLoadingData());
    experimentRunsApi
      .listOperatorFigures(projectId, experimentId, runId, operatorId)
      .then((responseFigure) => {
        const results = utils.transformResults(operatorId, responseFigure.data);
        dispatch(operatorResultsDataLoaded());
        dispatch({
          type: OPERATOR_TYPES.GET_OPERATOR_FIGURES_SUCCESS,
          results,
        });
      })
      .catch((error) => {
        dispatch(operatorResultsDataLoaded());
        // allowed to fail silently for 404
        if (error.response.status !== 404) {
          dispatch({
            type: OPERATOR_TYPES.GET_OPERATOR_FIGURES_FAIL,
          });
          dispatch(showError(error.message));
        }
      });
  };

/**
 * Get operator result dataset
 *
 * @param {string} projectId Project ID
 * @param {string} experimentId Experiment ID
 * @param {string} operatorId Operator ID
 * @param {number} page Page Number
 * @param {number} pageSize Page Size
 * @returns {Promise} Request
 */

export const getOperatorResultDataset =
  (projectId, experimentId, operatorId, page, pageSize) => (dispatch) => {
    dispatch({
      type: OPERATOR_TYPES.GET_OPERATOR_DATASET_RESULT_REQUEST,
    });
    experimentRunsApi
      .listOperatorDatasets(
        projectId,
        experimentId,
        'latest',
        operatorId,
        page,
        pageSize
      )
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
            uuid: `table-${operatorId}`,
            columns: tableColumns,
            currentPage: page,
            pageSize: pageSize,
            rows: responseTable.data.data,
            total: responseTable.data.total,
          };
          dispatch({
            type: OPERATOR_TYPES.GET_OPERATOR_DATASET_RESULT_SUCCESS,
            result,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: OPERATOR_TYPES.GET_OPERATOR_DATASET_RESULT_FAIL,
        });
      });
  };

export const getOperatorMetricsRequest =
  (projectId, experimentId, runId, operatorId) => (dispatch) => {
    dispatch({
      type: OPERATOR_TYPES.GET_OPERATOR_METRICS_REQUEST,
    });

    experimentRunsApi
      .listOperatorMetrics(projectId, experimentId, runId, operatorId)
      .then((response) => {
        dispatch({
          type: OPERATOR_TYPES.GET_OPERATOR_METRICS_SUCCESS,
          metrics: response.data,
        });
      })
      .catch(() => {
        dispatch({
          type: OPERATOR_TYPES.GET_OPERATOR_METRICS_FAIL,
        });
      });
  };

// // // // // // // // // //
// ** SELECT OPERATOR
/**
 * select operator action
 *
 * @param {string} projectId Project ID
 * @param {string} experimentId Experiment ID
 * @param {object} operator Operator object
 * @returns {Promise} Request
 */
export const selectOperatorAndGetData =
  (projectId, experimentId, operator) => (dispatch, getState) => {
    // dispatching action
    dispatch({
      type: OPERATOR_TYPES.SELECT_OPERATOR,
      operator,
    });

    // is operator a dataset?
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

    dispatch(
      getOperatorFigures(projectId, experimentId, 'latest', operator.uuid)
    );

    dispatch(
      getOperatorResultDataset(projectId, experimentId, operator.uuid, 1, 10)
    );

    if (!isDataset && operator.status === 'Failed') {
      dispatch(getOperatorLogs(projectId, experimentId, operator.uuid));
    }

    // dispatching action to show drawer
    dispatch(showOperatorDrawer(operator.name, isDataset));
  };

// // // // // // // // // //
/**
 * Select operator action
 *
 * @param {object} operator Operator Object
 * @returns {object} { type }
 */
export const selectOperator = (operator) => (dispatch) => {
  dispatch({
    type: OPERATOR_TYPES.SELECT_OPERATOR,
    operator,
  });
};

/**
 * Deselect operator action
 *
 * @returns {object} { type }
 */
export const deselectOperator = () => (dispatch) => {
  dispatch({
    type: OPERATOR_TYPES.DESELECT_OPERATOR,
  });
};

// // // // // // // // // //
// ** CREATE OPERATOR
/**
 * create operator fail action
 *
 * @param {object} error Error from API
 * @returns {object} { type, errorMessage }
 */
const createOperatorFail = (error) => (dispatch) => {
  // dispatching experiment operators data loaded action
  dispatch(experimentOperatorsDataLoaded());

  // dispatching create operator fail
  dispatch({
    type: OPERATOR_TYPES.CREATE_OPERATOR_FAIL,
  });

  dispatch(showError(error.message));
};

/**
 * create operator request action
 *
 * @param {string} projectId Project ID
 * @param {string} experimentId Project ID
 * @param {string} taskId Task ID
 * @param {object[]} tasks Tasks
 * @param {boolean} isTemplate Flag to check if is Template
 * @param {object} position Object with X and Y positions
 * @returns {Promise} Request
 */
export const createOperatorRequest =
  (projectId, experimentId, taskId, tasks, isTemplate, position) =>
  async (dispatch, getState) => {
    // dispatching request action
    dispatch({
      type: OPERATOR_TYPES.CREATE_OPERATOR_REQUEST,
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
        dispatch(
          showWarning(
            'Não é permitido mais de um "Conjunto de dados" no mesmo fluxo'
          )
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
    const featureOptions =
      utils.transformColumnsInParameterOptions(datasetColumns);

    const body = {
      taskId,
      dependencies: [],
      positionX: position.x,
      positionY: position.y,
    };

    // configuring parameters
    // necessary to check if dataset because dataset param is removed on getTaskData
    let configuredParameters;
    if (restTaskData.tags.includes('DATASETS')) {
      configuredParameters = [
        { name: 'dataset', value: '' },
        { name: 'target', value: '' },
      ];

      body['parameters'] = {
        dataset: '',
        target: '',
      };
    } else {
      configuredParameters = utils.configureOperatorParameters(
        parameters,
        parameters,
        featureOptions
      );
    }

    // creating operator
    operatorsApi
      .createOperator(projectId, experimentId, body)
      .then((response) => {
        // getting operator from response
        const operator = response.data;

        // dispatching experiment operators data loaded action
        dispatch(experimentOperatorsDataLoaded());

        // dispatching create operator success action
        dispatch({
          type: OPERATOR_TYPES.CREATE_OPERATOR_SUCCESS,
          payload: {
            operator: {
              ...operator,
              ...restTaskData,
              parameters: configuredParameters,
              settedUp: utils.checkOperatorSettedUp(operator),
              selected: false,
              status: '',
            },
          },
        });
      })
      .catch((error) => dispatch(createOperatorFail(error)));
  };

/**
 * Remove operator request action
 *
 * @param {string} projectId Project ID
 * @param {string} experimentId Experiment ID
 * @param {object} operator Object
 * @returns {Promise} Request
 */
export const removeOperatorRequest =
  (projectId, experimentId, operator) => (dispatch) => {
    dispatch({
      type: OPERATOR_TYPES.REMOVE_OPERATOR_REQUEST,
    });

    dispatch(experimentOperatorsLoadingData());

    operatorsApi
      .deleteOperator(projectId, experimentId, operator.uuid)
      .then(() => {
        dispatch(hideOperatorDrawer());
        dispatch(deselectOperator());
        if (operator.tags.includes('DATASETS')) {
          dispatch(
            clearOperatorsFeatureParametersRequest(
              projectId,
              experimentId,
              null
            )
          );
        }
        dispatch(fetchExperimentOperatorsRequest(projectId, experimentId));
        dispatch(showSuccess('Operador removido com sucesso!'));
      })
      .catch((error) => {
        dispatch(experimentOperatorsDataLoaded());
        dispatch({
          type: OPERATOR_TYPES.REMOVE_OPERATOR_FAIL,
        });
        dispatch(showError(error.message));
      });
  };

// ** SET OPERATOR PARAMS
/**
 * set operator params success action
 *
 * @param {object} operator Operator Object
 * @returns {object} { type, operator }
 */
const updateOperatorSuccess = (operator) => (dispatch) => {
  // dispatching operator parameter data loaded action
  dispatch(operatorParameterDataLoaded());

  // dispatching set operator params success action
  dispatch({
    type: OPERATOR_TYPES.UPDATE_OPERATOR_SUCCESS,
    operator,
  });
};

/**
 * set operator params fail action
 *
 * @param {object} error Error from API
 * @returns {object} { type, errorMessage }
 */
const updateOperatorFail = (error) => (dispatch) => {
  // dispatching operator parameter data loaded action
  dispatch(operatorParameterDataLoaded());

  // dispatching set operator params fail
  dispatch({
    type: OPERATOR_TYPES.UPDATE_OPERATOR_FAIL,
  });

  dispatch(showError(error.message));
};

/**
 * update experiment operator request action
 *
 * @param {string} projectId The project uuid
 * @param {string} experimentId The experiment uuid
 * @param {object} operator The operator
 * @param {string} parameterName Parameter name
 * @param {any} parameterValue Parameter value
 * @returns {Function} The dispatch function
 */
export const updateExperimentOperatorRequest =
  (projectId, experimentId, operator, parameterName, parameterValue) =>
  (dispatch) => {
    dispatch({
      type: OPERATOR_TYPES.UPDATE_OPERATOR_REQUEST,
    });
    dispatch(operatorParameterLoadingData());

    // filtering parameters with value
    const parametersWithValue = utils.filterOperatorParameters(
      operator,
      parameterName
    );

    const parameters = {};
    parametersWithValue.forEach(({ name, value }) => {
      parameters[name] = name === parameterName ? parameterValue : value;
    });

    // update operator
    operatorsApi
      .updateOperator(projectId, experimentId, operator.uuid, { parameters })
      .then((response) => {
        // getting operator data
        const successOperator = { ...operator };

        // changing param value
        successOperator.parameters = utils.successOperatorMap(
          successOperator.parameters,
          parameterValue,
          parameterName
        );

        // checking if operator is setted up
        successOperator.settedUp = utils.checkOperatorSettedUp(response.data);

        // dispatching success action
        dispatch(updateOperatorSuccess(successOperator));
      })
      .catch((error) => dispatch(updateOperatorFail(error)));
  };

/**
 * update deployment operator request action
 *
 * @param {string} projectId The project uuid
 * @param {string} deploymentId The deployment uuid
 * @param {object} operator The operator
 * @param {string} parameterName Parameter name
 * @param {any} parameterValue Parameter value
 * @returns {Function} The dispatch function
 */
export const updateDeploymentOperatorRequest =
  (projectId, deploymentId, operator, parameterName, parameterValue) =>
  (dispatch) => {
    dispatch({
      type: OPERATOR_TYPES.UPDATE_OPERATOR_REQUEST,
    });
    dispatch(operatorParameterLoadingData());

    // filtering parameters with value
    const parametersWithValue = utils.filterOperatorParameters(
      operator,
      parameterName
    );

    const parameters = {};
    parametersWithValue.forEach(({ name, value }) => {
      parameters[name] = name === parameterName ? parameterValue : value;
    });

    // update operator
    DeploymentsOperatorsApi.updateOperator(
      projectId,
      deploymentId,
      operator.uuid,
      { parameters }
    )
      .then((response) => {
        // getting operator data
        const successOperator = { ...operator };

        // changing param value
        successOperator.parameters = utils.successOperatorMap(
          successOperator.parameters,
          parameterValue,
          parameterName
        );

        // checking if operator is setted up
        successOperator.settedUp = utils.checkOperatorSettedUp(response.data);

        // dispatching success action
        dispatch(updateOperatorSuccess(successOperator));
      })
      .catch((error) => dispatch(updateOperatorFail(error)));
  };

// // // // // // // // // //

export const saveOperatorPosition =
  (projectId, experimentId, operatorId, position) => async (dispatch) => {
    try {
      const body = {
        positionX: position.x,
        positionY: position.y,
      };

      await operatorsApi.updateOperator(
        projectId,
        experimentId,
        operatorId,
        body
      );
    } catch (e) {
      dispatch(showError(e.message));
    }
  };

export const saveOperatorDependencies =
  (projectId, experimentId, operatorId, dependencies, operators) =>
  async (dispatch) => {
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
        dispatch(showError(error.message));
        dispatch(upadteOperatorDependencies(operators));
      });
  };

export const saveTargetAttribute =
  (projectId, experimentId, parameters) => (dispatch, getState) => {
    const { operatorReducer: datasetOperator } = getState();

    dispatch(
      updateExperimentOperatorRequest(
        projectId,
        experimentId,
        datasetOperator,
        'target',
        parameters[0]
      )
    );
  };

// // // // // // // // // //

export const saveDeploymentOperatorPosition =
  (projectId, deploymentId, operatorId, position) => async (dispatch) => {
    try {
      const operatorDataToUpdate = {
        positionX: position.x,
        positionY: position.y,
      };

      await DeploymentsOperatorsApi.updateOperator(
        projectId,
        deploymentId,
        operatorId,
        operatorDataToUpdate
      );
    } catch (e) {
      dispatch(showError(e.message));
    }
  };

// UI LIB
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import datasetsApi from 'services/DatasetsApi';
import deploymentRunsApi from 'services/DeploymentRunsApi';
import deploymentsOperatorsApi from 'services/DeploymentsOperatorsApi';
import tasksApi from 'services/TasksApi';

// UTILS
import utils from 'utils';

// ACTIONS
/**
 * Fetch operators request action
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 */
export const fetchOperatorsRequest = (projectId, deploymentId) => async (
  dispatch
) => {
  dispatch({
    type: actionTypes.FETCH_DEPLOYMENT_OPERATORS_REQUEST,
  });
  //TODO:
  // dispatch(experimentOperatorsLoadingData());
  // dispatch(experimentsTabsLoadingData());

  try {
    // getting tasks
    const tasksResponse = await tasksApi.getAllTasks();
    const tasks = tasksResponse.data.tasks;

    // getting operators
    const operatorsResponse = await deploymentsOperatorsApi.listOperators(
      projectId,
      deploymentId
    );
    const operators = operatorsResponse.data;

    // get dataset name
    const datasetName = utils.getDatasetName(tasks, operators);

    // getting dataset columns
    let datasetColumns = [];
    if (datasetName) {
      const response = await datasetsApi.listDatasetColumns(datasetName);
      datasetColumns = response.data;
    }

    // gettins pipelines status
    const pipelinesResponse = await deploymentRunsApi.fetchDeploymentRuns(
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

    //TODO:
    // dispatch(experimentOperatorsDataLoaded());
    // dispatch(experimentsTabsDataLoaded());
    // dispatch(fetchExperimentRunStatusRequest(projectId, experimentId));

    dispatch({
      type: actionTypes.FETCH_DEPLOYMENT_OPERATORS_SUCCESS,
      configuredOperators,
    });
  } catch (error) {
    //TODO:
    // dispatch(experimentOperatorsDataLoaded());
    // dispatch(experimentsTabsDataLoaded());
    const errorMessage = error.message;
    dispatch({
      type: actionTypes.FETCH_DEPLOYMENT_OPERATORS_FAIL,
      errorMessage,
    });
    message.error(errorMessage);
  }
};

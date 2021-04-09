// UI LIB
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import tasksApi from 'services/TasksApi';
import datasetsApi from 'services/DatasetsApi';
import deploymentRunsApi from 'services/DeploymentRunsApi';
import deploymentsOperatorsApi from 'services/DeploymentsOperatorsApi';

// UTILS
import utils from 'utils';
import {
  deploymentOperatorsDataLoaded,
  deploymentOperatorsLoadingData,
  deploymentsTabsDataLoaded,
  deploymentsTabsLoadingData,
} from 'store/ui/actions';

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

  dispatch(deploymentOperatorsLoadingData());
  dispatch(deploymentsTabsLoadingData());

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

    // dispatch(fetchExperimentRunStatusRequest(projectId, experimentId));
    dispatch({
      type: actionTypes.FETCH_DEPLOYMENT_OPERATORS_SUCCESS,
      operators: configuredOperators,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.FETCH_DEPLOYMENT_OPERATORS_FAIL,
      errorMessage: e.message,
    });
    message.error(e.message);
  } finally {
    dispatch(deploymentOperatorsDataLoaded());
    dispatch(deploymentsTabsDataLoaded());
  }
};

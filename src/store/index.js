// CORE LIBS
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

// REDUCERS
import compareResultsReducer from './compareResults/compareResultsReducer';
import deploymentsReducer from './deployments/deploymentsReducer';
import deploymentOperatorReducer from './deployments/deploymentOperator/deploymentOperatorReducer';
import deploymentOperatorsReducer from './deployments/deploymentOperators/deploymentOperatorsReducer';
import deploymentRunsReducer from './deployments/deploymentRuns/deploymentRunsReducer';
import projectsReducer from './projects/projectsReducer';
import projectReducer from './project/projectReducer';
import projectDeploymentsReducer from './projectDeployments/projectDeploymentsReducer';
import experimentsReducer from './experiments/experimentsReducer';
import experimentRunReducer from './experiments/experimentRuns/experimentRunsReducer';
import operatorsReducer from './operators/operatorsReducer';
import operatorReducer from './operator/operatorReducer';
import tasksMenuReducer from './tasksMenu/tasksMenuReducer';
import templatesReducer from './templates/templatesReducer';
import tasksReducer from './tasks/tasksReducer';
import uiReducer from './ui/uiReducer';
import datasetReducer from './dataset/datasetReducer';
import datasetsReducer from './datasets/datasetsReducer';
import deploymentLogsReducer from './deploymentLogs/deploymentLogsReducer';
import testExperimentInferenceReducer from './testExperimentInference/testExperimentInferenceReducer';
import jupyterLabReducer from './jupyterLab/jupyterLabReducer';
import monitoringsReducer from './monitorings/monitoringsReducer';
import experimentLogsReducer from './experimentLogs/experimentLogsReducer';

// REDUX DEV TOOLS CONFIG
const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;

// COMBINED REDUCERS
const reducers = combineReducers({
  compareResultsReducer,
  deploymentsReducer,
  deploymentOperatorReducer,
  deploymentOperatorsReducer,
  deploymentRunsReducer,
  projectsReducer,
  projectReducer,
  projectDeploymentsReducer,
  experimentsReducer,
  experimentRunReducer,
  operatorsReducer,
  operatorReducer,
  tasksMenuReducer,
  templatesReducer,
  tasksReducer,
  uiReducer,
  datasetReducer,
  datasetsReducer,
  deploymentLogsReducer,
  testExperimentInferenceReducer,
  jupyterLabReducer,
  monitoringsReducer,
  experimentLogsReducer,
});

// STORE
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// EXPORT
export default store;

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import compareResultsReducer from './compareResults/compareResultsReducer';
import deploymentsReducer from './deployments/deploymentsReducer';
import deploymentOperatorReducer from './deployments/deploymentOperator/deploymentOperatorReducer';
import deploymentOperatorsReducer from './deployments/deploymentOperators/deploymentOperatorsReducer';
import deploymentRunsReducer from './deployments/deploymentRuns/deploymentRunsReducer';
import Projects from './projects';
import experimentRunReducer from './projects/experiments/experimentRuns/experimentRunsReducer';
import operatorsReducer from './operators/operatorsReducer';
import { operatorReducer } from './operator';
import tasksMenuReducer from './tasksMenu/tasksMenuReducer';
import templatesReducer from './templates/templatesReducer';
import uiReducer from './ui/uiReducer';
import datasetReducer from './dataset/datasetReducer';
import datasetsReducer from './datasets/datasetsReducer';
import deploymentLogsReducer from './deploymentLogs/deploymentLogsReducer';
import jupyterLabReducer from './jupyterLab/jupyterLabReducer';
import experimentLogsReducer from './experimentLogs/experimentLogsReducer';
import { tasksReducer } from './tasks';
import { loadingReducer } from './loading';
import { testDeploymentReducer } from './testDeployment';
import { monitoringsReducer } from './monitorings';

const reducers = combineReducers({
  compareResultsReducer,
  deploymentsReducer,
  deploymentOperatorReducer,
  deploymentOperatorsReducer,
  deploymentRunsReducer,
  Projects,
  experimentRunReducer,
  operatorsReducer,
  operatorReducer,
  tasksMenuReducer,
  templatesReducer,
  uiReducer,
  datasetReducer,
  datasetsReducer,
  deploymentLogsReducer,
  testDeploymentReducer,
  jupyterLabReducer,
  monitoringsReducer,
  experimentLogsReducer,
  tasksReducer,
  loadingReducer,
});

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;

export default createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import compareResultsReducer from './compareResults/compareResultsReducer';
import { deploymentsReducer } from './deployments';
import deploymentRunsReducer from './deployments/deploymentRuns/deploymentRunsReducer';
import Projects from './projects';
import experimentRunReducer from './projects/experiments/experimentRuns/experimentRunsReducer';
import { operatorsReducer } from './operators';
import { operatorReducer } from './operator';
import tasksMenuReducer from './tasksMenu/tasksMenuReducer';
import Templates from './templates';
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
  deploymentRunsReducer,
  Projects,
  experimentRunReducer,
  operatorsReducer,
  operatorReducer,
  tasksMenuReducer,
  Templates,
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

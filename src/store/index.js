// CORE LIBS
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

// REDUCERS
import compareResultsReducer from './compareResults/compareResultsReducer';
import deploymentsReducer from './deployments/deploymentsReducer';
import projectsReducer from './projects/projectsReducer';
import projectReducer from './project/projectReducer';
import experimentsReducer from './experiments/experimentsReducer';
import experimentReducer from './experiment/experimentReducer';
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
  projectsReducer,
  projectReducer,
  experimentsReducer,
  experimentReducer,
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
});

// STORE
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// EXPORT
export default store;

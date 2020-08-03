// CORE LIBS
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

// REDUCERS
import projectsReducer from './projects/projectsReducer';
import projectReducer from './project/projectReducer';
import experimentsReducer from './experiments/experimentsReducer';
import experimentReducer from './experiment/experimentReducer';
import operatorsReducer from './operators/operatorsReducer';
import operatorReducer from './operator/operatorReducer';
import componentsMenuReducer from './componentsMenu/componentsMenuReducer';
import templatesReducer from './templates/templatesReducer';
import implantedExperimentsReducer from './implantedExperiments/implantedExperimentsReducer';
import tasksReducer from './tasks/tasksReducer';
import uiReducer from './ui/uiReducer';
import datasetReducer from './dataset/datasetReducer';
import pipelinesReducer from './pipelines/pipelinesReducer';
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
  projectsReducer,
  projectReducer,
  experimentsReducer,
  experimentReducer,
  operatorsReducer,
  operatorReducer,
  componentsMenuReducer,
  templatesReducer,
  implantedExperimentsReducer,
  tasksReducer,
  uiReducer,
  datasetReducer,
  pipelinesReducer,
  deploymentLogsReducer,
  testExperimentInferenceReducer,
});

// STORE
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// EXPORT
export default store;

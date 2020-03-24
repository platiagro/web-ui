// CORE LIBS
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

// REDUCERS
import projects from './projects/reducer';
import project from './project/reducer';
import experiments from './experiments/reducer';
import experiment from './experiment/reducer';
import operators from './operators/reducer';
import componentsMenu from './componentsMenu/reducer';
import templates from './templates/reducer';
import components from './components/reducer';
import implantedExperiments from './implantedExperiments/reducer';
import tasks from './tasks/reducer';
import ui from './ui/reducer';
import dataset from './dataset/reducer';

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
  projects,
  project,
  experiments,
  experiment,
  operators,
  componentsMenu,
  templates,
  components,
  implantedExperiments,
  tasks,
  ui,
  dataset,
});

// STORE
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// EXPORT
export default store;

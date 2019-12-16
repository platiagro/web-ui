/**
 * Single reducing function to pass on createStore
 */
import { combineReducers } from 'redux';
import component from './componentReducer';
import components from './componentsReducer';
import project from './projectReducer';
import drawer from './drawerReducer';
import projects from './projectsReducer';
import experimentsTabs from './experimentsTabsReducer';
import experiment from './experimentReducer';

export default combineReducers({
  component,
  components,
  project,
  drawer,
  projects,
  experimentsTabs,
  experiment,
});

/**
 * Single reducing function to pass on createStore
 */
import { combineReducers } from 'redux';
import component from './componentReducer';
import components from './componentsReducer';
import project from './projectReducer';

export default combineReducers({
  component,
  components,
  project,
});

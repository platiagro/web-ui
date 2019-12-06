import { combineReducers } from 'redux';
import component from './componentReducer';
import components from './componentsReducer';

export default combineReducers({
  component,
  components,
});

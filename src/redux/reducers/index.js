import { combineReducers } from 'redux';
import auth from './auth';
import window from './window';

export default combineReducers({
  auth,
  window
});

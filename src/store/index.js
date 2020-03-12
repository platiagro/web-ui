// CORE LIBS
import { combineReducers, createStore } from 'redux';

// REDUCERS
import projects from './projects/reducer';

// COMBINED REDUCERS
const reducers = combineReducers({ projects });

// STORE
const store = createStore(reducers);

// EXPORT
export default store;

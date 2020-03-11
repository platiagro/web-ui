// CORE LIBS
import { combineReducers, createStore } from 'redux';

// REDUCERS
import projectsReducer from './projects/reducer';

// COMBINED REDUCERS
const reducers = combineReducers({ projectsReducer });

// STORE
const store = createStore(reducers);

// EXPORT
export default store;

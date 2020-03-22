// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = [];

/**
 * components reducer
 */
const components = (state = initialState, action) => {
  switch (action.type) {
    // SUCCESS
    // components
    // fetch components
    case actionTypes.FETCH_COMPONENTS_SUCCESS:
      return [...action.components];

    // FAIL
    // components
    // fetch components
    case actionTypes.FETCH_COMPONENTS_FAIL:
      return message.error(action.errorMessage);

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default components;

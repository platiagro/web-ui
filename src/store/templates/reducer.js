// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = [];

/**
 * templates reducer
 */
const templates = (state = initialState, action) => {
  switch (action.type) {
    // SUCCESS
    // templates
    // fetch templates success
    case actionTypes.FETCH_TEMPLATES_SUCCESS:
      return [...action.templates];

    // FAIL
    // templates
    // fetch templates fail
    case actionTypes.FETCH_TEMPLATES_FAIL:
      return message.error(action.errorMessage);

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default templates;

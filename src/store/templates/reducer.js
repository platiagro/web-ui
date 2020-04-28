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
    // create template success
    /*     case actionTypes.CREATE_TEMPLATE_SUCCESS:
      return [...action.templates]; */
    // set template success
    /*     case actionTypes.SET_TEMPLATE_SUCCESS:
      return [...action.templates]; */

    // FAIL
    // templates
    // fetch templates fail
    case actionTypes.FETCH_TEMPLATES_FAIL:
      return message.error(action.errorMessage);
    // create template fail
    case actionTypes.CREATE_TEMPLATE_FAIL:
      return message.error(action.errorMessage);
    // set template fail
    case actionTypes.SET_TEMPLATE_FAIL:
      return message.error(action.errorMessage);

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default templates;

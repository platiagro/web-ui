// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = [];

/**
 * templates reducer
 */
const templatesReducer = (state = initialState, action = undefined) => {
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
      return [...state];
    // create template fail
    case actionTypes.CREATE_TEMPLATE_FAIL:
      return [...state];
    // set template fail
    case actionTypes.SET_TEMPLATE_FAIL:
      return [...state];

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default templatesReducer;

// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = [];

/**
 * Templates reducer
 * 
 * @param state
 * @param action
 * 
 * @returns {Array} Templates list
 */
const templatesReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    // SUCCESS
    // fetch templates success
    case actionTypes.FETCH_TEMPLATES_SUCCESS:
      return [...action.templates];
    // create template success
    case actionTypes.CREATE_TEMPLATE_SUCCESS:
      return [...state, action.template];
    // update template succcess
    case actionTypes.UPDATE_TEMPLATE_SUCCESS:
      return [...action.templates];
    // delete template successs
    case actionTypes.DELETE_TEMPLATE_SUCCESS:
      return [...action.templates];

    // // // // // // //
    
    // FAIL
    // fetch templates fail
    case actionTypes.FETCH_TEMPLATES_FAIL:
      return [...state];
    // create template fail
    case actionTypes.CREATE_TEMPLATE_FAIL:
      return [...state];
    // update template fail
    case actionTypes.UPDATE_TEMPLATE_FAIL:
      return [...state];
    // delete template fail
    case actionTypes.DELETE_TEMPLATE_FAIL:
      return [...state];
    // set template fail
    case actionTypes.SET_TEMPLATE_FAIL:
      return [...state];
    
    // // // // // // //

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default templatesReducer;

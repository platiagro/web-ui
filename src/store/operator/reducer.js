// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = [];

/**
 * operators reducer
 */
const operators = (state = initialState, action) => {
  switch (action.type) {
    // SUCCESS
    // operators
    case actionTypes.FETCH_OPERATORS_SUCCESS:
      return [...action.operators];

    // operator
    case actionTypes.ADD_OPERATOR_SUCCESS:
      return [...action.operators];
    case actionTypes.REMOVE_OPERATOR_SUCCESS:
      return [...action.operators];
    case actionTypes.SET_OPERATOR_PARAMS_SUCCESS:
      return [...action.operators];

    // FAIL
    // operators
    case actionTypes.FETCH_OPERATORS_FAIL:
      return [...action.operators];

    // operator
    case actionTypes.ADD_OPERATOR_FAIL:
      return [...action.operators];
    case actionTypes.REMOVE_OPERATOR_FAIL:
      return [...action.operators];
    case actionTypes.SET_OPERATOR_PARAMS_FAIL:
      return [...action.operators];

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default operators;

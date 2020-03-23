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
    /*     case operatorActionTypes.SELECT_OPERATOR:
      return [...action.operators]; */

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default operators;

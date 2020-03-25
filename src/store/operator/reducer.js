// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  icon: '',
  name: '',
  position: 0,
  uuid: '',
  selected: false,
  params: {},
};

/**
 * operators reducer
 */
const operators = (state = initialState, action) => {
  switch (action.type) {
    // SUCCESS
    // operator
    case actionTypes.ADD_OPERATOR_SUCCESS:
      return [...action.operators];
    case actionTypes.REMOVE_OPERATOR_SUCCESS:
      return [...action.operators];
    case actionTypes.SET_OPERATOR_PARAMS_SUCCESS:
      return [...action.operators];

    // FAIL
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

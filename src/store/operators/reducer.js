// ACTION TYPES
import actionTypes from './actionTypes';
import operatorActionTypes from '../operator/actionTypes';
import uiActionTypes from '../ui/actionTypes';

// UTILS
import utils from '../../utils';

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

    // COMMON
    // operator
    case operatorActionTypes.SELECT_OPERATOR:
      return [...utils.selectOperator(action.operatorId, state)];

    // ui
    case uiActionTypes.HIDE_DRAWER:
      return [...utils.selectOperator(undefined, state)];

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default operators;

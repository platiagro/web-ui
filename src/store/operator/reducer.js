// UI LIBS
import { message } from 'antd';

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
 * operator reducer
 */
const operator = (state = initialState, action) => {
  switch (action.type) {
    // SUCCESS
    // operator
    // remove operator success
    case actionTypes.REMOVE_OPERATOR_SUCCESS:
      return message.success('Operador removido com sucesso!');
    // set operator params success
    case actionTypes.SET_OPERATOR_PARAMS_SUCCESS:
      return [...action.operator];

    // FAIL
    // operator
    // create operator fail
    case actionTypes.CREATE_OPERATOR_FAIL:
      return message.error(action.errorMessage);
    // remove operator fail
    case actionTypes.REMOVE_OPERATOR_FAIL:
      return message.error(action.errorMessage);
    // set operator params fail
    case actionTypes.SET_OPERATOR_PARAMS_FAIL:
      return message.error(action.errorMessage);

    // COMMON
    // operator
    case actionTypes.SELECT_OPERATOR:
      return { ...state, ...action.operator };

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default operator;

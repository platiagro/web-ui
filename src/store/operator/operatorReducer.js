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
  parameters: [],
  results: [],
  metrics: [],
  logs: [],
};

/**
 * operator reducer
 */
const operatorReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    //REQUEST INITIAL
    case actionTypes.GET_OPERATOR_METRICS_REQUEST:
      return { ...state, metrics: [] };
    // SUCCESS
    // operator
    // remove operator success
    case actionTypes.REMOVE_OPERATOR_SUCCESS:
      return message.success('Operador removido com sucesso!');
    // set operator params success
    case actionTypes.SET_OPERATOR_PARAMETERS_SUCCESS:
      return { ...state, ...action.operator };
    // get operator results success
    case actionTypes.GET_OPERATOR_RESULTS_SUCCESS:
      return { ...state, results: [...action.results] };
    case actionTypes.GET_OPERATOR_METRICS_SUCCESS:
      return { ...state, metrics: [...action.metrics] };
    case actionTypes.GET_OPERATOR_LOGS_SUCCESS:
      return { ...state, logs: [...action.logs] };

    // FAIL
    // operator
    // create operator fail
    case actionTypes.CREATE_OPERATOR_FAIL:
      return message.error(action.errorMessage);
    // remove operator fail
    case actionTypes.REMOVE_OPERATOR_FAIL:
      return message.error(action.errorMessage);
    // set operator params fail
    case actionTypes.SET_OPERATOR_PARAMETERS_FAIL:
      return message.error(action.errorMessage);
    // get operator results fail
    case actionTypes.GET_OPERATOR_RESULTS_FAIL:
      message.error(action.errorMessage);
      return { ...state, results: [] };
    case actionTypes.GET_OPERATOR_METRICS_FAIL:
      return { ...state, metrics: [] };
    case actionTypes.GET_OPERATOR_LOGS_FAIL:
      message.error(action.errorMessage);
      return { ...state, logs: [] };

    // COMMON
    // operator
    case actionTypes.SELECT_OPERATOR:
      return { ...state, ...action.operator };
    case actionTypes.DESELECT_OPERATOR:
      return initialState;

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default operatorReducer;

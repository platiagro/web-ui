// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';
import operatorActionTypes from '../operator/actionTypes';
import uiActionTypes from '../ui/actionTypes';
import pipelinesActionTypes from '../pipelines/actionTypes';

// UTILS
import utils from '../../utils';

// INITIAL STATE
const initialState = [];

/**
 * operators reducer
 */
const operatorsReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    // SUCCESS
    // operators
    // fetch operators success
    case actionTypes.FETCH_OPERATORS_SUCCESS:
      return [...action.operators];

    // operator
    // create operator success
    case operatorActionTypes.CREATE_OPERATOR_SUCCESS:
      return [...state, action.operator];
    // set operator parameter success
    case operatorActionTypes.SET_OPERATOR_PARAMETERS_SUCCESS:
      return state.map((operator) =>
        operator.uuid === action.operator.uuid
          ? { ...action.operator }
          : { ...operator }
      );

    // pipelines
    // get training experiment status
    case pipelinesActionTypes.GET_TRAIN_EXPERIMENT_STATUS_SUCCESS:
      return state.map((operator) => ({
        ...operator,
        status:
          operator.uuid === 'dataset'
            ? 'Succeeded'
            : action.status[operator.uuid]
            ? action.status[operator.uuid]
            : action.experimentIsRunning
            ? 'Pending'
            : '',
      }));
    // train experiment success
    case pipelinesActionTypes.TRAIN_EXPERIMENT_SUCCESS:
      return state.map((operator) => ({
        ...operator,
        status: operator.uuid === 'dataset' ? 'Succeeded' : 'Pending',
      }));

    // FAIL
    // operators
    // fetch operators fail
    case actionTypes.FETCH_OPERATORS_FAIL:
      message.error(action.errorMessage);
      return [];

    // COMMON
    // operator
    // select operator
    case operatorActionTypes.SELECT_OPERATOR:
      return [...utils.selectOperator(action.operator.uuid, state)];
    // deselect operator
    case operatorActionTypes.DESELECT_OPERATOR:
      return [...utils.selectOperator(null, state)];

    // ui
    // hide drawer
    case uiActionTypes.HIDE_DRAWER:
      return [...utils.selectOperator(undefined, state)];

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default operatorsReducer;

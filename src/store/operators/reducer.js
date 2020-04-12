// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';
import operatorActionTypes from '../operator/actionTypes';
import uiActionTypes from '../ui/actionTypes';
import experimentActionTypes from '../experiment/actionTypes';
import pipelinesActionTypes from '../pipelines/actionTypes';

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
    // fetch operators success
    case actionTypes.FETCH_OPERATORS_SUCCESS:
      return [...action.operators];

    // operator
    // create operator success
    case operatorActionTypes.CREATE_OPERATOR_SUCCESS:
      return [...state, action.operator];
    // remove operator success
    case operatorActionTypes.REMOVE_OPERATOR_SUCCESS:
      return [
        ...state.filter((operator) => operator.uuid !== action.operatorId),
      ];

    // experiment
    // set dataset success
    case experimentActionTypes.SET_DATASET_SUCCESS:
      return [
        ...state.map((operator) =>
          operator.uuid === 'dataset'
            ? {
                ...operator,
                params: {
                  ...operator.params,
                  dataset: action.experiment.dataset,
                },
              }
            : operator
        ),
      ];

    // pipelines
    // get training experiment status
    case pipelinesActionTypes.GET_TRAIN_EXPERIMENT_STATUS_SUCCESS:
      return state.map((operator) => ({
        ...operator,
        status: action.status[operator.uuid],
      }));

    // FAIL
    // operators
    // fetch operators fail
    case actionTypes.FETCH_OPERATORS_FAIL:
      return message.error(action.errorMessage);

    // COMMON
    // operator
    // select operator
    case operatorActionTypes.SELECT_OPERATOR:
      return [...utils.selectOperator(action.operator.uuid, state)];

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
export default operators;

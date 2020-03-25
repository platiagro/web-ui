// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';
import operatorActionTypes from '../operator/actionTypes';
import uiActionTypes from '../ui/actionTypes';
import experimentActionTypes from '../experiment/actionTypes';

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

    // FAIL
    // operators
    // fetch operators fail
    case actionTypes.FETCH_OPERATORS_FAIL:
      return message.error(action.errorMessage);

    // COMMON
    // operator
    // select operator
    case operatorActionTypes.SELECT_OPERATOR:
      return [...utils.selectOperator(action.operatorId, state)];

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

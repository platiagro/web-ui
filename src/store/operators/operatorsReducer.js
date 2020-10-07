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
    //INIT FETCH
    case actionTypes.FETCH_OPERATORS_REQUEST:
      return [...initialState];
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
      let isTerminated = false;
      return state.map((operator) => {
        const operatorLatestTraining =
          action.operatorsLatestTraining[operator.uuid];

        // get the operator status
        let status = '';
        if (isTerminated) {
          status = 'Terminated';
        } else if (operatorLatestTraining) {
          status = operatorLatestTraining.status;
        } else if (action.experimentIsRunning) {
          status = 'Pending';
        }

        // necessary this flag to set all operator the status Terminated
        // because the backend not send all operator status when pipeline is interrupted
        if (!isTerminated && status === 'Terminated') {
          isTerminated = true;
        }

        return {
          ...operator,
          status,
          parametersLatestTraining: operatorLatestTraining
            ? operatorLatestTraining.parameters
            : null,
          experimentIsRunning: action.experimentIsRunning,
          interruptIsRunning: action.interruptIsRunning,
        };
      });
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
      return [...state];

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
    case uiActionTypes.HIDE_OPERATOR_DRAWER:
      return [...utils.selectOperator(undefined, state)];

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default operatorsReducer;

// ACTION TYPES
import * as OPERATORS_TYPES from './operators.actionTypes';
import { OPERATOR_TYPES } from 'store/operator';
import uiActionTypes from '../ui/actionTypes';
import experimentRunsActionTypes from '../projects/experiments/experimentRuns/actionTypes';

// UTILS
import utils from 'utils';

// INITIAL STATE
const initialState = [];

/**
 * operators reducer
 *
 * @param state
 * @param action
 */
export const operatorsReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case OPERATORS_TYPES.FETCH_OPERATORS_REQUEST:
      return [...initialState];
    case OPERATORS_TYPES.FETCH_OPERATORS_SUCCESS:
      return [...action.operators];
    case OPERATORS_TYPES.FETCH_OPERATORS_FAIL:
      return [...state];
    case OPERATORS_TYPES.UPDATE_OPERATOR_DEPENDENCIES:
      return [...action.operators];
    case OPERATORS_TYPES.UPDATE_OPERATORS_OPTIONS:
      return state.map((operator) => {
        const featureOptions = utils.transformColumnsInParameterOptions(
          action.columns
        );
        let paramUpdated = false;
        for (const param of operator.parameters) {
          if (param.type === 'feature') {
            param.options = featureOptions;
            param.value = param.multiple ? [] : null;
            paramUpdated = true;
          }
        }
        if (paramUpdated) {
          operator.settedUp = false;
        }
        return { ...operator };
      });

    // operator
    case OPERATOR_TYPES.CREATE_OPERATOR_SUCCESS:
      return [...state, action.operator];
    case OPERATOR_TYPES.DESELECT_OPERATOR:
      return [...utils.selectOperator(null, state)];
    case OPERATOR_TYPES.SELECT_OPERATOR:
      return [...utils.selectOperator(action.operator.uuid, state)];
    case OPERATOR_TYPES.UPDATE_OPERATOR_SUCCESS:
      return state.map((operator) =>
        operator.uuid === action.operator.uuid
          ? { ...action.operator }
          : { ...operator }
      );

    // get experiment run status
    case experimentRunsActionTypes.GET_EXPERIMENT_RUN_STATUS_SUCCESS: {
      let isTerminated = false;
      return state.map((operator) => {
        const operatorLatestTraining = action.operatorsLatestTraining.find(
          (operator_) => {
            return operator_.uuid === operator.uuid;
          }
        );

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
          statusMessage: operatorLatestTraining.statusMessage,
          parametersLatestTraining: operatorLatestTraining
            ? operatorLatestTraining.parameters
            : null,
          experimentIsRunning: action.experimentIsRunning,
          interruptIsRunning: action.interruptIsRunning,
        };
      });
    }
    // train experiment success
    case experimentRunsActionTypes.CREATE_EXPERIMENT_RUN_SUCCESS:
      return state.map((operator) => ({
        ...operator,
        status: operator.uuid === 'dataset' ? 'Succeeded' : 'Pending',
      }));

    // ui
    case uiActionTypes.HIDE_OPERATOR_DRAWER:
      return [...utils.selectOperator(undefined, state)];

    // DEFAULT
    default:
      return state;
  }
};

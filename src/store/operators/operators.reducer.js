// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global OperatorsStore */
// ACTION TYPES
import * as OPERATORS_TYPES from './operators.actionTypes';
import { OPERATOR_TYPES } from 'store/operator';
import uiActionTypes from '../ui/actionTypes';
import experimentRunsActionTypes from '../projects/experiments/experimentRuns/actionTypes';

// UTILS
import utils from 'utils';

/** @type {OperatorsStore} */
const initialState = [];

/**
 * Operators reducer
 *
 * @param {object} state Current State
 * @param {object} action Action
 * @returns {object} New state
 */
export const operatorsReducer = (state = initialState, action = undefined) => {
  const { type, payload } = action;

  switch (type) {
    case OPERATORS_TYPES.FETCH_OPERATORS_SUCCESS:
      return [...payload.operators];
    case OPERATORS_TYPES.UPDATE_OPERATOR_DEPENDENCIES:
      return [...payload.operators];
    case OPERATORS_TYPES.UPDATE_OPERATORS_OPTIONS:
      return [...payload.operators];

    // operator
    case OPERATOR_TYPES.CREATE_OPERATOR_SUCCESS:
      return [...state, payload.operator];
    case OPERATOR_TYPES.DESELECT_OPERATOR:
      return [...utils.selectOperator(null, state)];
    case OPERATOR_TYPES.SELECT_OPERATOR:
      return [...utils.selectOperator(action.operator.uuid, state)];
    case OPERATOR_TYPES.UPDATE_OPERATOR_SUCCESS:
      return [...payload.operators];

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

        const validParametersLatestTraining = operatorLatestTraining
          ? operatorLatestTraining.parameters
          : null;

        return {
          ...operator,
          status,
          statusMessage: operatorLatestTraining.statusMessage,
          parametersLatestTraining: validParametersLatestTraining,
          experimentIsRunning: action.experimentIsRunning,
          interruptIsRunning: action.interruptIsRunning,
        };
      });
    }
    // train experiment success
    case experimentRunsActionTypes.CREATE_EXPERIMENT_RUN_SUCCESS:
      return [...payload.operators];

    // ui
    case uiActionTypes.HIDE_OPERATOR_DRAWER:
      return [...utils.selectOperator(undefined, state)];

    case OPERATORS_TYPES.CLEAR_ALL_DEPLOYMENT_OPERATORS:
      return [];

    // DEFAULT
    default:
      return state;
  }
};

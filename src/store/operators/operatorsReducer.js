// ACTION TYPES
import actionTypes from './actionTypes';
import operatorActionTypes from '../operator/actionTypes';
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
const operatorsReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case actionTypes.FETCH_OPERATORS_REQUEST:
      return [...initialState];
    case actionTypes.FETCH_OPERATORS_SUCCESS:
      return [...action.operators];
    case actionTypes.FETCH_OPERATORS_FAIL:
      return [...state];
    case actionTypes.UPDATE_OPERATOR_DEPENDENCIES:
      return [...action.operators];
    case actionTypes.UPDATE_OPERATORS_OPTIONS:
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
    case operatorActionTypes.CREATE_OPERATOR_SUCCESS:
      return [...state, action.operator];
    case operatorActionTypes.DESELECT_OPERATOR:
      return [...utils.selectOperator(null, state)];
    case operatorActionTypes.SELECT_OPERATOR:
      return [...utils.selectOperator(action.operator.uuid, state)];
    case operatorActionTypes.SET_OPERATOR_PARAMETERS_SUCCESS:
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

// EXPORT
export default operatorsReducer;

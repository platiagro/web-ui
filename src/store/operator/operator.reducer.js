// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global OperatorStore */
import * as OPERATOR_TYPES from './operator.actionTypes';

/** @type {OperatorStore} */
const initialState = {
  icon: '',
  name: '',
  position: 0,
  uuid: '',
  selected: false,
  dataset: null,
  figures: [],
  logs: [],
  parameters: [],
};

/**
 * Operator reducer
 *
 * @param {object} state Current State
 * @param {object} action Action
 * @returns {object} New state
 */
export const operatorReducer = (state = initialState, action = undefined) => {
  const { type, payload } = action;

  switch (type) {
    case OPERATOR_TYPES.GET_OPERATOR_METRICS_REQUEST:
      return { ...state, metrics: [] };

    case OPERATOR_TYPES.SELECT_OPERATOR:
      return { ...state, ...action.operator };

    case OPERATOR_TYPES.DESELECT_OPERATOR:
      return initialState;

    case OPERATOR_TYPES.UPDATE_OPERATOR_SUCCESS:
      return { ...state, ...payload.operator };

    case OPERATOR_TYPES.DOWNLOAD_OPERATOR_DATASET_RESULT_SUCCESS:
      return { ...state, downloadDataset: [...action.downloadDataset] };

    case OPERATOR_TYPES.GET_OPERATOR_DATASET_RESULT_SUCCESS:
      return { ...state, dataset: { ...action.result } };

    case OPERATOR_TYPES.GET_OPERATOR_FIGURES_SUCCESS:
      return { ...state, figures: [...action.results] };

    case OPERATOR_TYPES.GET_OPERATOR_METRICS_SUCCESS:
      return { ...state, metrics: [...action.metrics] };

    case OPERATOR_TYPES.GET_OPERATOR_LOGS_SUCCESS:
      return { ...state, logs: [...action.logs] };

    case OPERATOR_TYPES.GET_OPERATOR_DATASET_RESULT_FAIL:
      return { ...state, dataset: null };

    case OPERATOR_TYPES.GET_OPERATOR_FIGURES_FAIL:
      return { ...state, figures: [] };

    case OPERATOR_TYPES.GET_OPERATOR_METRICS_FAIL:
      return { ...state, metrics: [] };

    case OPERATOR_TYPES.GET_OPERATOR_LOGS_FAIL:
      return { ...state, logs: action.logs };

    case OPERATOR_TYPES.RENAME_EXPERIMENT_OPERATOR_SUCCESS:
    case OPERATOR_TYPES.RENAME_DEPLOYMENT_OPERATOR_SUCCESS:
      return { ...state, name: action.newName };

    default:
      return state;
  }
};

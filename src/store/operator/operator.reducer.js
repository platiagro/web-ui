import * as OPERATOR_TYPES from './operator.actionTypes';

// INITIAL STATE
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
 * operator reducer
 *
 * @param state
 * @param action
 */
export const operatorReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case OPERATOR_TYPES.GET_OPERATOR_METRICS_REQUEST:
      return { ...state, metrics: [] };
    case OPERATOR_TYPES.SELECT_OPERATOR:
      return { ...state, ...action.operator };
    case OPERATOR_TYPES.DESELECT_OPERATOR:
      return initialState;

    // SUCCESS
    case OPERATOR_TYPES.UPDATE_OPERATOR_SUCCESS:
      return { ...state, ...action.operator };
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

    // FAIL
    case OPERATOR_TYPES.CREATE_OPERATOR_FAIL:
      return { ...state };
    case OPERATOR_TYPES.REMOVE_OPERATOR_FAIL:
      return { ...state };
    case OPERATOR_TYPES.UPDATE_OPERATOR_FAIL:
      return { ...state };
    case OPERATOR_TYPES.GET_OPERATOR_DATASET_RESULT_FAIL:
      return { ...state, dataset: null };
    case OPERATOR_TYPES.GET_OPERATOR_FIGURES_FAIL:
      return { ...state, figures: [] };
    case OPERATOR_TYPES.GET_OPERATOR_METRICS_FAIL:
      return { ...state, metrics: [] };
    case OPERATOR_TYPES.GET_OPERATOR_LOGS_FAIL:
      return { ...state, logs: action.logs };

    // DEFAULT
    default:
      return state;
  }
};

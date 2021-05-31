// ACTION TYPES
import actionTypes from './actionTypes';

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
const operatorReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case actionTypes.SELECT_OPERATOR:
      return { ...state, ...action.operator };
    case actionTypes.DESELECT_OPERATOR:
      return initialState;

    // SUCCESS
    case actionTypes.SET_OPERATOR_PARAMETERS_SUCCESS:
      return { ...state, ...action.operator };
    case actionTypes.DOWNLOAD_OPERATOR_DATASET_RESULT_SUCCESS:
      return { ...state, downloadDataset: [...action.downloadDataset] };
    case actionTypes.GET_OPERATOR_DATASET_RESULT_SUCCESS:
      return { ...state, dataset: { ...action.result } };
    case actionTypes.GET_OPERATOR_FIGURES_SUCCESS:
      return { ...state, figures: [...action.results] };
    case actionTypes.GET_OPERATOR_LOGS_SUCCESS:
      return { ...state, logs: [...action.logs] };

    // FAIL
    case actionTypes.CREATE_OPERATOR_FAIL:
      return { ...state };
    case actionTypes.REMOVE_OPERATOR_FAIL:
      return { ...state };
    case actionTypes.SET_OPERATOR_PARAMETERS_FAIL:
      return { ...state };
    case actionTypes.GET_OPERATOR_DATASET_RESULT_FAIL:
      return { ...state, dataset: null };
    case actionTypes.GET_OPERATOR_FIGURES_FAIL:
      return { ...state, figures: [] };
    case actionTypes.GET_OPERATOR_LOGS_FAIL:
      return { ...state, logs: action.logs };

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default operatorReducer;

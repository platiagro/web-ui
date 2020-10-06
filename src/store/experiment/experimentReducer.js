// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  createdAt: '',
  name: '',
  operators: [],
  position: 0,
  projectId: '',
  updatedAt: '',
  succeeded: false,
  uuid: '',
  deployStatus: '',
};

/**
 * experiment reducer
 */
const experimentReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    // SUCCESS
    // experiment
    case actionTypes.FETCH_EXPERIMENT_SUCCESS:
      return { ...state, ...action.experiment };
    case actionTypes.EDIT_EXPERIMENT_NAME_SUCCESS:
      return { ...state, ...action.experiment };
    case actionTypes.CREATE_EXPERIMENT_SUCCESS:
      return { ...state, ...action.experiment };
    case actionTypes.DELETE_EXPERIMENT_SUCCESS:
      return { ...state };
    case actionTypes.FETCH_EXPERIMENT_DEPLOY_STATUS_SUCCESS:
      return { ...state, deployStatus: action.status };

    // FAIL
    // experiment
    case actionTypes.FETCH_EXPERIMENT_FAIL:
    case actionTypes.DELETE_EXPERIMENT_FAIL:
      return { ...state };
    case actionTypes.FETCH_EXPERIMENT_DEPLOY_STATUS_FAIL:
      return { ...state, deployStatus: '' };

    // COMMON
    case actionTypes.TRAINING_EXPERIMENT_SUCCEEDED:
      return { ...state, succeeded: true };
    case actionTypes.TRAINING_EXPERIMENT_NOT_SUCCEEDED:
      return { ...state, succeeded: false };

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default experimentReducer;

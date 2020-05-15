// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  createdAt: '',
  dataset: '',
  name: '',
  operators: [],
  position: 0,
  projectId: '',
  target: '',
  updatedAt: '',
  succeeded: false,
  uuid: '',
};

/**
 * experiment reducer
 */
const experiment = (state = initialState, action) => {
  switch (action.type) {
    // SUCCESS
    // experiment
    case actionTypes.FETCH_EXPERIMENT_SUCCESS:
      return { ...state, ...action.experiment };
    case actionTypes.EDIT_EXPERIMENT_NAME_SUCCESS:
      return { ...state, ...action.experiment };
    case actionTypes.CREATE_EXPERIMENT_SUCCESS:
      message.info(`Experimento ${action.experiment.name} criado!`);
      return { ...state, ...action.experiment };
    case actionTypes.DELETE_EXPERIMENT_SUCCESS:
      message.info(`Experimento excluído!`);
      return initialState;
    case actionTypes.SET_DATASET_SUCCESS:
      return { ...state, ...action.experiment };
    case actionTypes.SET_TARGET_COLUMN_SUCCESS:
      return { ...state, ...action.experiment };

    // FAIL
    // experiment
    case actionTypes.FETCH_EXPERIMENT_FAIL:
      return message.error(action.errorMessage);
    case actionTypes.EDIT_EXPERIMENT_NAME_FAIL:
      return message.error(action.errorMessage);
    case actionTypes.CREATE_EXPERIMENT_FAIL:
      return message.error(action.errorMessage);
    case actionTypes.DELETE_EXPERIMENT_FAIL:
      return message.error(action.errorMessage);
    case actionTypes.SET_DATASET_FAIL:
      return message.error(action.errorMessage);
    case actionTypes.SET_TARGET_COLUMN_FAIL:
      return message.error(action.errorMessage);

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
export default experiment;

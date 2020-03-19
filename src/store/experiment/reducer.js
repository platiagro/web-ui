// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  createdAt: null,
  dataset: null,
  name: '',
  operators: null,
  position: null,
  projectId: null,
  target: null,
  updatedAt: null,
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
      return action.experiment;
    case actionTypes.EDIT_EXPERIMENT_NAME_SUCCESS:
      return action.experiment;
    case actionTypes.TRAIN_EXPERIMENT_SUCCESS:
      return action.experiment;
    case actionTypes.DEPLOY_EXPERIMENT_SUCCESS:
      return action.experiment;
    case actionTypes.CREATE_EXPERIMENT_SUCCESS:
      message.info(`Experimento ${action.experiment.name} criado!`);
      return action.experiment;
    case actionTypes.DELETE_EXPERIMENT_SUCCESS:
      return message.info(`Experimento excluído!`);

    // FAIL
    // experiment
    case actionTypes.FETCH_EXPERIMENT_FAIL:
      return message.error(action.errorMessage);
    case actionTypes.EDIT_EXPERIMENT_NAME_FAIL:
      return message.error(action.errorMessage);
    case actionTypes.TRAIN_EXPERIMENT_FAIL:
      return message.error(action.errorMessage);
    case actionTypes.DEPLOY_EXPERIMENT_FAIL:
      return message.error(action.errorMessage);
    case actionTypes.CREATE_EXPERIMENT_FAIL:
      return message.error(action.errorMessage);
    case actionTypes.DELETE_EXPERIMENT_FAIL:
      return message.error(action.errorMessage);

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default experiment;

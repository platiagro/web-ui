// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = null;

/**
 * pipelines reducer
 */
const pipelinesReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    // SUCCESS
    // pipelines
    // train experiment success
    case actionTypes.TRAIN_EXPERIMENT_SUCCESS:
      message.success('Treinamento iniciado!');
      return state;
    // deploy experiment success
    case actionTypes.DEPLOY_EXPERIMENT_SUCCESS:
      message.success('Experimento implantado!');
      return state;

    // FAIL
    // pipelines
    // train experiment fail
    case actionTypes.TRAIN_EXPERIMENT_FAIL:
      return message.error(action.errorMessage);
    // get train experiment status fail
    case actionTypes.GET_TRAIN_EXPERIMENT_FAIL:
      return message.error(action.errorMessage);
    // deploy experiment fail
    case actionTypes.DEPLOY_EXPERIMENT_FAIL:
      return message.error(action.errorMessage);

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default pipelinesReducer;

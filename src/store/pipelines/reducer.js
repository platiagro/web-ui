// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = null;

/**
 * pipelines reducer
 */
const pipelines = (state = initialState, action) => {
  switch (action.type) {
    // SUCCESS
    // pipelines
    // train experiment success
    case actionTypes.TRAIN_EXPERIMENT_SUCCESS:
      return message.info('Treinamento iniciado!');

    // FAIL
    // pipelines
    // train experiment fail
    case actionTypes.TRAIN_EXPERIMENT_FAIL:
      return message.error(action.errorMessage);

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default pipelines;

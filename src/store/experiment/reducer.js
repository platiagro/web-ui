// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  title: null,
  key: null,
  running: false,
  deployed: false,
  position: 0,
  uuid: null,
};

/**
 * experiment reducer
 */
const experiment = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EXPERIMENT:
      return action.experiment;
    case actionTypes.EDIT_EXPERIMENT_NAME:
      return action.experiment;
    case actionTypes.TRAIN_EXPERIMENT:
      return action.experiment;
    case actionTypes.DEPLOY_EXPERIMENT:
      return action.experiment;
    default:
      return state;
  }
};

// EXPORT
export default experiment;

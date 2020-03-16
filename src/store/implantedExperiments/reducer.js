// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = [];

/**
 * implanted experiments reducer
 */
const implantedExperiments = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_IMPLANTED_EXPERIMENTS:
      return action.project;
    case actionTypes.TEST_IMPLANTED_EXPERIMENT_INFERENCE:
      return action.project;
    case actionTypes.DELETE_IMPLANTED_EXPERIMENT:
      return action.project;
    default:
      return state;
  }
};

// EXPORT
export default implantedExperiments;

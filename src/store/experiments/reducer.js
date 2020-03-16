// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = [];

/**
 * experiments reducer
 */
const experiments = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EXPERIMENTS:
      return action.experiments;
    case actionTypes.ORGANIZE_EXPERIMENTS:
      return action.experiments;
    default:
      return state;
  }
};

// EXPORT
export default experiments;

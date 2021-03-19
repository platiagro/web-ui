// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  healthy: false,
};

/**
 * Jupyter Lab reducer
 *
 * @param state
 * @param action
 */
const jupyterLabReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    // JUPYTER LAB
    case actionTypes.JUPYTER_LAB_HEALTHY:
    case actionTypes.JUPYTER_LAB_UNHEALTHY:
      return {
        ...state,
        healthy: action.healthy,
      };

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default jupyterLabReducer;

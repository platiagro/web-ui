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
      return {
        ...state,
        healthy: true,
      };
    case actionTypes.JUPYTER_LAB_UNHEALTHY:
      return {
        ...state,
        healthy: false,
      };

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default jupyterLabReducer;

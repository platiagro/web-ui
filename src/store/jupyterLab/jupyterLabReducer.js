import actionTypes from './actionTypes';

const initialState = {
  healthy: false,
};

const jupyterLabReducer = (state = initialState, action = {}) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default jupyterLabReducer;

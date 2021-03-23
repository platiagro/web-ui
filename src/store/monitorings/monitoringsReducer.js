import actionTypes from './actionTypes';

const initialState = {
  monitorings: [],
};

/**
 * Monitorings reducer
 *
 * @param {object} state Current State
 * @param {object} action Action
 * @returns {object} New state
 */
const monitoringsReducer = (state = initialState, action = {}) => {
  const { type, payload } = action

  switch (type) {
    case actionTypes.FETCH_MONITORINGS_SUCCESS: {
      return {
        ...state,
        monitorings: payload.monitorings,
      }
    }

    case actionTypes.FETCH_MONITORINGS_FAIL: {
      return {
        ...state,
        monitorings: [],
      }
    }

    default:
      return state;
  }
};

export default monitoringsReducer;

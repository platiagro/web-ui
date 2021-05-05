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
  const { type, payload } = action;

  switch (type) {
    case actionTypes.FETCH_MONITORINGS_SUCCESS: {
      return {
        ...state,
        monitorings: payload.monitorings,
      };
    }

    case actionTypes.FETCH_MONITORINGS_FAIL: {
      return {
        ...state,
        monitorings: [],
      };
    }

    case actionTypes.CREATE_MONITORINGS_SUCCESS: {
      return {
        ...state,
        monitorings: [...state.monitorings, ...payload.monitorings],
      };
    }

    case actionTypes.DELETE_MONITORINGS_SUCCESS: {
      const monitoringsClone = [...state.monitorings];
      const indexToDelete = monitoringsClone.findIndex((monitoring) => {
        return monitoring.uuid === payload.monitoringId;
      });

      // Remove item from array
      monitoringsClone.splice(indexToDelete, 1);

      return {
        ...state,
        monitorings: monitoringsClone,
      };
    }

    case actionTypes.CLEAR_ALL_MONITORINGS: {
      return {
        ...state,
        monitorings: [],
      };
    }

    default:
      return state;
  }
};

export default monitoringsReducer;

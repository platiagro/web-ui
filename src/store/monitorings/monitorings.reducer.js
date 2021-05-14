import * as MONITORINGS_TYPES from './monitorings.actionTypes';

export const initialState = {
  monitorings: [],
  figures: {},
};

/**
 * Monitorings reducer
 *
 * @param {object} state Current State
 * @param {object} action Action
 * @returns {object} New state
 */
export const monitoringsReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case MONITORINGS_TYPES.FETCH_MONITORINGS_SUCCESS: {
      return {
        ...state,
        monitorings: payload.monitorings,
      };
    }

    case MONITORINGS_TYPES.CLEAR_ALL_MONITORINGS:
    case MONITORINGS_TYPES.FETCH_MONITORINGS_FAIL: {
      return {
        ...state,
        monitorings: [],
      };
    }

    case MONITORINGS_TYPES.CREATE_MONITORINGS_SUCCESS: {
      return {
        ...state,
        monitorings: [...state.monitorings, ...payload.monitorings],
      };
    }

    case MONITORINGS_TYPES.DELETE_MONITORINGS_SUCCESS: {
      const monitoringsClone = [...state.monitorings];
      const indexToDelete = monitoringsClone.findIndex((monitoring) => {
        return monitoring.uuid === payload.monitoringId;
      });

      monitoringsClone.splice(indexToDelete, 1);

      return {
        ...state,
        monitorings: monitoringsClone,
      };
    }

    case MONITORINGS_TYPES.FETCH_MONITORING_FIGURES_SUCCESS: {
      return {
        ...state,
        figures: {
          ...state.figures,
          [payload.monitoringId]: payload.figures,
        },
      };
    }

    default:
      return state;
  }
};

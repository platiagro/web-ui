import actionTypes from './actionTypes';

const initialState = {
  monitorings: [],
};

const monitoringReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case actionTypes.CREATE_MONITORING_SUCCESS:
      return {
        ...state,
        monitorings: [...state.monitorings, action.GET_MONITORING_REQUEST],
      };
    case actionTypes.DELETE_MONITORING_SUCCESS:
      return {
        ...state,
        monitorings: [...state.monitorings, action.GET_MONITORING_REQUEST],
      };
    case actionTypes.UPDATE_MONITORING_SUCCESS:
      return {
        ...state,
        monitorings: [...state.monitorings, action.GET_MONITORING_REQUEST],
      };
    default:
      return state;
  }
};

// EXPORT
export default monitoringReducer;

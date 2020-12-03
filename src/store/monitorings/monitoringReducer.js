import actionTypes from './actionTypes';

const initialState = [];

const monitoringReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case actionTypes.CREATE_MONITORINGS_SUCCESS:
    case actionTypes.DELETE_MONITORINGS_SUCCESS:
    case actionTypes.UPDATE_MONITORINGS_SUCCESS:
      return [...action.monitorings];
    default:
      return state;
  }
};

// EXPORT
export default monitoringReducer;

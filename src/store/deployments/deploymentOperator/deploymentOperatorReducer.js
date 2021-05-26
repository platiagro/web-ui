// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  icon: '',
  name: '',
  position: 0,
  uuid: '',
  selected: false,
  dataset: null,
  figures: [],
  logs: [],
  parameters: [],
};

const deploymentOperatorReducer = (
  state = initialState,
  action = undefined
) => {
  switch (action.type) {
    case actionTypes.SET_OPERATOR_PARAMETERS_SUCCESS:
      return { ...state, ...action.operator };

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default deploymentOperatorReducer;

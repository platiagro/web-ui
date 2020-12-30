// ACTION TYPES
import actionTypes from './actionTypes';
import deploymentOperatorActionTypes from 'store/deployments/deploymentOperator/actionTypes';

// UTILS
import utils from 'utils';

// INITIAL STATE
const initialState = [];

const deploymentOperatorsReducer = (
  state = initialState,
  action = undefined
) => {
  switch (action.type) {
    case actionTypes.FETCH_DEPLOYMENT_OPERATORS_REQUEST:
      return [...initialState];
    case actionTypes.FETCH_DEPLOYMENT_OPERATORS_SUCCESS:
      return [...action.operators];

    // operator
    case deploymentOperatorActionTypes.CREATE_DEPLOYMENT_OPERATOR_SUCCESS:
      return [...state, action.operator];
    case deploymentOperatorActionTypes.SET_DEPLOYMENT_OPERATOR_PARAMETERS_SUCCESS:
      return state.map((operator) =>
        operator.uuid === action.operator.uuid
          ? { ...action.operator }
          : { ...operator }
      );

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default deploymentOperatorsReducer;

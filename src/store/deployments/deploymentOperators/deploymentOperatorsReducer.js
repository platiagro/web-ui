import actionTypes from './actionTypes';
import deploymentOperatorActionTypes from 'store/deployments/deploymentOperator/actionTypes';

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

    case deploymentOperatorActionTypes.CREATE_DEPLOYMENT_OPERATOR_SUCCESS:
      return [...state, action.operator];

    case deploymentOperatorActionTypes.SET_DEPLOYMENT_OPERATOR_PARAMETERS_SUCCESS:
      return state.map((operator) =>
        operator.uuid === action.operator.uuid
          ? { ...action.operator }
          : { ...operator }
      );

    case actionTypes.CLEAR_ALL_DEPLOYMENT_OPERATORS:
      return [];

    default:
      return state;
  }
};

export default deploymentOperatorsReducer;

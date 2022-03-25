import * as DEPLOYMENTS_TYPES from './deployments.actionTypes';

export const initialState = [];

/**
 * deployments reducer
 *
 * @param {Array} state The State
 * @param {object} action The Action
 * @returns {Array} Deployments list
 */
export const deploymentsReducer = (
  state = initialState,
  action = undefined
) => {
  switch (action.type) {
    case DEPLOYMENTS_TYPES.CLEAR_ALL_DEPLOYMENTS:
      return [];

    case DEPLOYMENTS_TYPES.FETCH_DEPLOYMENTS_SUCCESS:
      return action.deployments;

    case DEPLOYMENTS_TYPES.DUPLICATE_DEPLOYMENT_SUCCESS:
    case DEPLOYMENTS_TYPES.CREATE_DEPLOYMENT_SUCCESS:
      return [...state, ...action.deployments];

    case DEPLOYMENTS_TYPES.UPDATE_DEPLOYMENT_SUCCESS:
      return action.deployments;

    case DEPLOYMENTS_TYPES.DELETE_DEPLOYMENT_SUCCESS:
    case DEPLOYMENTS_TYPES.RENAME_DEPLOYMENT_SUCCESS:
      return action.deployments;

    case DEPLOYMENTS_TYPES.UPDATE_DEPLOYMENT_POSITION_SUCCESS: {
      const deploymentsClone = [...state];

      const [deploymentToMove] = deploymentsClone.splice(
        action.currentPosition,
        1
      );

      deploymentsClone.splice(action.newPosition, 0, deploymentToMove);

      return deploymentsClone.map((deployment, index) => ({
        ...deployment,
        position: index,
      }));
    }

    default:
      return state;
  }
};

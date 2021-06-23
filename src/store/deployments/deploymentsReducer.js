// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global DeploymentsStore */
// ACTION TYPES
import actionTypes from './actionTypes';

/** @type {DeploymentsStore} */
const initialState = [];

/**
 * deployments reducer
 *
 * @param {Array} state The State
 * @param {object} action The Action
 * @returns {Array} Deployments list
 */
const deploymentsReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case actionTypes.CLEAR_ALL_DEPLOYMENTS:
      return [];

    case actionTypes.FETCH_DEPLOYMENTS_SUCCESS:
      return action.deployments;

    case actionTypes.DUPLICATE_DEPLOYMENT_SUCCESS:
    case actionTypes.CREATE_DEPLOYMENT_SUCCESS:
      return [...state, ...action.deployments];

    case actionTypes.UPDATE_DEPLOYMENT_SUCCESS:
      return action.deployments;

    case actionTypes.DELETE_DEPLOYMENT_SUCCESS:
    case actionTypes.RENAME_DEPLOYMENT_SUCCESS:
      return action.deployments;

    case actionTypes.UPDATE_DEPLOYMENT_POSITION_SUCCESS: {
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

/**
 * Select deployment by id
 *
 * @param {Array} state The State
 * @param {string} deploymentId Deployment UUID
 * @returns {Array} Deployments list
 */
export const getDeploymentById = (state, deploymentId) => {
  return state.deploymentsReducer.find(
    (deployment) => deployment.uuid === deploymentId
  );
};

export default deploymentsReducer;

// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
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
    // reset initial fetch of deployments
    case actionTypes.CLEAR_ALL_DEPLOYMENTS:
      return [];

    // SUCCESS
    // fetch deployments success
    case actionTypes.FETCH_DEPLOYMENTS_SUCCESS:
      return action.deployments;
    case actionTypes.DUPLICATE_DEPLOYMENT_SUCCESS:
    case actionTypes.CREATE_DEPLOYMENT_SUCCESS:
      return [...state, ...action.deployments];
    // update deployment success
    case actionTypes.UPDATE_DEPLOYMENT_SUCCESS:
      return action.deployments;
    // delete deployment success
    case actionTypes.DELETE_DEPLOYMENT_SUCCESS:
    case actionTypes.RENAME_DEPLOYMENT_SUCCESS:
      return action.deployments;

    // // // // // // //

    // FAIL
    // fetch deployments fail
    case actionTypes.FETCH_DEPLOYMENTS_FAIL:
      return state;
    // create deployment fail
    case actionTypes.CREATE_DEPLOYMENT_FAIL:
      return state;
    // update deployment fail
    case actionTypes.UPDATE_DEPLOYMENT_FAIL:
      return state;
    // delete deployment fail
    case actionTypes.DELETE_DEPLOYMENT_FAIL:
      return state;

    // // // // // // //

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

    // DEFAULT
    default:
      return state;
  }
};

// SELECTOR

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

// EXPORT
export default deploymentsReducer;

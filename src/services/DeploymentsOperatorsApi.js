// CORE LIBS
import axios from 'axios';

// CONSTANTS
const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';
const operatorsApi = axios.create({
  baseURL: `${URL}/projects/`,
});
const deploymentsPath = 'deployments';
const operatorsPath = 'operators';

// API METHODS
/**
 * List Operators
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @returns {Promise} Request Promise
 */
const listOperators = (projectId, deploymentId) => {
  return operatorsApi.get(
    `${projectId}/${deploymentsPath}/${deploymentId}/${operatorsPath}`
  );
};

/**
 * Create Operator
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @param {string} taskId Project UUID
 * @param {string[]} dependencies List of operators UUID
 * @returns {Promise} Request Promise
 */
const createOperator = (
  projectId,
  deploymentId,
  taskId,
  dependencies,
  position
) => {
  const body = {
    taskId: taskId,
    dependencies: dependencies,
    positionX: position.x,
    positionY: position.y,
  };
  return operatorsApi.post(
    `${projectId}/${deploymentsPath}/${deploymentId}/${operatorsPath}`,
    body
  );
};

/**
 * Delete Operator
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @param {string} operatorId Operator UUID
 * @returns {Promise} Request Promise
 */
const deleteOperator = (projectId, deploymentId, operatorId) => {
  return operatorsApi.delete(
    `${projectId}/${deploymentsPath}/${deploymentId}/${operatorsPath}/${operatorId}`
  );
};

/**
 * Update Operator
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @param {string} operatorId Operator UUID
 * @param {object} operator Operator object
 * @returns {Promise} Request Promise
 */
const updateOperator = (projectId, deploymentId, operatorId, operator) => {
  return operatorsApi.patch(
    `${projectId}/${deploymentsPath}/${deploymentId}/${operatorsPath}/${operatorId}`,
    operator
  );
};

// EXPORT DEFAULT
export default {
  listOperators,
  createOperator,
  deleteOperator,
  updateOperator,
};

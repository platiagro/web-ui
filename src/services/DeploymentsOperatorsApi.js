import { createAxiosInstance } from 'services/factories';

const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';

const deploymentsOperatorsApi = createAxiosInstance({
  baseURL: `${URL}/projects/`,
});

const deploymentsPath = 'deployments';
const operatorsPath = 'operators';

/**
 * List Operators
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @returns {Promise} Request Promise
 */
const listOperators = (projectId, deploymentId) => {
  return deploymentsOperatorsApi.get(
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
 * @param {object} position Contains the X and Y coordinates
 * @param {number} position.x X Coordinate
 * @param {number} position.y Y Coordinate
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
  return deploymentsOperatorsApi.post(
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
  return deploymentsOperatorsApi.delete(
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
  return deploymentsOperatorsApi.patch(
    `${projectId}/${deploymentsPath}/${deploymentId}/${operatorsPath}/${operatorId}`,
    operator
  );
};

export default {
  listOperators,
  createOperator,
  deleteOperator,
  updateOperator,
  axiosInstance: deploymentsOperatorsApi,
};

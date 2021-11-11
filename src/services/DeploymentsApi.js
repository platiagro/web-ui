import { createAxiosInstance } from 'services/factories';

const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';

const deploymentsApi = createAxiosInstance({
  baseURL: `${URL}/projects/`,
});

const deploymentsPath = 'deployments';

/**
 * List deployments
 *
 * @param {string} projectId Project UUID
 * @returns {Promise} Request Promise
 */
const listDeployments = (projectId) => {
  return deploymentsApi.get(`${projectId}/${deploymentsPath}`);
};

/**
 * Create Deployment
 *
 * @param {string} projectId Project UUID
 * @param {object} body Deployment object
 * @returns {Promise} Request Promise
 */
const createDeployment = (projectId, body) => {
  return deploymentsApi.post(`${projectId}/${deploymentsPath}`, body);
};

/**
 * Detail Deployment
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @returns {Promise} Request Promise
 */
const getDeployment = (projectId, deploymentId) => {
  return deploymentsApi.get(`${projectId}/${deploymentsPath}/${deploymentId}`);
};

/**
 * Update Deployment
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @param {object} deploymentObj Deployment object updated
 * @returns {Promise} Request Promise
 */
const updateDeployment = (projectId, deploymentId, deploymentObj) => {
  return deploymentsApi.patch(
    `${projectId}/${deploymentsPath}/${deploymentId}`,
    deploymentObj
  );
};

/**
 * Delete Deployment
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @returns {Promise} Request Promise
 */
const deleteDeployment = (projectId, deploymentId) => {
  return deploymentsApi.delete(
    `${projectId}/${deploymentsPath}/${deploymentId}`
  );
};

/**
 * Update Deployment Operator
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @param {string} operatorId Operator UUID
 * @param {object} operatorObj Operator object updated
 * @returns {Promise} Request Promise
 */
const updateDeploymentOperator = (
  projectId,
  deploymentId,
  operatorId,
  operatorObj
) => {
  return deploymentsApi.patch(
    `${projectId}/${deploymentsPath}/${deploymentId}/operators/${operatorId}`,
    operatorObj
  );
};

export default {
  listDeployments,
  createDeployment,
  getDeployment,
  updateDeployment,
  deleteDeployment,
  updateDeploymentOperator,
  axiosInstance: deploymentsApi,
};

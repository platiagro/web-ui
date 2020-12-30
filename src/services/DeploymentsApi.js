// CORE LIBS
import axios from 'axios';

// CONSTANTS
const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';
const URL_SELDON = process.env.REACT_APP_SELDON_API;

const projectsApi = axios.create({
  baseURL: `${URL}/projects/`,
});
const seldonApi = axios.create({
  baseURL: `${URL_SELDON}`,
});

const deploymentsPath = 'deployments';

// API METHODS
/**
 * List deployments
 *
 * @param {string} projectId Project UUID
 * @returns {Promise} Request Promise
 */
const listDeployments = (projectId) => {
  return projectsApi.get(`${projectId}/${deploymentsPath}`);
};

/**
 * Create Deployment
 *
 * @param {string} projectId Project UUID
 * @param {object} body Deployment object
 * @returns {Promise} Request Promise
 */
const createDeployment = (projectId, body) => {
  return projectsApi.post(
    `${projectId}/${deploymentsPath}`,
    body
  );
};

/**
 * Detail Deployment
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @returns {Promise} Request Promise
 */
const geDeployment = (projectId, deploymentId) => {
  return projectsApi.get(
    `${projectId}/${deploymentsPath}/${deploymentId}`
  );
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
  return projectsApi.patch(
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
  return projectsApi.delete(
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
const updateDeploymentOperator = (projectId, deploymentId, operatorId, operatorObj) => {
  return projectsApi.patch(
    `${projectId}/${deploymentsPath}/${deploymentId}/operators/${operatorId}`,
    operatorObj
  );
};

/**
 * Test deployment
 *
 * @param {string} deploymentId Deployment UUID
 * @param {object} body Body to be sent
 * @returns {Promise} Request Promise
 */
const testDeployment = (deploymentId, body) => {
  return seldonApi.post(
    `/deployments/${deploymentId}/api/v1.0/predictions`,
    body
  );
};

// EXPORT DEFAULT
export default {
  listDeployments,
  createDeployment,
  geDeployment,
  updateDeployment,
  deleteDeployment,
  updateDeploymentOperator,
  testDeployment
};

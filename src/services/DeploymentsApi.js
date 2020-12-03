// CORE LIBS
import axios from 'axios';

// CONSTANTS
const URL = process.env.REACT_APP_PIPELINES_API || 'http://localhost:8080';
const URL_SELDON = process.env.REACT_APP_SELDON_API;

const pipelinesApi = axios.create({
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
  return pipelinesApi.get(`${projectId}/${deploymentsPath}`);
};

/**
 * Create Deployment
 *
 * @param {string} projectId Project UUID
 * @param {object} deploymentObj Deployment object
 * @returns {Promise} Request Promise
 */
const createDeployment = (projectId, deploymentObj) => {
  return pipelinesApi.post(
    `${projectId}/${deploymentsPath}`,
    deploymentObj
  );
};

/**
 * Detail Deployment
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @returns {Promise} Request Promise
 */
const detailDeployment = (projectId, deploymentId) => {
  return pipelinesApi.get(
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
  return pipelinesApi.patch(
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
  return pipelinesApi.delete(
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
  return pipelinesApi.patch(
    `${projectId}/${deploymentsPath}/${deploymentId}/operators/${operatorId}`,
    operatorObj
  );
};

/**
 * Test deployment
 *
 * @param {string} id
 * @param {string} body
 * @returns {Promise} Request Promise
 */
const testDeployment = (id, body) => {
  return seldonApi.post(
    `/deployments/${id}/api/v1.0/predictions`,
    body
  );
};

const listDeployments = (projectsId) => {
  return pipelinesApi.get(`${projectsId}/${deploymentsPath}`);
};

const createDeployment = (projectsId, body) => {
  return pipelinesApi.post(`${projectsId}/${deploymentsPath}`, body);
};

const updateDeployment = (projectsId, deploymentId, body) => {
  return pipelinesApi.patch(
    `${projectsId}/${deploymentsPath}/${deploymentId}`,
    body
  );
};

const deleteDeployment = (projectsId, deploymentId) => {
  return pipelinesApi.delete(
    `${projectsId}/${deploymentsPath}/${deploymentId}`
  );
};

// EXPORT DEFAULT
export default {
  listDeployments,
  createDeployment,
  detailDeployment,
  updateDeployment,
  deleteDeployment,
  updateDeploymentOperator,
  testDeployment
};

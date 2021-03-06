import axios from 'axios';

const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';

const projectsApi = axios.create({
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
  return projectsApi.post(`${projectId}/${deploymentsPath}`, body);
};

/**
 * Detail Deployment
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @returns {Promise} Request Promise
 */
const getDeployment = (projectId, deploymentId) => {
  return projectsApi.get(`${projectId}/${deploymentsPath}/${deploymentId}`);
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
  return projectsApi.delete(`${projectId}/${deploymentsPath}/${deploymentId}`);
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
  return projectsApi.patch(
    `${projectId}/${deploymentsPath}/${deploymentId}/operators/${operatorId}`,
    operatorObj
  );
};

/**
 * Test deployment
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @param {object} file File to be sent
 * @returns {Promise} Request Promise
 */
const testDeploymentWithFile = (projectId, deploymentId, file) => {
  const form = new FormData();
  form.append('file', file);
  return projectsApi.post(
    `${projectId}/${deploymentsPath}/${deploymentId}/predictions`,
    form
  );
};

/**
 * Test deployment with the dataset uploaded
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @param {string} dataset File name that was already uploaded
 * @returns {Promise} Request Promise
 */
const testDeploymentWithDataset = (projectId, deploymentId, dataset) => {
  return projectsApi.post(
    `${projectId}/${deploymentsPath}/${deploymentId}/predictions`,
    { dataset }
  );
};

export default {
  listDeployments,
  createDeployment,
  getDeployment,
  updateDeployment,
  deleteDeployment,
  updateDeploymentOperator,
  testDeploymentWithFile,
  testDeploymentWithDataset,
};

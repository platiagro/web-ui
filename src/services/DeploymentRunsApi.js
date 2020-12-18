// CORE LIBS
import axios from 'axios';

// CONSTANTS
const URL = process.env.REACT_APP_PIPELINES_API || 'http://localhost:8080';
const pipelinesApi = axios.create({
  baseURL: `${URL}/projects/`,
});

const deploymentsPath = 'deployments';
const runsPath = 'runs';

// API METHODS
/**
 * Fetch Deployment Runs
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @returns {Promise} Request Promise
 */
const fetchDeploymentRuns = (projectId, deploymentId) => {
  return pipelinesApi.get(`${projectId}/${deploymentsPath}/${deploymentId}/${runsPath}`);
};

/**
 * Create Deployment Run
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @returns {Promise} Request Promise
 */
const createDeploymentRun = (projectId, deploymentId) => {
  return pipelinesApi.post(
    `${projectId}/${deploymentsPath}/${deploymentId}/${runsPath}?experimentDeploy=true`
  );
};

/**
 * Delete Deployment Run
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @returns {Promise} //
 */
const deleteDeploymentRun = (projectId, deploymentId) => {
  return pipelinesApi.delete(
    `${projectId}/${deploymentsPath}/${deploymentId}/${runsPath}`
  );
};

/**
 * Fetch deployment run logs
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @param {string} runId Run UUID
 * @returns {Promise} Request Promise
 */
const fetchDeploymentRunLogs = (projectId, deploymentId, runId) => {
  return pipelinesApi.get(
    `${projectId}/${deploymentsPath}/${deploymentId}/${runsPath}/${runId}/logs`
  );
};

/**
 * Retry deployment run
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @param {string} runId Run UUID
 * @returns {Promise} Request Promise
 */
const retryDeploymentRun = (projectId, deploymentId, runId) => {
  return pipelinesApi.put(
    `${projectId}/${deploymentsPath}/${deploymentId}/${runsPath}/${runId}/retry`
  );
}

// EXPORT DEFAULT
export default {
  fetchDeploymentRuns,
  createDeploymentRun,
  deleteDeploymentRun,
  fetchDeploymentRunLogs,
  retryDeploymentRun
}
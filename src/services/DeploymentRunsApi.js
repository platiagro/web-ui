// CORE LIBS
import axios from 'axios';

// CONSTANTS
const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';
const projectsApi = axios.create({
  baseURL: `${URL}/projects/`,
});

const deploymentsPath = 'deployments';
const runsPath = 'runs';

// API METHODS
/**
 * List Deployment Runs
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @returns {Promise} Request Promise
 */
const listDeploymentRuns = (projectId, deploymentId) => {
  return projectsApi.get(
    `${projectId}/${deploymentsPath}/${deploymentId}/${runsPath}`
  );
};

/**
 * Fetch Deployment Run
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @param {string} runId The run UUID
 * @returns {Promise} Request Promise
 */
const fetchDeploymentRun = (projectId, deploymentId, runId) => {
  return projectsApi.get(
    `${projectId}/${deploymentsPath}/${deploymentId}/${runsPath}/${runId}`
  );
};

/**
 * Create Deployment Run
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @returns {Promise} Request Promise
 */
const createDeploymentRun = (projectId, deploymentId) => {
  return projectsApi.post(
    `${projectId}/${deploymentsPath}/${deploymentId}/${runsPath}`
  );
};

/**
 * Delete Deployment Run
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @returns {Promise} //
 */
const deleteDeploymentRun = (projectId, deploymentId, runId) => {
  return projectsApi.delete(
    `${projectId}/${deploymentsPath}/${deploymentId}/${runsPath}/${runId}`
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
  return projectsApi.get(
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
  return projectsApi.put(
    `${projectId}/${deploymentsPath}/${deploymentId}/${runsPath}/${runId}/retry`
  );
};

// EXPORT DEFAULT
export default {
  fetchDeploymentRun,
  createDeploymentRun,
  deleteDeploymentRun,
  fetchDeploymentRunLogs,
  listDeploymentRuns,
  retryDeploymentRun,
};

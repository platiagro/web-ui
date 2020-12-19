// CORE LIBS
import axios from 'axios';

// CONSTANTS
const URL = process.env.REACT_APP_PIPELINES_API || 'http://localhost:8080';
const projectsApi = axios.create({
  baseURL: URL,
});
const projectsPath = '/projects';
const deploymentsPath = 'deployments';

/**
 * Create project deployment
 * @param {string} projectName
 * @param {string} projectDescription
 * @returns {Promise}
 */
const createProjectDeployment = (projectId, experimentId, name) => {
  return projectsApi.post(`${projectsPath}/${projectId}/${deploymentsPath}`, {
    experimentId: experimentId,
    name: name,
  });
};

/**
 * Delete project deployment
 * @param {string} projectId
 * @returns {Promise}
 */
const deleteProjectDeployment = (projectId, deploymentId) => {
  return projectsApi.delete(
    `${projectsPath}/${projectId}/${deploymentsPath}/${deploymentId}`
  );
};

/**
 * Get project deployments
 * @param {string} projectId
 * @returns {Promise}
 */
const listProjectDeployments = (projectId) => {
  return projectsApi.get(`${projectsPath}/${projectId}/${deploymentsPath}`);
};

/**
 * Update project deployment
 * @param {string} projectId
 * @param {string} deploymentId
 * @param {Object} deployment
 * @returns {Promise}
 */
const updateProjectDeployment = (projectId, deploymentId, deployment) => {
  return projectsApi.patch(
    `${projectsPath}/${projectId}/${deploymentsPath}/${deploymentId}`,
    deployment
  );
};

// EXPORT DEFAULT
export default {
  createProjectDeployment,
  deleteProjectDeployment,
  listProjectDeployments,
  updateProjectDeployment,
};

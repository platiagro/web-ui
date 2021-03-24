import axios from 'axios';

export const monitoringsApi = axios.create({
  baseURL: process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080',
});

/**
 * Returns monitorings from the API
 *
 * @param {string} projectId Project ID
 * @param {string} deploymentId Deployment ID
 * @returns {Promise} Get Request
 */
const fetchMonitorings = (projectId, deploymentId) => {
  const url = `projects/${projectId}/deployments/${deploymentId}/monitorings`
  return monitoringsApi.get(url);
};

/**
 * Create a new monitoring
 *
 * @param {object} requestData Request data
 * @param {string} requestData.projectId Project ID
 * @param {string} requestData.deploymentId Deployment ID
 * @param {string} requestData.taskId Task ID
 * @returns {Promise} Post Request
 */
const createMonitoring = ({ projectId, deploymentId, taskId }) => {
  const url = `projects/${projectId}/deployments/${deploymentId}/monitorings`
  return monitoringsApi.post(url, {
    taskId
  });
};

/**
 * Create a new monitoring
 *
 * @param {object} requestData Request data
 * @param {string} requestData.projectId Project ID
 * @param {string} requestData.deploymentId Deployment ID
 * @param {string} requestData.monitoringId Monitoring ID
 * @returns {Promise} Delete Request
 */
const deleteMonitoring = ({ projectId, deploymentId, monitoringId }) => {
  const url = `projects/${projectId}/deployments/${deploymentId}/monitorings/${monitoringId}`
  return monitoringsApi.delete(url);
};

export default {
  fetchMonitorings,
  createMonitoring,
  deleteMonitoring,
};

import { createAxiosInstance } from 'services/factories';

const monitoringsApi = createAxiosInstance({
  baseURL: process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080',
});

const getBaseUrl = (projectId, deploymentId) => {
  return `projects/${projectId}/deployments/${deploymentId}/monitorings`;
};

/**
 * Returns monitorings from the API
 *
 * @param {string} projectId Project ID
 * @param {string} deploymentId Deployment ID
 * @returns {Promise} Get Request
 */
const fetchMonitorings = (projectId, deploymentId) => {
  const url = getBaseUrl(projectId, deploymentId);
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
  const url = getBaseUrl(projectId, deploymentId);
  return monitoringsApi.post(url, {
    taskId,
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
  const baseUrl = getBaseUrl(projectId, deploymentId);
  const url = `${baseUrl}/${monitoringId}`;
  return monitoringsApi.delete(url);
};

/**
 * Fetch monitoring figures
 *
 * @param {object} requestData Request data
 * @param {string} requestData.projectId Project ID
 * @param {string} requestData.deploymentId Deployment ID
 * @param {string} requestData.monitoringId Monitoring ID
 * @returns {Promise} API Request
 */
const fetchMonitoringFigures = ({ projectId, deploymentId, monitoringId }) => {
  const baseUrl = getBaseUrl(projectId, deploymentId);
  const url = `${baseUrl}/${monitoringId}/figures`;
  return monitoringsApi.get(url);
};

export default {
  fetchMonitorings,
  createMonitoring,
  deleteMonitoring,
  fetchMonitoringFigures,
  axiosInstance: monitoringsApi,
};

import { createAxiosInstance } from 'services/factories';

const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';

const predictionApi = createAxiosInstance({
  baseURL: `${URL}/projects/`,
});

const deploymentsPath = 'deployments';

/**
 * Create a prediction using a file
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @param {object} file File to be sent
 * @returns {Promise} Request Promise
 */
const createPredictionWithFile = (projectId, deploymentId, file) => {
  const form = new FormData();
  form.append('file', file);
  return predictionApi.post(
    `${projectId}/${deploymentsPath}/${deploymentId}/predictions`,
    form
  );
};

/**
 * Create a prediction using a dataset id
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @param {string} dataset File name that was already uploaded
 * @returns {Promise} Request Promise
 */
const createPredictionWithDataset = (projectId, deploymentId, dataset) => {
  return predictionApi.post(
    `${projectId}/${deploymentsPath}/${deploymentId}/predictions`,
    { dataset }
  );
};

/**
 * Get prediction results
 *
 * @param {string} projectId Project UUID
 * @param {string} deploymentId Deployment UUID
 * @param {string} predictionId Prediction UUID
 * @returns {Promise} Request Promise
 */
const fetchPrediction = (projectId, deploymentId, predictionId) => {
  return predictionApi.get(
    `${projectId}/${deploymentsPath}/${deploymentId}/predictions/${predictionId}`
  );
};

export default {
  createPredictionWithFile,
  createPredictionWithDataset,
  fetchPrediction,
  axiosInstance: predictionApi,
};

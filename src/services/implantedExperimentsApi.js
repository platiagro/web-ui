// CORE LIBS
import axios from 'axios';

// CONSTANTS
// api base url
const URL = process.env.REACT_APP_PIPELINES_API || 'http://localhost:3000';
const URL_SELDON = process.env.REACT_APP_SELDON_API;
// api object
const pipelinesApi = axios.create({
  baseURL: `${URL}`,
});

const seldonApi = axios.create({
  baseURL: `${URL_SELDON}`,
});

const deploymentsPath = '/deployments';

/**
 * Get Deployed Experiments
 * @returns {Promise}
 */
const getDeployedExperiments = () => {
  return pipelinesApi.get(deploymentsPath);
};

const testDeployedExperiments = (id, body) => {
  return seldonApi.post(`/deployments/${id}/api/v1.0/predictions`, body);
}

/**
 * Test Deployed Experiments
 * @param {Object} deployObject
 * @returns {Promise}
 */

/**
 * Delete Deployed Experiments
 * @param experimentId
 * @returns {Promise}
 */
const deleteDeployedExperiments = (experimentId) => {
  return pipelinesApi.delete(`${deploymentsPath}/${experimentId}`);
};

// EXPORT DEFAULT
export default {
  getDeployedExperiments,
  testDeployedExperiments,
  deleteDeployedExperiments,
};

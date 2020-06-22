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

<<<<<<< HEAD
=======
/**
* Get Deployed Experiments
* @returns {Promise}
*/
const getExperimentDeployStatus = (experimentId) =>
  new Promise((resolve, reject) => {
    // get deployed experiment
    pipelinesApi
      .get(`${deploymentsPath}/${experimentId}`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

const testDeployedExperiments = (id, body) =>
  new Promise((resolve, reject) => {
    // test deployed experiment
    seldonApi
      .post(`/deployments/${id}/api/v1.0/predictions`, body)
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });
>>>>>>> 73c26ea... Deployment status was been altered
/**
 * Test Deployed Experiments
 * @param {Object} deployObject
 * @returns {Promise}
 */
const testDeployedExperiments = (id, body) => {
  return seldonApi.post(`/deployments/${id}/api/v1.0/predictions`, body);
};

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
  getExperimentDeployStatus,
};

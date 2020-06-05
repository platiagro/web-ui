// CORE LIBS
import axios from 'axios';

// CONSTANTS
// api base url
const URL = process.env.REACT_APP_PIPELINES_API || 'http://localhost:3000';
const URL_SELDON = process.env.REACT_APP_MAIN_DOMAIN || 'http://localhost:3000';
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
const getDeployedExperiments = () =>
  new Promise((resolve, reject) => {
    // get deployed experiment
    pipelinesApi
      .get(deploymentsPath)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

const testDeployedExperiments = (id, body) =>
  new Promise((resolve, reject) => {
    // test deployed experiment
    seldonApi
      .post(`/seldon/deployments/${id}/api/v1.0/predictions`, body)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

// EXPORT DEFAULT
export default {
  getDeployedExperiments,
  testDeployedExperiments,
};

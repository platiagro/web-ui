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
      .post(`/deployments/${id}/api/v1.0/predictions`, body)
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });
/**
 * Get Deployed Experiments
 * @param experimentId
 * @returns {Promise}
 */
const deleteDeployedExperiments = (experimentId) =>
  new Promise((resolve, reject) => {
    // get deployed experiment
    axios
      .get('http://www.mocky.io/v2/5ed65ddd3400004d0006d9ae?mocky-delay=1000ms')
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

// EXPORT DEFAULT
export default {
  getDeployedExperiments,
  testDeployedExperiments,
  deleteDeployedExperiments,
};

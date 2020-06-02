// CORE LIBS
import axios from 'axios';

// CONSTANTS
// api base url
const URL = process.env.REACT_APP_PIPELINES_API || 'http://localhost:3000';
// api object
const pipelinesApi = axios.create({
  baseURL: `${URL}`,
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
  deleteDeployedExperiments,
};

// CORE LIBS
import axios from 'axios';

// CONSTANTS
// api base url
const URL = process.env.REACT_APP_PIPELINES_API || 'http://localhost:3000';
// api object
const pipelinesApi = axios.create({
  baseURL: `${URL}`,
});

/**
 * Get Deployed Experiments
 * @returns {Promise}
 */
const getDeployedExperiments = () =>
  new Promise((resolve, reject) => {
    // get deployed experiment
    pipelinesApi
      .get(`http://www.mocky.io/v2/5ebad2383600007c00f7e38e`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

// EXPORT DEFAULT
export default {
  getDeployedExperiments,
};

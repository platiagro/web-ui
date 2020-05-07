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
 * Deploy Experiment Logs
 * @returns {Promise}
 */
const getDeployExperimentLogs = (deployId) =>
  new Promise((resolve, reject) => {
    console.log('[SERVICE]', deployId);
    // deploying experiment logs
    axios
      .get('http://www.mocky.io/v2/5eb40e730e0000af2f081897?mocky-delay=1000ms')
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

// EXPORT DEFAULT
export default {
  getDeployExperimentLogs,
};

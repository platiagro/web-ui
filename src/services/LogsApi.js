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
 * Deploy Experiment Logs
 * @returns {Promise}
 */
const getDeployExperimentLogs = (deployId) =>
  new Promise((resolve, reject) => {
    // deploying experiment logs
    pipelinesApi
      .get(`${deploymentsPath}/logs?name=${deployId}`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

// EXPORT DEFAULT
export default {
  getDeployExperimentLogs,
};

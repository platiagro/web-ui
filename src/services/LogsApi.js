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
const getDeployExperimentLogs = (deployId) => {
  return pipelinesApi.get(`${deploymentsPath}/logs?name=${deployId}`);
};

// EXPORT DEFAULT
export default {
  getDeployExperimentLogs,
};

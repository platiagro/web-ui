// CORE LIBS
import axios from 'axios';

// CONSTANTS
// api base url
const URL = process.env.REACT_APP_PIPELINES_API || 'http://localhost:8080';
const URL_SELDON = process.env.REACT_APP_SELDON_API;
// api object
const pipelinesApi = axios.create({
  baseURL: `${URL}`,
});

const seldonApi = axios.create({
  baseURL: `${URL_SELDON}`,
});

const deploymentsPath = '/deployments';

const getDeployedExperiment = (deployId) => {
  return pipelinesApi.get(`${deploymentsPath}/${deployId}`);
};

const getDeployedExperiments = () => {
  return pipelinesApi.get(deploymentsPath);
};

const getDeployedExperimentLogs = (deployId) => {
  return pipelinesApi.get(`${deploymentsPath}/${deployId}/logs`);
};

const getExperimentDeployStatus = (experimentId) => {
  return pipelinesApi.get(`${deploymentsPath}/${experimentId}`);
};

const testDeployedExperiments = (id, body) => {
  return seldonApi.post(`/deployments/${id}/api/v1.0/predictions`, body);
};

const deleteDeployedExperiments = (experimentId) => {
  return pipelinesApi.delete(`${deploymentsPath}/${experimentId}`);
};

// EXPORT DEFAULT
export default {
  getDeployedExperiment,
  getDeployedExperiments,
  getDeployedExperimentLogs,
  getExperimentDeployStatus,
  testDeployedExperiments,
  deleteDeployedExperiments,
};

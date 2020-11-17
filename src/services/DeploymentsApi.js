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

const fetchDeployedExperiment = (deployId) => {
  return pipelinesApi.get(`${deploymentsPath}/${deployId}/runs`);
};

const fetchDeployedExperiments = () => {
  return pipelinesApi.get(`${deploymentsPath}/runs`);
};

const fetchDeployedExperimentLogs = (deployId) => {
  return pipelinesApi.get(`${deploymentsPath}/${deployId}/runs/logs`);
};

const fetchExperimentDeployStatus = (experimentId) => {
  return pipelinesApi.get(`${deploymentsPath}/${experimentId}/runs`);
};

const testDeployedExperiments = (id, body) => {
  return seldonApi.post(`/deployments/${id}/api/v1.0/predictions`, body);
};

const deleteDeployedExperiments = (experimentId) => {
  return pipelinesApi.delete(`${deploymentsPath}/${experimentId}/runs`);
};

// EXPORT DEFAULT
export default {
  fetchDeployedExperiment,
  fetchDeployedExperiments,
  fetchDeployedExperimentLogs,
  fetchExperimentDeployStatus,
  testDeployedExperiments,
  deleteDeployedExperiments,
};

// CORE LIBS
import axios from 'axios';

// CONSTANTS
const URL = process.env.REACT_APP_PIPELINES_API || 'http://localhost:8080';
const URL_SELDON = process.env.REACT_APP_SELDON_API;
const pipelinesApi = axios.create({
  baseURL: `${URL}/projects/`,
});
const seldonApi = axios.create({
  baseURL: `${URL_SELDON}`,
});
const deploymentsPath = 'deployments';

const fetchDeployedExperiment = (projectId, deployId) => {
  return pipelinesApi.get(`${projectId}/${deploymentsPath}/${deployId}/runs`);
};

const fetchDeployedExperimentLogs = (projectId, deployId, runId) => {
  return pipelinesApi.get(
    `${projectId}/${deploymentsPath}/${deployId}/runs/${runId}/logs`
  );
};

const deleteDeployedExperiments = (projectId, experimentId) => {
  return pipelinesApi.delete(
    `${projectId}/${deploymentsPath}/${experimentId}/runs`
  );
};

const testDeployedExperiments = (id, file) => {
  const form = new FormData();
  form.append('url', `/deployments/${id}/api/v1.0/predictions`);
  form.append('file', file);
  return seldonApi.post(`deployments/seldon/test`, form);
};

// EXPORT DEFAULT
export default {
  fetchDeployedExperiment,
  fetchDeployedExperimentLogs,
  testDeployedExperiments,
  deleteDeployedExperiments,
};

// CORE LIBS
import axios from 'axios';

// CONSTANTS
const URL = process.env.REACT_APP_PIPELINES_API || 'http://localhost:8080';
const pipelinesApi = axios.create({
  baseURL: `${URL}/projects/`,
});
const deployPath = 'deployments';
const experimentPath = 'experiments';

const trainExperiment = (projectId, experimentId) => {
  return pipelinesApi.post(
    `${projectId}/${experimentPath}/${experimentId}/runs`
  );
};

const getTrainExperimentStatus = (projectId, experimentId, runId) => {
  return pipelinesApi.get(
    `${projectId}/${experimentPath}/${experimentId}/runs/${runId}`
  );
};

const deployExperiment = (projectId, experimentId) => {
  return pipelinesApi.post(
    `${projectId}/${deployPath}/${experimentId}/runs?experimentDeploy=true`
  );
};

const deleteTrainExperiment = (projectId, experimentId) => {
  return pipelinesApi.delete(
    `${projectId}/${experimentPath}/${experimentId}/runs`
  );
};

const getOperatorDataset = (
  projectId,
  experimentId,
  runId,
  operatorId,
  page,
  pageSize
) => {
  return pipelinesApi.get(
    `${projectId}/${experimentPath}/${experimentId}/runs/${runId}/operators/${operatorId}/datasets?page=${page}&page_size=${pageSize}`
  );
};

const getOperatorFigures = (projectId, experimentId, runId, operatorId) => {
  return pipelinesApi.get(
    `${projectId}/${experimentPath}/${experimentId}/runs/${runId}/operators/${operatorId}/figures`
  );
};

const getOperatorLog = (projectId, experimentId, runId, operatorId) => {
  return pipelinesApi.get(
    `${projectId}/${experimentPath}/${experimentId}/runs/${runId}/operators/${operatorId}/logs`
  );
};

const getOperatorMetrics = (projectId, experimentId, runId, operatorId) => {
  return pipelinesApi.get(
    `${projectId}/${experimentPath}/${experimentId}/runs/${runId}/operators/${operatorId}/metrics`
  );
};

const getTrainingHistory = (projectId, experimentId) => {
  return pipelinesApi.get(
    `${projectId}/${experimentPath}/${experimentId}/runs`
  );
};

// EXPORT DEFAULT
export default {
  getTrainExperimentStatus,
  trainExperiment,
  deployExperiment,
  deleteTrainExperiment,
  getOperatorDataset,
  getOperatorFigures,
  getOperatorLog,
  getOperatorMetrics,
  getTrainingHistory,
};

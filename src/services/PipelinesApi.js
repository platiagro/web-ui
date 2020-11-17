// CORE LIBS
import axios from 'axios';

// CONSTANTS
const URL = process.env.REACT_APP_PIPELINES_API || 'http://localhost:8080';
const pipelinesApi = axios.create({
  baseURL: `${URL}`,
});
const deployPath = '/deployments';
const experimentPath = '/experiments';

const trainExperiment = (trainObject) => {
  const { experimentId } = trainObject;
  return pipelinesApi.put(
    `${experimentPath}/${experimentId}/runs`,
    trainObject
  );
};

const getTrainExperimentStatus = (experimentId) => {
  return pipelinesApi.get(`${experimentPath}/${experimentId}/runs`);
};

const deployExperiment = (experimentId, deployObject) => {
  return pipelinesApi.put(`${deployPath}/${experimentId}/runs`, deployObject);
};

const deleteTrainExperiment = (experimentId) => {
  return pipelinesApi.delete(`${experimentPath}/${experimentId}/runs`);
};

const getOperatorDataset = (experimentId, runId, operatorId, page) => {
  return pipelinesApi.get(
    `${experimentPath}/${experimentId}/runs/${runId}/operators/${operatorId}/datasets?page=${page}&page_size=10`
  );
};

const getOperatorFigures = (experimentId, runId, operatorId) => {
  return pipelinesApi.get(
    `${experimentPath}/${experimentId}/runs/${runId}/operators/${operatorId}/figures`
  );
};

const getOperatorLog = (experimentId, runId, operatorId) => {
  return pipelinesApi.get(
    `${experimentPath}/${experimentId}/runs/${runId}/operators/${operatorId}/logs`
  );
};

const getOperatorMetrics = (experimentId, runId, operatorId) => {
  return pipelinesApi.get(
    `${experimentPath}/${experimentId}/runs/${runId}/operators/${operatorId}/metrics`
  );
};

const getTrainingHistory = (experimentId) => {
  return pipelinesApi.get(`${experimentPath}/${experimentId}/runs/history`);
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

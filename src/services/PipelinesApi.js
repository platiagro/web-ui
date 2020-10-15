// CORE LIBS
import axios from 'axios';

// CONSTANTS
// api base url
const URL = process.env.REACT_APP_PIPELINES_API || 'http://localhost:8080';
// api object
const pipelinesApi = axios.create({
  baseURL: `${URL}`,
});
// train path
const trainPath = '/trainings';
// deploy path
const deployPath = '/deployments';

/**
 * Train Experiment
 * @param {Object} trainObject
 * @returns {Promise}
 */
const trainExperiment = (trainObject) => {
  const { experimentId } = trainObject;
  return pipelinesApi.put(`${trainPath}/${experimentId}`, trainObject);
};

/**
 * Get Training Experiment Status
 * @param {string} experimentId
 * @returns {Promise}
 */
const getTrainExperimentStatus = (experimentId) => {
  return pipelinesApi.get(`${trainPath}/${experimentId}`);
};

/**
 * Deploy Experiment
 * @param {Object} deployObject
 * @returns {Promise}
 */
const deployExperiment = (experimentId, deployObject) => {
  return pipelinesApi.put(`${deployPath}/${experimentId}`, deployObject);
};

/**
 * Delete Train Experiment
 * @param {String} experimentId
 * @returns {Promise}
 */
const deleteTrainExperiment = (experimentId) => {
  return pipelinesApi.delete(`${trainPath}/${experimentId}`);
};

const getOperatorDataset = (trainingId, runId, operatorId, page) => {
  return pipelinesApi.get(
    `${trainPath}/${trainingId}/runs/${runId}/operators/${operatorId}/datasets?page=${page}&page_size=10`
  );
};

const getOperatorFigures = (trainingId, runId, operatorId) => {
  return pipelinesApi.get(
    `${trainPath}/${trainingId}/runs/${runId}/operators/${operatorId}/figures`
  );
};

const getOperatorLog = (trainingId, runId, operatorId) => {
  return pipelinesApi.get(
    `${trainPath}/${trainingId}/runs/${runId}/operators/${operatorId}/logs`
  );
};

export const getOperatorMetrics = async (trainingId, runId, operatorId) => {
  try {
    const metrics = await pipelinesApi.get(
      `${trainPath}/${trainingId}/runs/${runId}/operators/${operatorId}/metrics`
    );
    return metrics.data;
  } catch (error) {
    console.log(error.message);
  }
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
};

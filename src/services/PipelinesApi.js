// CORE LIBS
import axios from 'axios';

// CONSTANTS
// api base url
const URL = process.env.REACT_APP_PIPELINES_API || 'http://localhost:3000';
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

// EXPORT DEFAULT
export default {
  getTrainExperimentStatus,
  trainExperiment,
  deployExperiment,
};

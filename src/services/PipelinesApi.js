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

/**
 * Get operator log
 *
 * @param {string} experimentId
 * @param {string} operatorId
 * @returns {Promise}
 */
const getNotebookLog = (experimentId, operatorId) => {
  return pipelinesApi.get(
    `${trainPath}/${experimentId}/operators/${operatorId}/logs`
  );
};

// EXPORT DEFAULT
export default {
  getTrainExperimentStatus,
  trainExperiment,
  deployExperiment,
  deleteTrainExperiment,
  getNotebookLog,
};

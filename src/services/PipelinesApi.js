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
const trainPath = '/training';
// deploy path
const deployPath = '/deployments';

/**
 * Train Experiment
 * @param {Object} trainObject
 * @returns {Promise}
 */
const trainExperiment = (trainObject) =>
  new Promise((resolve, reject) => {
    // training experiment
    pipelinesApi
      .post(`${trainPath}`, trainObject)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Get Training Experiment Status
 * @param {string} experimentId
 * @returns {Promise}
 */
const getTrainExperimentStatus = (experimentId) =>
  new Promise((resolve, reject) => {
    // get training experiment status
    pipelinesApi
      .get(`${trainPath}/${experimentId}`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Deploy Experiment
 * @param {Object} deployObject
 * @returns {Promise}
 */
const deployExperiment = (deployObject) =>
  new Promise((resolve, reject) => {
    // deploying experiment
    pipelinesApi
      .post(`${deployPath}`, deployObject)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

// EXPORT DEFAULT
export default {
  getTrainExperimentStatus,
  trainExperiment,
  deployExperiment,
};

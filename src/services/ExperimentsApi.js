// CORE LIBS
import axios from 'axios';

// CONSTANTS
// api base url
const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:3000';
// projects path
const projectsPath = '/projects';
// api object
const experimentsApi = axios.create({
  baseURL: `${URL}${projectsPath}`,
});
// experiments path
const experimentsPath = '/experiments';

// API METHODS
/**
 * List Experiments
 * @param {string} projectId
 * @returns {Promise}
 */
const listExperiments = (projectId) =>
  new Promise((resolve, reject) => {
    // requesting experiments
    experimentsApi
      .get(`/${projectId}${experimentsPath}`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Detail Experiment
 * @param {string} projectId
 * @returns {Promise}
 */
const detailExperiment = (projectId, experimentId) =>
  new Promise((resolve, reject) => {
    // requesting experiment
    experimentsApi
      .get(`/${projectId}${experimentsPath}/${experimentId}`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Create Experiment
 * @param {string} projectId
 * @param {string} experimentName
 * @returns {Promise}
 */
const createExperiment = (projectId, experimentName) =>
  new Promise((resolve, reject) => {
    // creating body object
    const body = {
      name: experimentName,
    };

    // creating experiment
    experimentsApi
      .post(`/${projectId}${experimentsPath}`, body)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Update Experiment
 * @param {string} projectId
 * @param {string} experimentId
 * @param {Object} experiment
 * @returns {Promise}
 */
const updateExperiment = (projectId, experimentId, experiment) =>
  new Promise((resolve, reject) => {
    // updating experiment
    experimentsApi
      .patch(`/${projectId}${experimentsPath}/${experimentId}`, experiment)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Delete Experiment
 * @param {string} projectId
 * @param {string} experimentId
 * @returns {Promise}
 */
const deleteExperiment = (projectId, experimentId) =>
  new Promise((resolve, reject) => {
    // deleting experiment
    experimentsApi
      .delete(`/${projectId}${experimentsPath}/${experimentId}`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

// EXPORT DEFAULT
export default {
  listExperiments,
  detailExperiment,
  createExperiment,
  updateExperiment,
  deleteExperiment,
};

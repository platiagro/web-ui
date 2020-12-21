// CORE LIBS
import axios from 'axios';

// CONSTANTS
// api base url
const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';
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
 *
 * @param {string} projectId Project UUID
 * @returns {Promise} Request Promise
 */
const listExperiments = (projectId) => {
  return experimentsApi.get(`/${projectId}${experimentsPath}`);
};

/**
 * Detail Experiment
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId experiment uuid
 * @returns {Promise} Request Promise
 */
const detailExperiment = (projectId, experimentId) => {
  return experimentsApi.get(`/${projectId}${experimentsPath}/${experimentId}`);
};

/**
 * Create Experiment
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentName Experiment name
 * @param {string} copyFrom Reference to copy (optional)
 * @returns {Promise} Request Promise
 */
const createExperiment = (projectId, experimentName, copyFrom) => {
  const body = {
    name: experimentName,
    copyFrom: copyFrom,
  };
  return experimentsApi.post(`/${projectId}${experimentsPath}`, body);
};

/**
 * Update Experiment
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @param {object} experiment Experiment object updated
 * @returns {Promise} Request Promise
 */
const updateExperiment = (projectId, experimentId, experiment) => {
  return experimentsApi.patch(
    `/${projectId}${experimentsPath}/${experimentId}`,
    experiment
  );
};

/**
 * Delete Experiment
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @returns {Promise} Request Promise
 */
const deleteExperiment = (projectId, experimentId) => {
  return experimentsApi.delete(
    `/${projectId}${experimentsPath}/${experimentId}`
  );
};

// EXPORT DEFAULT
export default {
  listExperiments,
  detailExperiment,
  createExperiment,
  updateExperiment,
  deleteExperiment,
};

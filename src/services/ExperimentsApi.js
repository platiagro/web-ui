// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global ExperimentUpdatable, ExperimentCreatable */

/* API REFERENCE: https://platiagro.github.io/projects/#/Experiments */

import axios from 'axios';

import { AuthExpiredInterceptor } from './interceptors';

const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';

const projectsPath = '/projects';

const experimentsApi = axios.create({
  baseURL: `${URL}${projectsPath}`,
});

experimentsApi.interceptors.response.use(
  AuthExpiredInterceptor.Response.onFulfilled,
  AuthExpiredInterceptor.Response.onRejected
);

const experimentsPath = '/experiments';

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
 * @param {ExperimentCreatable} experiment New experiment data
 * @returns {Promise} Request Promise
 */
const createExperiment = (projectId, experiment) => {
  return experimentsApi.post(`/${projectId}${experimentsPath}`, experiment);
};

/**
 * Update Experiment
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @param {ExperimentUpdatable} experiment Experiment object updated
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

export default {
  listExperiments,
  detailExperiment,
  createExperiment,
  updateExperiment,
  deleteExperiment,
  axiosInstance: experimentsApi,
};

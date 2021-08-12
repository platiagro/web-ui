import axios from 'axios';

const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';

export const projectsApi = axios.create({
  baseURL: `${URL}/projects/`,
});

const experimentsPath = 'experiments';
const runsPath = 'runs';

/**
 * Detail Experiment Runs
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @returns {Promise} Request Promise
 */
const fetchExperimentRuns = (projectId, experimentId) => {
  return projectsApi.get(
    `${projectId}/${experimentsPath}/${experimentId}/${runsPath}`
  );
};

/**
 * Fetch Experiment Run Status
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @param {string} runId Run UUID
 * @returns {Promise} Request Promise
 */
const fetchExperimentRunStatus = (projectId, experimentId, runId) => {
  return projectsApi.get(
    `${projectId}/${experimentsPath}/${experimentId}/runs/${runId}`
  );
};

/**
 * Create Experiment Run
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @returns {Promise} Request Promise
 */
const createExperimentRun = (projectId, experimentId) => {
  return projectsApi.post(
    `${projectId}/${experimentsPath}/${experimentId}/${runsPath}`
  );
};

/**
 * Delete Experiment Run
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @returns {Promise} Request Promise
 */
const deleteExperimentRun = (projectId, experimentId) => {
  return projectsApi.delete(
    `${projectId}/${experimentsPath}/${experimentId}/${runsPath}/latest`
  );
};

/**
 * Retry Experiment Run
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @param {string} runId Run UUID
 * @returns {Promise} Request Promise
 */
const retryExperimentRun = (projectId, experimentId, runId) => {
  return projectsApi.put(
    `${projectId}/${experimentsPath}/${experimentId}/${runsPath}${runId}/retry`
  );
};

// EXPERIMENT RUN OPERATORS METHODS

/**
 * List Operator Datasets
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @param {string} runId Run UUID
 * @param {string} operatorId Operator UUID
 * @param {number} page Dataset Page
 * @param {number} pageSize Dataset Page Size
 * @returns {Promise} Request Promise
 */
const listOperatorDatasets = (
  projectId,
  experimentId,
  runId,
  operatorId,
  page = 1,
  pageSize = 10
) => {
  return projectsApi.get(
    `${projectId}/${experimentsPath}/${experimentId}/${runsPath}/${runId}/operators/${operatorId}/datasets?page=${page}&page_size=${pageSize}`
  );
};

/**
 * List Operator Figures
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @param {string} runId Run UUID
 * @param {string} operatorId Operator UUID
 * @returns {Promise} Request Promise
 */
const listOperatorFigures = (projectId, experimentId, runId, operatorId) => {
  return projectsApi.get(
    `${projectId}/${experimentsPath}/${experimentId}/${runsPath}/${runId}/operators/${operatorId}/figures`
  );
};

/**
 * Fetch Operator Logs
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @param {string} runId Run UUID
 * @param {string} operatorId Operator UUID
 * @returns {Promise} Request Promise
 */
const fetchOperatorLogs = (projectId, experimentId, runId, operatorId) => {
  return projectsApi.get(
    `${projectId}/${experimentsPath}/${experimentId}/${runsPath}/${runId}/operators/${operatorId}/logs`
  );
};

/**
 * Fetch Experiment Logs
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @param {string} runId Run UUID
 * @returns {Promise} Request Promise
 */
const fetchExperimentLogs = (projectId, experimentId, runId) => {
  return projectsApi.get(
    `${projectId}/${experimentsPath}/${experimentId}/${runsPath}/${runId}/logs`
  );
};

export default {
  fetchExperimentRuns,
  fetchExperimentRunStatus,
  createExperimentRun,
  deleteExperimentRun,
  retryExperimentRun,
  listOperatorDatasets,
  listOperatorFigures,
  fetchOperatorLogs,
  fetchExperimentLogs,
  axiosInstance: projectsApi,
};

// CORE LIBS
import axios from 'axios';

// CONSTANTS
const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';
const projectsApi = axios.create({
  baseURL: `${URL}/projects/`,
});

const experimentsPath = 'experiments';
const runsPath = 'runs';

// API METHODS
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
}

// EXPERIMENT RUN OPERATORS METHODS

/**
 * List Operator Datasets
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @param {string} runId Run UUID
 * @param {string} operatorId Operator UUID
 * @returns {Promise} Request Promise
 */
const listOperatorDatasets = (
  projectId,
  experimentId,
  runId,
  operatorId
) => {
  return projectsApi.get(
    `${projectId}/${experimentsPath}/${experimentId}/${runsPath}/${runId}/operators/${operatorId}/datasets`
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
 * List Operator Metrics
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @param {string} runId Run UUID
 * @param {string} operatorId Operator UUID
 * @returns {Promise} Request Promise
 */
const listOperatorMetrics = (projectId, experimentId, runId, operatorId) => {
  return projectsApi.get(
    `${projectId}/${experimentsPath}/${experimentId}/${runsPath}/${runId}/operators/${operatorId}/metrics`
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

// EXPORT DEFAULT
export default{ 
  fetchExperimentRuns,
  fetchExperimentRunStatus,
  createExperimentRun,
  deleteExperimentRun,
  retryExperimentRun,
  listOperatorDatasets,
  listOperatorFigures,
  listOperatorMetrics,
  fetchOperatorLogs
}
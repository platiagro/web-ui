// CORE LIBS
import axios from 'axios';

// CONSTANTS
const URL = process.env.REACT_APP_PIPELINES_API || 'http://localhost:8080';
const pipelinesApi = axios.create({
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
const detailExperimentRuns = (projectId, experimentId) => {
  return pipelinesApi.get(
    `${projectId}/${experimentsPath}/${experimentId}/${runsPath}`
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
  return pipelinesApi.post(
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
  return pipelinesApi.delete(
    `${projectId}/${experimentsPath}/${experimentId}/${runsPath}`
  );
};

/**
 * Detail Experiment Run
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @param {string} runId Run UUID
 * @returns {Promise} Request Promise
 */
const detailExperimentRun = (projectId, experimentId, runId) => {
  return pipelinesApi.get(
    `${projectId}/${experimentsPath}/${experimentId}/${runsPath}/${runId}`
  );
}


/**
 * Retry Experiment Run
 *
 * @param {string} projectId Project UUID
 * @param {string} experimentId Experiment UUID
 * @param {string} runId Run UUID
 * @returns {Promise} Request Promise
 */
const retryExperimentRun = (projectId, experimentId, runId) => {
  return pipelinesApi.put(
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
 * @param {number} page Page number
 * @returns {Promise} Request Promise
 */
const listOperatorDatasets = (
  projectId,
  experimentId,
  runId,
  operatorId,
  page
) => {
  return pipelinesApi.get(
    `${projectId}/${experimentsPath}/${experimentId}/${runsPath}/${runId}/operators/${operatorId}/datasets?page=${page}&page_size=10`
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
  return pipelinesApi.get(
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
  return pipelinesApi.get(
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
  return pipelinesApi.get(
    `${projectId}/${experimentsPath}/${experimentId}/${runsPath}/${runId}/operators/${operatorId}/logs`
  );
};

// EXPORT DEFAULT
export { 
  detailExperimentRuns,
  createExperimentRun,
  deleteExperimentRun,
  detailExperimentRun,
  retryExperimentRun,
  listOperatorDatasets,
  listOperatorFigures,
  listOperatorMetrics,
  fetchOperatorLogs
}
// CORE LIBS
import axios from 'axios';

// CONSTANTS
// api base url
const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';
// projects path
const projectsPath = '/projects';
// api object
const operatorsApi = axios.create({
  baseURL: `${URL}${projectsPath}`,
});
// experiments path
const experimentsPath = '/experiments';
// operators path
const operatorsPath = '/operators';

// API METHODS
/**
 * List Operators
 *
 * @param {string} projectId
 * @param experimentId
 * @returns {Promise}
 */
const listOperators = (projectId, experimentId) => {
  return operatorsApi.get(
    `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}`
  );
};

/**
 * Create Operator
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} taskId
 * @param {string[]} dependencies
 * @returns {Promise}
 */
const createOperator = (projectId, experimentId, taskId, dependencies) => {
  const body = {
    taskId: taskId,
    dependencies: dependencies,
    positionX: 0,
    positionY: 0
  };
  return operatorsApi.post(
    `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}`,
    body
  );
};

/**
 * Delete Operator
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operatorId
 * @returns {Promise}
 */
const deleteOperator = (projectId, experimentId, operatorId) => {
  return operatorsApi.delete(
    `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}/${operatorId}`
  );
};

/**
 * Update Operator
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operatorId
 * @param {object} operator
 * @returns {Promise}
 */
const updateOperator = (projectId, experimentId, operatorId, operator) => {
  return operatorsApi.patch(
    `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}/${operatorId}`,
    operator
  );
};

/**
 * Get Operator Results Dataset
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operatorId
 * @param page
 * @returns {Promise}
 */
const getOperatorResultsDataset = (
  projectId,
  experimentId,
  operatorId,
  page
) => {
  return operatorsApi.get(
    `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}/${operatorId}/datasets?page=${page}&page_size=10`
  );
};

/**
 * Get Operator Results
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operatorId
 * @returns {Promise}
 */
const getOperatorResults = (projectId, experimentId, operatorId) => {
  return operatorsApi.get(
    `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}/${operatorId}/figures`
  );
};

export const getOperatorMetrics = async (
  projectId,
  experimentId,
  operatorId
) => {
  try {
    const metrics = await operatorsApi.get(
      `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}/${operatorId}/metrics`
    );
    return metrics.data;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Get Notebook Log from Jupyter API
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operatorId
 * @returns {Promise}
 */
const getNotebookLog = (projectId, experimentId, operatorId) => {
  return operatorsApi.get(
    `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}/${operatorId}/logs`
  );
};

// EXPORT DEFAULT
export default {
  listOperators,
  createOperator,
  deleteOperator,
  updateOperator,
  getOperatorResultsDataset,
  getOperatorResults,
  getOperatorMetrics,
  getNotebookLog,
};

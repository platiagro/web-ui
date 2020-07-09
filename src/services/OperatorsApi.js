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
 * @param {string} projectId
 * @returns {Promise}
 */
const listOperators = (projectId, experimentId) => {
  return operatorsApi.get(
    `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}`
  );
};

/**
 * Create Operator
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} componentId
 * @returns {Promise}
 */
const createOperator = (projectId, experimentId, componentId) => {
  const body = {
    componentId,
  };
  return operatorsApi.post(
    `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}`,
    body
  );
};

/**
 * Delete Operator
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
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operatorId
 * @param {Object} operator
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
 * @returns {Promise}
 */
const getOperatorResultsDataset = (
  projectId,
  experimentId,
  operatorId,
  page
) => {
  return operatorsApi.get(
<<<<<<< HEAD
    `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}/${operatorId}/datasets/?page=${page}&page_size=10`
=======
    `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}/${operatorId}/datasets?page=${page}&page_size=5`
>>>>>>> d1a5c50... Send pages action change
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

// EXPORT DEFAULT
export default {
  listOperators,
  createOperator,
  deleteOperator,
  updateOperator,
  getOperatorResultsDataset,
  getOperatorResults,
  getOperatorMetrics,
};

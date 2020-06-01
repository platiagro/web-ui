// CORE LIBS
import axios from 'axios';

// CONSTANTS
// api base url
const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:3000';
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
const listOperators = (projectId, experimentId) =>
  new Promise((resolve, reject) => {
    // requesting operators
    operatorsApi
      .get(`/${projectId}${experimentsPath}/${experimentId}${operatorsPath}`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Create Operator
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} componentId
 * @returns {Promise}
 */
const createOperator = (projectId, experimentId, componentId) =>
  new Promise((resolve, reject) => {
    // creating body object
    const body = {
      componentId,
    };

    // creating operator
    operatorsApi
      .post(
        `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}`,
        body
      )
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Delete Operator
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operatorId
 * @returns {Promise}
 */
const deleteOperator = (projectId, experimentId, operatorId) =>
  new Promise((resolve, reject) => {
    // deleting operator
    operatorsApi
      .delete(
        `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}/${operatorId}`
      )
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Update Operator
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operatorId
 * @param {Object} operator
 * @returns {Promise}
 */
const updateOperator = (projectId, experimentId, operatorId, operator) =>
  new Promise((resolve, reject) => {
    // updating operator
    operatorsApi
      .patch(
        `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}/${operatorId}`,
        operator
      )
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Get Operator Results Dataset
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operatorId
 * @returns {Promise}
 */
const getOperatorResultsDataset = (projectId, experimentId, operatorId) =>
  new Promise((resolve, reject) => {
    operatorsApi
      .get(
        `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}/${operatorId}/datasets`
      )
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Get Operator Results
 *
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operatorId
 * @returns {Promise}
 */
const getOperatorResults = (projectId, experimentId, operatorId) =>
  new Promise((resolve, reject) => {
    // updating operator
    operatorsApi
      .get(
        `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}/${operatorId}/figures`
      )
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Detail Operator
 * @param {string} projectId
 * @returns {Promise}
 */
/* const detailOperator = (projectId, operatorId) =>
  new Promise((resolve, reject) => {
    // requesting operator
    operatorsApi
      .get(`/${projectId}${operatorsPath}/${operatorId}`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  }); */

// EXPORT DEFAULT
export default {
  listOperators,
  createOperator,
  deleteOperator,
  updateOperator,
  getOperatorResultsDataset,
  getOperatorResults,
  /*   detailOperator,
   */
};

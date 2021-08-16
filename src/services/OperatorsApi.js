import axios from 'axios';

import { AuthExpiredInterceptor } from './interceptors';

const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';

const operatorsApi = axios.create({
  baseURL: `${URL}/projects`,
});

operatorsApi.interceptors.response.use(
  undefined,
  AuthExpiredInterceptor.response.onRejected
);

const experimentsPath = '/experiments';
const operatorsPath = '/operators';
const parametersPath = '/parameters';

/**
 * List Operators
 *
 * @param {string} projectId Project Id
 * @param {string} experimentId Experiment Id
 * @returns {Promise} Request Promise Request Promise
 */
const listOperators = (projectId, experimentId) => {
  return operatorsApi.get(
    `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}`
  );
};

/**
 * Create Operator
 *
 * @param {string} projectId Project Id
 * @param {string} experimentId Experiment Id
 * @param {object} body Request Body
 * @returns {Promise} Request Promise
 */
const createOperator = (projectId, experimentId, body) => {
  return operatorsApi.post(
    `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}`,
    body
  );
};

/**
 * Delete Operator
 *
 * @param {string} projectId Project Id
 * @param {string} experimentId Experiment Id
 * @param {string} operatorId Operator Id
 * @returns {Promise} Request Promise
 */
const deleteOperator = (projectId, experimentId, operatorId) => {
  return operatorsApi.delete(
    `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}/${operatorId}`
  );
};

/**
 * Update Operator
 *
 * @param {string} projectId Project Id
 * @param {string} experimentId Experiment Id
 * @param {string} operatorId Operator Id
 * @param {object} operator Operator Data
 * @returns {Promise} Request Promise
 */
const updateOperator = (projectId, experimentId, operatorId, operator) => {
  return operatorsApi.patch(
    `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}/${operatorId}`,
    operator
  );
};

/**
 * Update Operator Parameter
 *
 * @param {string} projectId Project Id
 * @param {string} experimentId Experiment Id
 * @param {string} operatorId Operator Id
 * @param {object} parameterName Parameter Name
 * @param {object} parameterValue Parameter Value
 * @returns {Promise} Request Promise
 */
const updateOperatorParameter = (
  projectId,
  experimentId,
  operatorId,
  parameterName,
  parameterValue
) => {
  return operatorsApi.patch(
    `/${projectId}${experimentsPath}/${experimentId}${operatorsPath}/${operatorId}${parametersPath}/${parameterName}`,
    { value: parameterValue }
  );
};

export default {
  listOperators,
  createOperator,
  deleteOperator,
  updateOperator,
  updateOperatorParameter,
  axiosInstance: operatorsApi,
};

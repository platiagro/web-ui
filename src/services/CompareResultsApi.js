import axios from 'axios';

import { AuthExpiredInterceptor } from './interceptors';

const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';

const comparisonsApi = axios.create({
  baseURL: `${URL}/projects`,
});

comparisonsApi.interceptors.response.use(
  undefined,
  AuthExpiredInterceptor.response.onRejected
);

const comparisonsPath = '/comparisons';

/**
 * Create result comparison
 *
 * @param {string} projectId Project id
 * @returns {Promise} Request Promise
 */
const createCompareResult = (projectId) => {
  return comparisonsApi.post(`/${projectId}${comparisonsPath}`);
};

/**
 * Create result comparison
 *
 * @param {string} projectId Project id
 * @param {string} compareResultId Compare Result id
 * @returns {Promise} Request Promise
 */
const deleteCompareResult = (projectId, compareResultId) => {
  return comparisonsApi.delete(
    `/${projectId}${comparisonsPath}/${compareResultId}`
  );
};

/**
 * List result comparison
 *
 * @param {string} projectId Project id
 * @returns {Promise} Request Promise
 */
const listCompareResult = (projectId) => {
  return comparisonsApi.get(`/${projectId}${comparisonsPath}`);
};

/**
 * Update result comparison
 *
 * @param {string} projectId Project id
 * @param {string} compareResultId Compare result id
 * @param {object} body Request body
 * @returns {Promise} Request Promise
 */
const updateCompareResult = (projectId, compareResultId, body) => {
  return comparisonsApi.patch(
    `/${projectId}${comparisonsPath}/${compareResultId}`,
    body
  );
};

export default {
  createCompareResult,
  deleteCompareResult,
  listCompareResult,
  updateCompareResult,
  axiosInstance: comparisonsApi,
};

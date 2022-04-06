import { createAxiosInstance } from 'services/factories';

const marketplaceApi = createAxiosInstance({
  baseURL: process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080',
});

/**
 * Fetch the total of marketplace tasks
 *
 * @returns {Promise} Request promise
 */
const fetchTotalMarketplaceTasks = () => {
  return marketplaceApi.get('/marketplace/total');
};

/**
 * Fetch marketplace tasks.
 *
 * @param {object} filter Filter
 * @returns {Promise} Request promise
 */
const fetchMarketplaceTasks = (filter) => {
  return marketplaceApi.put(`/marketplace/tasks`, filter);
};

export default {
  fetchTotalMarketplaceTasks,
  fetchMarketplaceTasks,
  axiosInstance: marketplaceApi,
};

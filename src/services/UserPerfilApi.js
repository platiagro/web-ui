import { createAxiosInstance } from 'services/factories';

const UserNameApi = createAxiosInstance({
  baseURL: process.env.REACT_APP_MAIN_DOMAIN || 'http://localhost:8080',
});

/**
 * Returns monitorings from the API
 *
 * @returns {Promise} Get Request
 */
const getUserName = () => {
  return UserNameApi.get('/centraldashboard/api/workgroup/env-info');
};

export default {
  getUserName,
  axiosInstance: UserNameApi,
};

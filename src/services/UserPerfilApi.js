import { createAxiosInstance } from 'services/factories';

const UserNameApi = createAxiosInstance({
  baseURL: process.env.REACT_APP_CENTRALDASHBOARD_API || 'http://localhost:8080',
});

/**
 * Returns monitorings from the API
 *
 * @returns {Promise} Get Request
 */
const getUserName = () => {
  return UserNameApi.get('/api/workgroup/env-info');
};

export default {
  getUserName,
  axiosInstance: UserNameApi,
};

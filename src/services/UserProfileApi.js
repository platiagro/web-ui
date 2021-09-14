import { createAxiosInstance } from 'services/factories';

const UserProfileApi = createAxiosInstance({
  baseURL:
    process.env.REACT_APP_CENTRALDASHBOARD_API || 'http://localhost:8080',
});

/**
 * Returns name from the API
 *
 * @returns {Promise} Get Request
 */
const getUserName = () => {
  return UserProfileApi.get('/api/workgroup/env-info');
};

export default {
  getUserName,
  axiosInstance: UserProfileApi,
};

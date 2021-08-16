import axios from 'axios';

import { AuthExpiredInterceptor } from './interceptors';

const URL = process.env.REACT_APP_JUPYTER_API || 'http://localhost:8080';

const jupyterLabApi = axios.create({
  baseURL: URL,
});

jupyterLabApi.interceptors.response.use(
  undefined,
  AuthExpiredInterceptor.response.onRejected
);

const healthCheckPath = '/api';

/**
 * Returns whether JupyterLab is healthy
 *
 * @returns {Promise} Request Promise
 */
const healthCheck = () => {
  return jupyterLabApi.get(healthCheckPath);
};

export default {
  healthCheck,
  axiosInstance: jupyterLabApi,
};

import axios from 'axios';

export const URL = process.env.REACT_APP_JUPYTER_API || 'http://localhost:8080';

export const jupyterLabApi = axios.create({
  baseURL: URL,
});

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
};

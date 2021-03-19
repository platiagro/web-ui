// CORE LIBS
import axios from 'axios';

export const URL = process.env.REACT_APP_JUPYTER_API || 'http://localhost:8080';

export const jupyterLabApi = axios.create({
  baseURL: URL,
});

const healthCheckPath = '/api';

/**
 * Returns whether JupyterLab is healthy
 * @returns {Promise}
 */
const healthCheck = () => {
  return jupyterLabApi.get(healthCheckPath);
};

// EXPORT DEFAULT
export default {
  healthCheck,
};

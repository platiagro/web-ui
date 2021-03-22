// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import JupyterLabApi from 'services/JupyterLabApi';

/**
 * Check whether Jupyter is healthy.
 *
 * @returns {object} { type, healthy }
 */
export const fetchJupyterLabHealth = () => (dispatch) => {
  JupyterLabApi.healthCheck()
    .then(() => {
      dispatch(jupyterLabHealthy());
    })
    .catch(() => {
      dispatch(jupyterLabUnhealthy());
    });
};

/**
 * JupyterLab is healthy
 *
 * @returns {object} { type, healthy }
 */
export const jupyterLabHealthy = () => {
  return {
    type: actionTypes.JUPYTER_LAB_HEALTHY,
  };
};

/**
 * JupyterLab is unhealthy
 *
 * @returns {object} { type, healthy }
 */
export const jupyterLabUnhealthy = () => {
  return {
    type: actionTypes.JUPYTER_LAB_UNHEALTHY,
  };
};

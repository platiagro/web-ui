/* globals Operators */

/**
 * Implantação (Deployment).
 *
 * https://platiagro.github.io/projects/#model-Deployment
 *
 * @typedef {object} Deployment
 *
 * @property {string} createdAt	Deployment created at
 * @property {string} experimentId Deployment experiment id
 * @property {boolean} isActive	Deployment is active
 * @property {string} name Deployment name
 * @property {Operators} operators Deployment operators
 * @property {string} position Deployment position
 * @property {string} status Deployment status
 * @property {string} url Deployment url
 * @property {string} deployedAt	Deployment deployed at
 * @property {string} uuid Deployment id
 */

/**
 * Implantações (Deployments).
 *
 * https://platiagro.github.io/projects/#model-Deployments
 *
 * @typedef {object} Deployments
 *
 * @property {Deployment[]} deployments	Deployments list
 * @property {number} total	Total deployments
 */

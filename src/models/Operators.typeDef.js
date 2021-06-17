/**
 * Operador (Operator).
 *
 * https://platiagro.github.io/projects/#model-Operator
 *
 * @typedef {object} Operator
 *
 * @property {string} uuid Operator id
 * @property {string} name Operator name
 * @property {string} taskId Operator task id
 * @property {Task} task Operator task object
 * @property {string[]} dependencies Operator dependencies uuids
 * @property {object} parameters Operator parameters object
 * @property {string} experimentId Operator experiment id
 * @property {string} deploymentId Operator deployment id
 * @property {number} positionX Operator x position
 * @property {number} positionY Operator y position
 * @property {string} createdAt	Operator creation date
 * @property {string} updatedAt	Operator last update date
 * @property {'Unset' | 'Setted up' | 'Pending' | 'Running' | 'Failed' | 'Successful'} status Operator status
 * @property {string} statusMessage	Operator status message
 */

/**
 * Operadores (Operators).
 *
 * @typedef {Operator[]} Operators
 */

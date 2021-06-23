/**
 * Parâmetro (Parameter).
 *
 * https://platiagro.github.io/projects/#model-Parameter
 *
 * @typedef {object} Parameter
 *
 * @property {'string' | 'integer'} type Parameter type
 * @property {string} name Parameter name
 * @property {string} default Parameter default value
 */

/**
 * Parâmetros (Parameters).
 *
 * @typedef {Parameter[]} Parameters
 */

/**
 * Tarefa (Task).
 *
 * https://platiagro.github.io/projects/#model-Task
 *
 * @typedef {object} Task
 *
 * @property {string} uuid Task id
 * @property {string} name Task name
 * @property {string} description Task description
 * @property {'DATASETS' | 'DEFAULT' | 'DESCRIPTIVE_STATISTICS' | 'FEATURE_ENGINEERING' | 'PREDICTOR' | 'COMPUTER_VISION' | 'NLP' | 'MONITORING'} category Task category
 * @property {string[]} tags Task tags
 * @property {string} dataIn Task data input
 * @property {string} dataOut Task data output
 * @property {string} docs Task documentation
 * @property {boolean} hasNotebook Task has notebook
 * @property {string} image Task image
 * @property {string[]} commands Task commands
 * @property {string[]} arguments Task arguments
 * @property {string} cpuLimit Task cpu limit
 * @property {string} cpuRequest Task cpu request
 * @property {string} memoryLimit Task memory limit
 * @property {string} memoryRequest Task memory request
 * @property {number} readinessProbeInitialDelaySeconds Task start delay
 * @property {Parameters} parameters Task parameters
 * @property {string} createdAt	Task creation date
 * @property {string} updatedAt	Task last update date
 */

/**
 * Tarefas (Tasks).
 *
 * @typedef {Task[]} Tasks
 */

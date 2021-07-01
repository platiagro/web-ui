/* globals Tasks */

/**
 * Template.
 *
 * https://platiagro.github.io/projects/#model-Templates
 *
 * @typedef {object} Template
 *
 * @property {string} uuid Template id
 * @property {string} name Template name
 * @property {Tasks} tasks Template tasks
 * @property {string} createdAt	Template creation date
 * @property {string} updatedAt	Template last update date
 */

/**
 * Templates.
 *
 * @typedef {Template[]} Templates
 */

/**
 * Template Creatable.
 *
 * @typedef {object} TemplateCreatable
 *
 * @property {string} name Template name
 * @property {string=} experimentId Experiment id to create template
 * @property {string=} deploymentId Deployment id to create template
 */

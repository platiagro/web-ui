// CORE LIBS
import axios from 'axios';

// CONSTANTS
// api base url
const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';
// api object
const templatesApi = axios.create({
  baseURL: URL,
});
// templates path
const templatesPath = '/templates';

// API METHODS
/**
 * List Templates
 * @returns {Promise}
 */
const listTemplates = () =>
  new Promise((resolve, reject) => {
    // requesting templates
    templatesApi
      .get(templatesPath)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Create Template
 * @param {string} templateName
 * @param {string} experimentId
 * @returns {Promise}
 */
const createTemplate = (templateName, experimentId) =>
  new Promise((resolve, reject) => {
    // creating body object
    const body = {
      name: templateName,
      experimentId,
    };

    // creating template
    templatesApi
      .post(templatesPath, body)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Detail Template
 * @param {string} templateId
 * @returns {Promise}
 */
/* const detailTemplate = (templateId) =>
  new Promise((resolve, reject) => {
    // requesting template
    templatesApi
      .get(`${templatesPath}/${templateId}`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  }); */

/**
 * Update Template
 * @param {string} templateId
 * @param {string} templateName
 * @returns {Promise}
 */
/* const updateTemplate = (templateId, templateName) =>
  new Promise((resolve, reject) => {
    // creating body object
    const body = {
      name: templateName,
    };

    // updating template
    templatesApi
      .patch(`${templatesPath}/${templateId}`, body)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  }); */

/**
 * Delete Template
 * @param {string} templateId
 * @returns {Promise}
 */
/* const deleteTemplate = (templateId) =>
  new Promise((resolve, reject) => {
    // deleting template
    templatesApi
      .delete(`${templatesPath}/${templateId}`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  }); */

// EXPORT DEFAULT
export default {
  listTemplates,
  createTemplate,
  /*   detailTemplate,
  updateTemplate,
  deleteTemplate, */
};

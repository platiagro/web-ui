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
const listTemplates = () => {
  return templatesApi.get(templatesPath);
};

/**
 * Create Template
 * @param {string} templateName
 * @param {string} experimentId
 * @returns {Promise}
 */
const createTemplate = (templateName, experimentId) => {
  const body = {
    name: templateName,
    experimentId,
  };
  return templatesApi.post(templatesPath, body);
};

/**
 * Delete Template
 * @param {string} templateId
 * @returns {Promise}
 */
const deleteTemplate = (templateId) => {
    return templatesApi.delete(`${templatesPath}/${templateId}`);
};

// EXPORT DEFAULT
export default {
  listTemplates,
  createTemplate,
  deleteTemplate,
};

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
 *
 * @returns {Promise}
 */
const listTemplates = () => {
  return templatesApi.get(templatesPath);
};

/**
 * Create Template
 * 
 * @param {string} templateName Template name
 * @param {string} experimentId Experiment UUID
 * 
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
 * Update Template
 * 
 * @param {string} templateId Template UUID
 * @param {string} templateName Template new name
 * 
 * @returns {Promise}
 */
const updateTemplate = (templateId, templateName) => {
  const body = {
    name: templateName,
  };
  return templatesApi.patch(`${templatesPath}/${templateId}`, body);
};

/**
 * Delete Template
 * 
 * @param {string} templateId Template UUID
 * 
 * @returns {Promise}
 */
const deleteTemplate = (templateId) => {
    return templatesApi.delete(`${templatesPath}/${templateId}`);
};

// EXPORT DEFAULT
export default {
  listTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
};

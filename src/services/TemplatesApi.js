import axios from 'axios';

const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';

const templatesApi = axios.create({
  baseURL: URL,
});

const templatesPath = '/templates';

/**
 * List Templates
 *
 * @returns {Promise} Request Promise
 */
const listTemplates = () => {
  return templatesApi.get(templatesPath);
};

/**
 * Create Template
 *
 * @param {string} templateName Template name
 * @param {string} experimentId Experiment UUID
 * @returns {Promise} Request Promise
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
 * @returns {Promise} Request Promise
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
 * @returns {Promise} Request Promise
 */
const deleteTemplate = (templateId) => {
  return templatesApi.delete(`${templatesPath}/${templateId}`);
};

export default {
  listTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
};

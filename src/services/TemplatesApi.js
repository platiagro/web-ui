// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global TemplateCreatable */

/* API REFERENCE: https://platiagro.github.io/projects/#/Templates */

import axios from 'axios';

import { AuthExpiredInterceptor } from './interceptors';

const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';

const templatesApi = axios.create({
  baseURL: URL,
});

templatesApi.interceptors.response.use(
  AuthExpiredInterceptor.Response.onFulfilled,
  AuthExpiredInterceptor.Response.onRejected
);

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
 * @param {TemplateCreatable} template Template creatable object
 * @returns {Promise} Request Promise
 */
const createTemplate = (template) => {
  return templatesApi.post(templatesPath, template);
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
 * @param {string[]} templates Templates UUID list
 * @returns {Promise} Request Promise
 */
const deleteTemplate = (templates) => {
  return templatesApi.post(`${templatesPath}/deletetemplates`, templates);
};

export default {
  listTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  axiosInstance: templatesApi,
};

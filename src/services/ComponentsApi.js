// CORE LIBS
import axios from 'axios';

// CONSTANTS
// api base url
const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:3000';
// api object
const componentsApi = axios.create({
  baseURL: URL,
});
// components path
const componentsPath = '/components';

// API METHODS
/**
 * List Components
 * @returns {Promise}
 */
const listComponents = () =>
  new Promise((resolve, reject) => {
    // requesting components
    componentsApi
      .get(componentsPath)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Detail Component
 * @param {string} componentId
 * @returns {Promise}
 */
/* const detailComponent = (componentId) =>
  new Promise((resolve, reject) => {
    // requesting component
    componentsApi
      .get(`${componentsPath}/${componentId}`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  }); */

/**
 * Create Component
 * @param {string} componentName
 * @returns {Promise}
 */
/* const createComponent = (componentName) =>
  new Promise((resolve, reject) => {
    // creating body object
    const body = {
      name: componentName,
    };

    // creating component
    componentsApi
      .post(componentsPath, body)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  }); */

/**
 * Update Component
 * @param {string} componentId
 * @param {string} componentName
 * @returns {Promise}
 */
/* const updateComponent = (componentId, componentName) =>
  new Promise((resolve, reject) => {
    // creating body object
    const body = {
      name: componentName,
    };

    // updating component
    componentsApi
      .patch(`${componentsPath}/${componentId}`, body)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  }); */

/**
 * Delete Component
 * @param {string} componentId
 * @returns {Promise}
 */
/* const deleteComponent = (componentId) =>
  new Promise((resolve, reject) => {
    // deleting component
    componentsApi
      .delete(`${componentsPath}/${componentId}`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  }); */

// EXPORT DEFAULT
export default {
  listComponents,
  /*   detailComponent,
  createComponent,
  updateComponent,
  deleteComponent, */
};

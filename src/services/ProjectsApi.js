// CORE LIBS
import axios from 'axios';

// CONSTANTS
// url
const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:3000';
// api object
const projectsApi = axios.create({
  baseURL: URL,
});

// API METHODS
/**
 * List Projects
 * @returns {Promise}
 */
const listProjects = () =>
  new Promise((resolve, reject) => {
    // requesting projects
    projectsApi
      .get(`/projects`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Detail Project
 * @param {string} projectId
 * @returns {Promise}
 */
const detailProject = (projectId) =>
  new Promise((resolve, reject) => {
    // requesting project
    projectsApi
      .get(`/projects/${projectId}`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Create Project
 * @param {string} projectName
 * @returns {Promise}
 */
const createProject = (projectName) =>
  new Promise((resolve, reject) => {
    // creating body object
    const body = {
      name: projectName,
    };

    // requesting project
    projectsApi
      .post(`/projects`, body)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Update Project
 * @param {string} projectId
 * @param {string} projectName
 * @returns {Promise}
 */
const updateProject = (projectId, projectName) =>
  new Promise((resolve, reject) => {
    // creating body object
    const body = {
      name: projectName,
    };

    // requesting project
    projectsApi
      .patch(`/projects/${projectId}`, body)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

export default { listProjects, detailProject, createProject, updateProject };

// TODO: implementar delete project (não encontrei referencia)

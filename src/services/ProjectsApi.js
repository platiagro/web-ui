// CORE LIBS
import axios from 'axios';

// CONSTANTS
// api base url
const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:3000';
// api object
const projectsApi = axios.create({
  baseURL: URL,
});
// projects path
const projectsPath = '/projects';

// API METHODS
/**
 * List Projects
 * @returns {Promise}
 */
const listProjects = () =>
  new Promise((resolve, reject) => {
    // requesting projects
    projectsApi
      .get(projectsPath)
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
      .get(`${projectsPath}/${projectId}`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Create Project
 * @param {string} projectName
 * @param {string} projectDescription
 * @returns {Promise}
 */
const createProject = (projectName, projectDescription) =>
  new Promise((resolve, reject) => {
    // creating body object
    const body = {
      name: projectName,
      description: projectDescription,
    };
    // creating project
    projectsApi
      .post(projectsPath, body)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Update Project
 * @param {string} projectId
 * @param {string} projectName
 * @param {string} projectDescription
 * @returns {Promise}
 */
const updateProject = (projectId, projectName, projectDescription) =>
  new Promise((resolve, reject) => {
    // creating body object
    const body = {
      name: projectName,
      description: projectDescription,
    };

    // updating project
    projectsApi
      .patch(`${projectsPath}/${projectId}`, body)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Delete Project
 * @param {string} projectId
 * @returns {Promise}
 */
const deleteProject = (projectId) =>
  new Promise((resolve, reject) => {
    // deleting project
    projectsApi
      .delete(`${projectsPath}/${projectId}`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

// EXPORT DEFAULT
export default {
  listProjects,
  detailProject,
  createProject,
  updateProject,
  deleteProject,
};

/* globals ProjectUpdatable */

/* API REFERENCE: https://platiagro.github.io/projects/#/Projects */

// CORE LIBS
import axios from 'axios';

// CONSTANTS
// api base url
const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';
// api object
const projectsApi = axios.create({
  baseURL: URL,
});
// projects path
const projectsPath = '/projects';

// API METHODS
/**
 * Detail Project
 *
 * @param {string} projectId
 * @returns {Promise}
 */
const detailProject = (projectId) => {
  return projectsApi.get(`${projectsPath}/${projectId}`);
};

/**
 * Create Project
 *
 * @param {string} projectName
 * @param {string} projectDescription
 * @returns {Promise}
 */
const createProject = (projectName, projectDescription) => {
  const body = {
    name: projectName,
    description: projectDescription,
  };
  return projectsApi.post(projectsPath, body);
};

/**
 * Update Project
 *
 * @param {string} projectId Project id to update
 * @param {ProjectUpdatable} projectUpdate New project data
 * @returns {Promise} Update project request
 */
const updateProject = (projectId, projectUpdate) => {
  return projectsApi.patch(`${projectsPath}/${projectId}`, projectUpdate);
};

/**
 * Delete Projects
 *
 * @param {Array} projects
 * @returns {Promise}
 */
const deleteProjects = (projects) => {
  return projectsApi.post(`${projectsPath}/deleteprojects`, projects);
};

/**
 * Get paginated projects
 *
 * @param {string} name
 * @param {number} page
 * @param {number} pageSize
 * @returns {Promise}
 */
const getPaginatedProjects = (name, page, pageSize) => {
  return projectsApi.get(
    `${projectsPath}?name=${name}&page=${page}&page_size=${pageSize}`
  );
};

// EXPORT DEFAULT
export default {
  detailProject,
  createProject,
  updateProject,
  deleteProjects,
  getPaginatedProjects,
};

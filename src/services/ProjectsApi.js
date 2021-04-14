/* globals ProjectUpdatable, ProjectCreatable, Projects */

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
 * Fetch Project
 *
 * @param {string} projectId Project id to fetch
 * @returns {Promise} Fetch project request
 */
const fetchProject = (projectId) => {
  return projectsApi.get(`${projectsPath}/${projectId}`);
};

/**
 * Create Project
 *
 * @param {ProjectCreatable} project Objeto de criação do projeto
 * @returns {Promise} Create project request
 */
const createProject = (project) => {
  return projectsApi.post(projectsPath, project);
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
 * @param {Projects} projects Projects to delete
 * @returns {Promise} Delete projects request
 */
const deleteProjects = (projects) => {
  return projectsApi.post(`${projectsPath}/deleteprojects`, projects);
};

/**
 * Fetch paginated projects
 *
 * @param {string} name Project filter name
 * @param {number} page Projects table current page
 * @param {number} pageSize Projects table page size
 * @returns {Promise} Fetch paginated projects request
 */
const fetchPaginatedProjects = (name, page, pageSize) => {
  return projectsApi.get(
    `${projectsPath}?name=${name}&page=${page}&page_size=${pageSize}`
  );
};

// EXPORT DEFAULT
export default {
  fetchProject,
  createProject,
  updateProject,
  deleteProjects,
  fetchPaginatedProjects,
};

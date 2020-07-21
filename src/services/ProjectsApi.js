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
 * List Projects
 * @returns {Promise}
 */
const listProjects = () => {
  return projectsApi.get(projectsPath);
};

/**
 * Detail Project
 * @param {string} projectId
 * @returns {Promise}
 */
const detailProject = (projectId) => {
  return projectsApi.get(`${projectsPath}/${projectId}`);
};

/**
 * Create Project
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
 * @param {string} projectId
 * @param {string} projectName
 * @param {string} projectDescription
 * @returns {Promise}
 */
const updateProject = (projectId, projectName, projectDescription) => {
  const body = {
    name: projectName,
    description: projectDescription,
  };

  if (projectDescription === undefined) {
    delete body.description;
  }

  return projectsApi.patch(`${projectsPath}/${projectId}`, body);
};

/**
 * Delete Project
 * @param {string} projectId
 * @returns {Promise}
 */
const deleteProject = (projectId) => {
  return projectsApi.delete(`${projectsPath}/${projectId}`);
};

/**
 * Delete Projects
 * @param {Array} projects
 * @returns {Promise}
 */
const deleteProjects = (projects) => {
  return projectsApi.post(`${projectsPath}/deleteprojects`, projects);
};

/**
 * Get paginated projects
 * @param {String} name
 * @param {Number} page
 * @param {Number} pageSize
 * @returns {Promise}
 */
export const getPaginatedProjects = (name, page, pageSize) => {
  return projectsApi.get(
    `${projectsPath}/?name=${name}&page=${page}&page_size=${pageSize}`
  );
};

// EXPORT DEFAULT
export default {
  listProjects,
  detailProject,
  createProject,
  updateProject,
  deleteProject,
  deleteProjects,
  getPaginatedProjects,
};

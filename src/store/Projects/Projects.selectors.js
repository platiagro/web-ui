/* globals Projects, AppStore */

/**
 * Get all projects from store
 *
 * @param {AppStore} state Redux store state
 * @returns {Projects} Projects list
 */
const getProjects = (state) => state.Projects.projects;

/**
 * Get all selected projects from store
 *
 * @param {AppStore} state Redux store state
 * @returns {Projects} Projects list
 */
const getSelectedProjects = (state) => state.Projects.selectedProjects;

/**
 * Get project from store
 *
 * @param {string} projectId Project id
 * @param {AppStore} state Redux store state
 * @returns {Projects} Projects list
 */
const getProject = (projectId, state) =>
  state.Projects.projects.find((project) => project.uuid === projectId);

// TODO: Remover essa lógica da store
/**
 * Get search filter text
 *
 * @param {AppStore} state Redux store state
 * @returns {string} Search filter text
 */
const getSearchText = (state) => state.Projects.searchText;

// TODO: Remover essa lógica da store
/**
 * Get table current page
 *
 * @param {AppStore} state Redux store state
 * @returns {number} Table current page
 */
const getCurrentPage = (state) => state.Projects.currentPage;

// TODO: Remover essa lógica da store
/**
 * Get total projects entries
 *
 * @param {AppStore} state Redux store state
 * @returns {number} Table total entries
 */
const getTotalProjects = (state) => state.Projects.total;

// TODO: Remover essa lógica da store
/**
 * Get table page size
 *
 * @param {AppStore} state Redux store state
 * @returns {number} Table page size
 */
const getPageSize = (state) => state.Projects.pageSize;

export {
  getProjects,
  getProject,
  getSelectedProjects,
  getSearchText,
  getCurrentPage,
  getTotalProjects,
  getPageSize,
};

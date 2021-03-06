// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global Project, Projects, AppStores */

/**
 * Get all projects from store
 *
 * @param {AppStores} state Redux store state
 * @returns {Projects} Projects list
 */
const getProjects = (state) => state.Projects.projects;

/**
 * Get all selected projects from store
 *
 * @param {AppStores} state Redux store state
 * @returns {Projects} Projects list
 */
const getSelectedProjects = (state) => state.Projects.selectedProjects;

/**
 * Get project from store
 *
 * @param {string} projectId Project id
 * @param {AppStores} state Redux store state
 * @returns {Project} Projects list
 */
const getProject = (projectId, state) => {
  const { Projects: ProjectsStore } = state;
  const { projects } = ProjectsStore;

  /** @type {Project}  */
  let project = {
    uuid: '',
    name: '',
    description: '',
    experiments: [],
    deployments: [],
    createdAt: '',
    updatedAt: '',
    hasExperiment: '',
    hasDeployment: '',
    hasPreDeployment: '',
  };

  if (projects?.length > 0)
    project = projects.find((projectItem) => projectItem.uuid === projectId);

  return project;
};

// TODO: Remover essa lógica da store
/**
 * Get search filter text
 *
 * @param {AppStores} state Redux store state
 * @returns {string} Search filter text
 */
const getSearchText = (state) => state.Projects.searchText;

// TODO: Remover essa lógica da store
/**
 * Get table current page
 *
 * @param {AppStores} state Redux store state
 * @returns {number} Table current page
 */
const getCurrentPage = (state) => state.Projects.currentPage;

// TODO: Remover essa lógica da store
/**
 * Get total projects entries
 *
 * @param {AppStores} state Redux store state
 * @returns {number} Table total entries
 */
const getTotalProjects = (state) => state.Projects.total;

// TODO: Remover essa lógica da store
/**
 * Get table page size
 *
 * @param {AppStores} state Redux store state
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

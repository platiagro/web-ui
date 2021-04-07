/* globals Experiment */

/**
 * Projeto (Project).
 *
 * @typedef {object} Project
 *
 * @property {string} uuid Project id
 * @property {string} name Project name
 * @property {string} description	Project description
 * @property {Experiment[]} experiments Project experiments list
 * @property {string} createdAt	Project creation date
 * @property {string} updatedAt	Project last update date
 * @property {string} hasExperiment	Project has experiment
 * @property {string} hasDeployment	Project has deployment
 * @property {string} hasPreDeployment Project has pre deployment
 */

/**
 * Projetos (Projects).
 *
 * @typedef {Project[]} Projects
 */

// TODO: Refatorar store (da para remover detalhes de paginação, filtro e seleção)
/**
 * Store Projetos (ProjectsStore).
 *
 * @typedef {object} ProjectsStore
 * @property {Projects} projects Projects list
 * @property {Projects} selectedProjects Selected projects list
 * @property {string} searchText Text to filter projects
 * @property {number} currentPage Current page of projects list table
 * @property {number} pageSize Page size of projects list table
 * @property {number} total Total entries of projects list table
 * @property {boolean} isLoading Projects store is loading
 */

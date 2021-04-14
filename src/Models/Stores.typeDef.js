/* globals Projects */

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

/**
 * Stores da aplicação (AppStores).
 *
 * @typedef {object} AppStores
 * @property {ProjectsStore} Projects Projects store
 */
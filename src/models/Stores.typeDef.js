/* globals Projects, Templates, Tasks, Deployment */

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
 */

/**
 * Store Templates (TemplatesStore).
 *
 * @typedef {Templates} TemplatesStore
 */

/**
 * Store Operator (OperatorStore).
 *
 * @typedef {object} OperatorStore
 * @property {string} icon Operator icon
 * @property {string} name Operator name
 * @property {number} position Operator sequential position
 * @property {string} uuid Operator id
 * @property {boolean} selected Operator is selected
 * @property {string} dataset Operator dataset
 * @property {string[]} figures Operator result figures
 * @property {object[]} logs Operator logs
 * @property {object[]} parameters Operator parameters
 */

/**
 * Store Operators (OperatorsStore).
 *
 * @typedef {OperatorStore[]} OperatorsStore
 */

/**
 * Tasks (TasksStore).
 *
 * @typedef {object} TasksStore
 * @property {boolean} editModalIsVisible Task edit modal is visible
 * @property {string} errorMessage Task error message
 * @property {boolean} modalIsVisible Task modal is visible
 * @property {string} modalValidateStatus Task modal validate status id
 * @property {object} newTaskRecord New task record
 * @property {number} pageSize Tasks page size
 * @property {Tasks} tasks Tasks
 * @property {number} totalTasks Total tasks in page
 * @property {object} taskData Task data
 */

/**
 * Store Deployments (DeploymentsStore).
 *
 * @typedef {Deployment[]} DeploymentsStore
 */

/**
 * Stores da aplicação (AppStores).
 *
 * @typedef {object} AppStores
 * @property {ProjectsStore} Projects Projects store
 * @property {TemplatesStore} Templates Templates store
 * @property {OperatorsStore} operatorsReducer Operators store
 * @property {OperatorStore} operatorReducer Operator store
 * @property {TasksStore} tasksReducer Tasks store
 * @property {DeploymentsStore} deploymentsReducer Deployments store
 */

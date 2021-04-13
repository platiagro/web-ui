/* globals Experiments, Deployments */
// TODO: Criar Experiments type def (model)

/**
 * Projeto (Project).
 *
 * https://platiagro.github.io/projects/#model-Project
 *
 * @typedef {object} Project
 *
 * @property {string} uuid Project id
 * @property {string} name Project name
 * @property {string} description	Project description
 * @property {Experiments} experiments Project experiments list
 * @property {Deployments} deployments Project deployments list
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

/**
 * Propriedades atualizáveis do projeto (ProjectUpdatable).
 *
 * @typedef {object} ProjectUpdatable
 *
 * @property {string=} name Project name
 * @property {string=} description	Project description
 */

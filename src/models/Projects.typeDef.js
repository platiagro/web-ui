/* globals Operators, Deployment */

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
 * @property {Deployment[]} deployments Project deployments list
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

/**
 * Propriedades de criação do projeto (ProjectCreatable).
 *
 * @typedef {object} ProjectCreatable
 *
 * @property {string} name Project name
 * @property {string} description	Project description
 */

/**
 * Experimento (Experiment).
 *
 * https://platiagro.github.io/projects/#model-Experiment
 *
 * @typedef {object} Experiment
 *
 * @property {string} uuid Experiment id
 * @property {string} name Experiment name
 * @property {string} position Experiment position
 * @property {boolean} isActive	Experiment is active
 * @property {string} projectId Project id
 * @property {Operators} operators Experiment operators
 * @property {string} createdAt	Project creation date
 * @property {string} updatedAt	Project last update date
 */

/**
 * Experimentos (Experiments).
 *
 * @typedef {Experiment[]} Experiments
 */

/**
 * Propriedades de criação do experimento (ExperimentCreatable).
 *
 * @typedef {object} ExperimentCreatable
 *
 * @property {string} name Experiment name
 * @property {string} copyFrom	Copy experiment from (experiment id)
 */

/**
 * Propriedades atualizáveis do experimento (ExperimentUpdatable).
 *
 * @typedef {object} ExperimentUpdatable
 *
 * @property {string=} name Experiment name
 * @property {number=} position	Experiment position
 * @property {boolean=} isActive	Experiment is active
 * @property {string=} templateId Template id
 */

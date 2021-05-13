// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global Experiments, Experiment, AppStores */

import { getProject } from '../projects.selectors';

/**
 * Get all experiments from project
 *
 * @param {AppStores} state Application store
 * @param {string} projectId Project id
 * @returns {Experiments} Project experiments
 */
const getExperiments = (state, projectId) => {
  const project = getProject(projectId, state);

  return project.experiments;
};

/**
 * Get experiment from project
 *
 * @param {object} state state
 * @param {string} projectId Project id
 * @param {string} experimentId Experiment UUID
 * @returns {Experiment} Experiment
 */
const getExperiment = (state, projectId, experimentId) => {
  const experiments = getExperiments(state, projectId);

  let experiment = {
    uuid: '',
    name: '',
    position: 0,
    isActive: false,
    projectId: '',
    operators: [],
    createdAt: '',
    updatedAt: '',
  };

  if (experiments?.length > 0 && experimentId)
    experiment = experiments.find(
      (experimentItem) => experimentItem.uuid === experimentId
    );

  return experiment;
};

export { getExperiments, getExperiment };

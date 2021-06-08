// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global Experiments, Experiment, AppStores */

import utils from 'utils';
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
 * Get experiment from project and succeeded status
 *
 * @param {object} state state
 * @param {string} projectId Project id
 * @param {string} experimentId Experiment UUID
 * @returns {Experiment} Experiment
 */
const getExperiment = (state, projectId, experimentId) => {
  const experiments = getExperiments(state, projectId);

  const defaultExperiment = {
    uuid: '',
    name: '',
    position: 0,
    isActive: false,
    projectId: '',
    operators: [],
    createdAt: '',
    updatedAt: '',
    succeeded: false,
  };

  if (experiments?.length > 0 && experimentId) {
    const experiment = experiments.find(({ uuid }) => uuid === experimentId);
    if (!experiment) return defaultExperiment;

    experiment.succeeded = false;
    if (experiment?.operators?.length > 0) {
      experiment.succeeded = utils.checkExperimentSuccess(experiment);
    }

    return experiment;
  }

  return defaultExperiment;
};

export { getExperiments, getExperiment };

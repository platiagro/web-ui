/* global Experiments, Projects */

/**
 * Delete experiment and reorganizes the experiment list
 *
 * @param {object[]} experiments experiments list
 * @param {string} experimentId deleted experiment id
 * @returns {object[]} new experiment list
 */
export const deleteExperiment = (experiments, experimentId) => {
  // ! NOT A CLONE = they are in the same memory address = MODIFYING PARAM
  const experimentsAux = experiments;

  const experimentIndex = experimentsAux.findIndex(
    (experiment) => experiment.uuid === experimentId
  );

  // split experiments list in two in the experimentIndex
  let splittedExperiments = experimentsAux.splice(experimentIndex);
  // remove experiment from list
  splittedExperiments = splittedExperiments.splice(1);
  // shift splitted experiments position
  splittedExperiments = splittedExperiments.map((experiment) => ({
    ...experiment,
    position: experiment.position - 1,
  }));

  return experimentsAux.concat(splittedExperiments);
};

/**
 * Organize experiments list
 *
 * @param {object[]} experiments experiments list
 * @param {string} dragExperimentId drag experiment id
 * @param {string} hoverExperimentId hover experiment id
 * @returns {object[]} new experiment list
 */
export const organizeExperiments = (
  experiments,
  dragExperimentId,
  hoverExperimentId
) => {
  const dragExperiment = experiments.find(
    ({ uuid }) => uuid === dragExperimentId
  );

  const hoverExperiment = experiments.find(
    ({ uuid }) => uuid === hoverExperimentId
  );

  const experimentsClone = [...experiments];

  const [experimentToMove] = experimentsClone.splice(
    dragExperiment.position,
    1
  );

  experimentsClone.splice(hoverExperiment.position, 0, experimentToMove);

  return experimentsClone.map((experiment, index) => ({
    ...experiment,
    position: index,
  }));
};

/**
 * Check if experiment is succeeded
 *
 * @param {object} experiment experiment
 * @param {object[]} experiment.operators experiment operators list
 * @returns {boolean} experiment is succeeded
 */
export const checkExperimentSuccess = (experiment) => {
  let experimentIsSucceeded = false;

  if (experiment.operators.length > 0) {
    experimentIsSucceeded = experiment.operators.every((operator) => {
      return operator.status === 'Succeeded';
    });
  }

  return experimentIsSucceeded;
};

/**
 * Change project experiments
 *
 * @param {Projects} projects projects list
 * @param {string} projectId project Id
 * @param {Experiments} newExperiments new experiment list
 * @returns {Projects} new projects list
 */
export const changeProjectExperiments = (
  projects,
  projectId,
  newExperiments
) => {
  return projects.map((projectItem) =>
    projectItem.uuid === projectId
      ? { ...projectItem, experiments: newExperiments }
      : projectItem
  );
};

/**
 * Change experiment succeeded status
 *
 * @param {Experiments} experiments experiments list
 * @param {string} experimentId experiment id
 * @param {boolean} succeeded is succeeded?
 * @returns {Experiments} new experiment list
 */
export const changeExperimentSucceededStatus = (
  experiments,
  experimentId,
  succeeded
) => {
  return experiments.map((experiment) => {
    return experiment.uuid === experimentId
      ? { ...experiment, succeeded: succeeded }
      : { ...experiment };
  });
};

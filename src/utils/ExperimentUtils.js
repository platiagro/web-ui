/* global Experiments, Projects */

/**
 * Delete experiment and reorganizes the experiment list
 *
 * @param {object[]} experiments Experiments list
 * @param {string} experimentId Deleted experiment id
 * @returns {object[]} New experiment list
 */
export const deleteExperiment = (experiments, experimentId) => {
  const experimentsAux = experiments;
  const experimentIndex = experimentsAux.findIndex(
    (experiment) => experiment.uuid === experimentId
  );

  // Split experiments list in two in the experimentIndex
  let splittedExperiments = experimentsAux.splice(experimentIndex);
  // Remove experiment from list
  splittedExperiments = splittedExperiments.splice(1);
  // Shift splitted experiments position
  splittedExperiments = splittedExperiments.map((experiment) => ({
    ...experiment,
    position: experiment.position - 1,
  }));

  return experimentsAux.concat(splittedExperiments);
};

/**
 * Organize experiments list
 *
 * @param {object[]} experiments Experiments list
 * @param {string} dragExperimentId Drag experiment id
 * @param {string} hoverExperimentId Hover experiment id
 * @returns {object[]} New experiment list
 */
export const organizeExperiments = (
  experiments,
  dragExperimentId,
  hoverExperimentId
) => {
  const experimentsAux = experiments;

  const dragExperimentIndex = experimentsAux.findIndex(
    (experiment) => experiment.uuid === dragExperimentId
  );

  const hoverExperimentIndex = experimentsAux.findIndex(
    (experiment) => experiment.uuid === hoverExperimentId
  );

  // moving to end
  if (dragExperimentIndex < hoverExperimentIndex) {
    // splitting a copy of experiments list to hover experiment index
    let splittedExperiments = experimentsAux.slice(
      dragExperimentIndex,
      hoverExperimentIndex + 1
    );

    // splitting drag experiment from list
    const dragExperiment = splittedExperiments.splice(0, 1)[0];

    // setting drag experiment position to hover position
    dragExperiment.position = [...splittedExperiments].pop().position;

    // shifting splitted experiments position
    splittedExperiments = splittedExperiments.map((experiment) => ({
      ...experiment,
      position: experiment.position - 1,
    }));

    // adding drag experiment to spplited experiments
    splittedExperiments = splittedExperiments.concat(dragExperiment);

    // replacing reorganized block the experiment list
    experimentsAux.splice(
      dragExperimentIndex,
      splittedExperiments.length,
      ...splittedExperiments
    );
  }

  // moving to start
  if (dragExperimentIndex > hoverExperimentIndex) {
    // splitting a copy of experiments list to hover experiment index
    let splittedExperiments = experimentsAux.slice(
      hoverExperimentIndex,
      dragExperimentIndex + 1
    );

    // splitting drag experiment from list
    const dragExperiment = splittedExperiments.pop();

    // setting drag experiment position to hover position
    dragExperiment.position = splittedExperiments[0].position;

    // shifting splitted experiments position
    splittedExperiments = splittedExperiments.map((experiment) => ({
      ...experiment,
      position: experiment.position + 1,
    }));

    // adding drag experiment to splitted experiments
    splittedExperiments.unshift(dragExperiment);

    // replacing reorganized block the experiment list
    experimentsAux.splice(
      hoverExperimentIndex,
      splittedExperiments.length,
      ...splittedExperiments
    );
  }

  // returning new experiment list ordened by position
  return experimentsAux.sort((a, b) => {
    if (a.position < b.position) {
      return -1;
    }
    if (a.position > b.position) {
      return 1;
    }
    return 0;
  });
};

/**
 * Check if experiment is succeeded
 *
 * @param {object} experiment Experiment
 * @param {object[]} experiment.operators Experiment operators list
 * @returns {boolean} Experiment is succeeded
 */
export const checkExperimentSuccess = (experiment) => {
  let experimentIsSucceeded = false;

  if (experiment.operators.length > 0)
    experimentIsSucceeded = experiment.operators.every((operator) => {
      return operator.status === 'Succeeded';
    });

  return experimentIsSucceeded;
};

/**
 * Change project experiments
 *
 * @param {Projects} projects Projects list
 * @param {string} projectId Project Id
 * @param {Experiments} newExperiments New experiment list
 * @returns {Projects} New projects list
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
 * Change succeeded status of experiment
 *
 * @param {Experiments} experiments Experiments list
 * @param {string} experimentId Experiment id
 * @param {boolean} succeeded Is succeeded?
 * @returns {Experiments} New experiment list
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

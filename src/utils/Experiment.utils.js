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
  // ! NOT A CLONE = they are in the same memory address = MODIFYING PARAM
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

  // returning new experiment list ordered by position
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

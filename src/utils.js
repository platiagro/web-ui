/**
 * Delete Experiment
 * Method to delete experiment and reorganize list
 * @param {Object[]} experiments experiments list
 * @param {string} experimentId deleted experiment id
 * @returns {Object[]} new experiments list
 */
const deleteExperiment = (experiments, experimentId) => {
  // experiments aux
  const experimentsAux = experiments;

  // getting experiment index
  const experimentIndex = experimentsAux.findIndex(
    (experiment) => experiment.uuid === experimentId
  );

  // splitting experiments list in experiment index
  let splittedExperiments = experimentsAux.splice(experimentIndex);
  // removing experiment from list
  splittedExperiments = splittedExperiments.splice(1);
  // shifting splitted experiments position
  splittedExperiments = splittedExperiments.map((experiment) => ({
    ...experiment,
    position: experiment.position - 1,
  }));

  // returning new experiment list
  return experimentsAux.concat(splittedExperiments);
};

/**
 * Organize Experiments
 * Method to organize experiments list
 * @param {Object[]} experiments experiments list
 * @param {string} dragExperimentId drag experiment id
 * @param {string} hoverExperimentId hover experiment id
 * @returns {Object[]} new experiments list
 */
const organizeExperiments = (
  experiments,
  dragExperimentId,
  hoverExperimentId
) => {
  // experiments aux
  const experimentsAux = experiments;

  // getting drag experiment index
  const dragExperimentIndex = experimentsAux.findIndex(
    (experiment) => experiment.uuid === dragExperimentId
  );
  // getting hover experiment index
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

    // adding drag experiment to spplited experiments
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

// EXPORT DEFAULT
export default { deleteExperiment, organizeExperiments };

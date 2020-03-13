// ACTION TYPES
import actionTypes from './actionTypes';

// MOCKS
import experimentsMock from '../../components/Content/ProjectContent/ExperimentsTabs/_/_experimentsMock';

// ACTIONS
/**
 * fetch experiments action
 * @returns {type, experiments}
 */
export const fetchExperiments = () => ({
  type: actionTypes.FETCH_EXPERIMENTS,
  experiments: experimentsMock,
});

// TODO: passar lógica para o backend?
/**
 * fetch projects action
 * @param {number} experimentPos
 * @param {number} newPos
 * @returns {type, experiments}
 */
export const organizeExperiments = (experimentKey, hoverKey) => {
  // getting experiments
  const orderedExperiments = experimentsMock;
  // getting experiment position
  const experimentPosition = orderedExperiments.find(
    (experiment) => experiment.key === experimentKey
  ).position;
  // getting hover position
  const hoverPosition = orderedExperiments.find(
    (experiment) => experiment.key === hoverKey
  ).position;

  // moving to left
  if (experimentPosition > hoverPosition) {
    // removing experiment from array
    const movedExperiment = orderedExperiments.splice(experimentPosition, 1)[0];
    // changing moved experiment position
    movedExperiment.position = hoverPosition;
    // copying right experiments
    let rightExperiments = orderedExperiments.slice(hoverPosition);
    // changing position of right experiments
    rightExperiments = rightExperiments.map((experiment) => {
      // copying experiment
      const experimentChanged = experiment;
      // incrementing position
      experimentChanged.position += 1;
      // returning changed experiment
      return experimentChanged;
    });
    // chaging experiments array
    orderedExperiments.splice(hoverPosition, rightExperiments.length(), [
      movedExperiment,
      ...rightExperiments,
    ]);
  }

  // moving to right
  if (experimentPosition < hoverPosition) {
    // removing experiment from array
    const movedExperiment = orderedExperiments.splice(experimentPosition, 1)[0];
    // changing moved experiment position
    movedExperiment.position = hoverPosition;
    // copying right experiments
    let leftExperiments = orderedExperiments.slice(0, hoverPosition);
    // changing position of right experiments
    leftExperiments = leftExperiments.map((experiment) => {
      // copying experiment
      const experimentChanged = experiment;
      // decreasing position
      experimentChanged.position -= 1;
      // returning changed experiment
      return experimentChanged;
    });
    // chaging experiments array
    orderedExperiments.splice(experimentPosition, leftExperiments.length(), [
      ...leftExperiments,
      movedExperiment,
    ]);
  }

  // returning
  return {
    type: actionTypes.ORGANIZE_EXPERIMENTS,
    experiments: orderedExperiments,
  };
};

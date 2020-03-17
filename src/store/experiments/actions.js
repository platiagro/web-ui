// ACTION TYPES
import actionTypes from './actionTypes';

// MOCKS
// experiments
import experimentsMock from '../../components/Content/ProjectContent/ExperimentsTabs/_/_experimentsMock';
// experiment mock
const experimentMock = {
  title: 'Experimento Mock',
  key: 'experiment-mock',
  running: false,
  deployed: false,
  uuid: 'experiment-mock',
};

// ACTIONS
/**
 * fetch experiments action
 * @returns {type, experiments}
 */
export const fetchExperiments = () => ({
  type: actionTypes.FETCH_EXPERIMENTS,
  experiments: experimentsMock,
});

// FIXME: corrigir lógica
// TODO: passar lógica para o backend?
/**
 * fetch projects action
 * @param {number} experimentKey
 * @param {number} hoverKey
 * @returns {type, experiments}
 */
export const organizeExperiments = (experimentKey, hoverKey) => {
  // getting experiments
  const orderedExperiments = experimentsMock;
  // getting dragged experiment
  const draggedExperiment = orderedExperiments.find(
    (experiment) => experiment.key === experimentKey
  );
  // getting hover experiment
  const hoverExperiment = orderedExperiments.find(
    (experiment) => experiment.key === hoverKey
  );

  console.log(draggedExperiment);
  console.log(hoverExperiment);
  console.log(orderedExperiments);

  const experimentPosition = draggedExperiment.position;
  const hoverPosition = hoverExperiment.position;

  console.log(experimentPosition);
  console.log(hoverPosition);

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
    orderedExperiments.splice(hoverPosition, rightExperiments.length, [
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
    orderedExperiments.splice(experimentPosition, leftExperiments.length, [
      ...leftExperiments,
      movedExperiment,
    ]);
  }

  console.log(orderedExperiments);

  // returning
  return {
    type: actionTypes.ORGANIZE_EXPERIMENTS,
    experiments: orderedExperiments[0],
  };
};

/**
 * create experiment action
 * @param {Object} experiment
 * @returns {type, experiments}
 */
export const createExperiment = (experiment) => ({
  type: actionTypes.CREATE_EXPERIMENT,
  experiments: [...experimentsMock, experimentMock],
});

/**
 * delete experiment action
 * @param {string} experimentUuid
 * @returns {type, experiments}
 */
export const deleteExperiment = (experimentUuid) => ({
  type: actionTypes.DELETE_EXPERIMENT,
  experiments: experimentsMock.filter(
    (experiment) => experiment.uuid !== experimentUuid
  ),
});

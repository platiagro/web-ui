// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import experimentsApi from '../../services/ExperimentsApi';

// ACTIONS
// ** FETCH EXPERIMENTS
/**
 * fetch experiments success action
 * @param {Object} response
 * @returns {Object} { type, experiments }
 */
const fetchExperimentsSuccess = (response) => {
  // getting experiments from response
  const experiments = response.data;

  return {
    type: actionTypes.FETCH_EXPERIMENTS_SUCCESS,
    experiments,
  };
};

/**
 * fetch experiments fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const fetchExperimentsFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.FETCH_EXPERIMENTS_FAIL,
    errorMessage,
  };
};

/**
 * fetch experiments request action
 * @param {string} projectId
 * @returns {Function}
 */
export const fetchExperimentsRequest = (projectId) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_EXPERIMENTS_REQUEST,
  });

  // fetching experiments
  experimentsApi
    .listExperiments(projectId)
    .then((response) => dispatch(fetchExperimentsSuccess(response)))
    .catch((error) => dispatch(fetchExperimentsFail(error)));
};

// // // // // // // // // //

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
  const orderedExperiments = []; // experimentsMock;
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

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import pipelinesApi from '../../services/PipelinesApi';

// ACTIONS
// ** TRAIN EXPERIMENT
/**
 * train experiment success action
 * @returns {Object} { type }
 */
const trainExperimentSuccess = () => {
  return {
    type: actionTypes.TRAIN_EXPERIMENT_SUCCESS,
  };
};

/**
 * train experiment fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const trainExperimentFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.TRAIN_EXPERIMENT_FAIL,
    errorMessage,
  };
};

/**
 * train experiment request action
 * @param {Object} experiment
 * @param {Object[]} operators
 * @returns {Function}
 */
// eslint-disable-next-line import/prefer-default-export
export const trainExperimentRequest = (experiment, operators) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.TRAIN_EXPERIMENT_REQUEST,
  });

  // getting experiment data
  const { uuid: experimentId, dataset, target } = experiment;

  // creating train object
  const trainObject = { experimentId, dataset, target };

  // getting operators
  trainObject.components = operators.map((operator) => ({
    operatorId: operator.uuid,
    notebookPath: operator.trainingNotebookPath,
  }));

  // filtering dataset
  trainObject.components = trainObject.components.filter(
    (operator) => operator.operatorId !== 'dataset'
  );

  // training experiment
  pipelinesApi
    .trainExperiment(trainObject)
    .then(() => dispatch(trainExperimentSuccess()))
    .catch((error) => dispatch(trainExperimentFail(error)));
};

// // // // // // // // // //

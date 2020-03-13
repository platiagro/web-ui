// ACTION TYPES
import actionTypes from './actionTypes';

// MOCKS
// experiments
import experimentsMock from '../../components/Content/ProjectContent/ExperimentsTabs/_/_experimentsMock';
// experiment
const experimentMock = {
  title: 'Experimento 123',
  key: 'experiment123',
  running: true,
  deployed: false,
  position: 0,
  uuid: '123',
};

// ACTIONS
/**
 * fetch experiment action
 * @param {string} uuid
 * @returns {type, experiment}
 */
export const fetchExperiment = (uuid) => ({
  type: actionTypes.FETCH_EXPERIMENT,
  experiment: experimentsMock.filter((experiment) => experiment.uuid === uuid),
});

/**
 * create experiment action
 * @returns {type, experiment}
 */
export const createExperiment = () => ({
  type: actionTypes.CREATE_EXPERIMENT,
  experiment: experimentMock,
});

/**
 * delete experiment action
 * @param {string} uuid
 * @returns {type, experiments}
 */
export const deleteExperiment = (uuid) => ({
  type: actionTypes.DELETE_EXPERIMENT,
  experiments: experimentsMock.filter((experiment) => experiment.uuid !== uuid),
});

/**
 * edit experiment name action
 * @param {string} uuid
 * @param {string} newName
 * @returns {type, experiment}
 */
export const editExperimentName = (uuid, newName) => ({
  type: actionTypes.EDIT_EXPERIMENT_NAME,
  experiment: { ...experimentMock, name: newName },
});

/**
 * train experiment action
 * @param {string} uuid
 * @returns {type, experiment}
 */
export const trainExperiment = (uuid) => ({
  type: actionTypes.TRAIN_EXPERIMENT,
  experiment: { ...experimentMock, running: true },
});

/**
 * deploy experiment name action
 * @param {string} uuid
 * @returns {type, experiment}
 */
export const deployExperiment = (uuid) => ({
  type: actionTypes.DEPLOY_EXPERIMENT,
  experiment: { ...experimentMock, deployed: true },
});

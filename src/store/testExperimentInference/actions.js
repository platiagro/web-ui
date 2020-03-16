// ACTION TYPES
import actionTypes from './actionTypes';

// MOCKS
// inference mock
const inferenceMock = [0.9, 0.1];

// ACTIONS
/**
 * test implanted experiment inference action
 * @param {string} implantedExperimentUuid
 * @param {Object} file
 * @returns {type, inferenceResult}
 */
const testImplantedExperimentInference = (implantedExperimentUuid, file) => ({
  type: actionTypes.TEST_IMPLANTED_EXPERIMENT_INFERENCE,
  inferenceResult: inferenceMock,
});

// EXPORT DEFAULT
export default testImplantedExperimentInference;

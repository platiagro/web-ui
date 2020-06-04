// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';
import implantedExperimentsApi from 'services/implantedExperimentsApi';
// MOCKS
// inference mock
const inferenceMock = '[0.9, 0.1]';

// ACTIONS
/**
 * test implanted experiment inference action
 * @param {string} implantedExperimentUuid
 * @param {Object} file
 * @returns {type, inferenceResult}
 */

const testImplantedExperimentInference = (implantedExperimentUuid, file) => (dispatch) => {

  implantedExperimentsApi
    .testDeployedExperiments(implantedExperimentUuid, file)
    .then(response => {
      dispatch({
        type: actionTypes.TEST_IMPLANTED_EXPERIMENT_INFERENCE,
        inferenceResult: response.data.data,
      })
    })
    .catch(error => console.log(error))
};

// EXPORT DEFAULT
export default testImplantedExperimentInference;

// ACTION TYPES
import actionTypes from './actionTypes';

// ACTIONS
import {
  inferenceTestResultModalLoadingData,
  inferenceTestResultModalDataLoaded,
  showInferenceTestResultModal,
} from 'store/ui/actions';

// SERVICES
import implantedExperimentsApi from 'services/ImplantedExperimentsApi';

/**
 * Test implanted experiment inference action
 *
 * @param {string} deployId
 * @param {object} file
 */
export const testImplantedExperimentInferenceAction = (deployId, file) => (
  dispatch
) => {
  dispatch(inferenceTestResultModalLoadingData());
  dispatch(showInferenceTestResultModal());
  implantedExperimentsApi
    .testDeployedExperiments(deployId, file)
    .then((response) => {
      const seldonResponse =
        'data' in response.data ? response.data.data : response.data;
      dispatch({
        type: actionTypes.TEST_IMPLANTED_EXPERIMENT_INFERENCE,
        inferenceResult: seldonResponse,
      });
      dispatch(inferenceTestResultModalDataLoaded());
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.TEST_IMPLANTED_EXPERIMENT_INFERENCE_FAILS,
        deployId: deployId,
        file: file,
      });
      dispatch(inferenceTestResultModalDataLoaded());
    });
};

// ACTION TYPES
import actionTypes from './actionTypes';

// ACTIONS
import {
  fetchInferenceTestResultModalLoadingData,
  fetchInferenceTestResultModalDataLoaded,
  fetchShowInferenceTestResultModal,
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
  dispatch(fetchInferenceTestResultModalLoadingData());
  dispatch(fetchShowInferenceTestResultModal());
  implantedExperimentsApi
    .testDeployedExperiments(deployId, file)
    .then((response) => {
      const seldonResponse =
        'data' in response.data ? response.data.data : response.data;
      dispatch({
        type: actionTypes.TEST_IMPLANTED_EXPERIMENT_INFERENCE,
        inferenceResult: seldonResponse,
      });
      dispatch(fetchInferenceTestResultModalDataLoaded());
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.TEST_IMPLANTED_EXPERIMENT_INFERENCE_FAILS,
        deployId: deployId,
        file: file,
      });
      dispatch(fetchInferenceTestResultModalDataLoaded());
    });
};

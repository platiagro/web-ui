// ACTION TYPES
import actionTypes from './actionTypes';

// ACTIONS
import {
  inferenceTestResultModalLoadingData,
  inferenceTestResultModalDataLoaded,
  showInferenceTestResultModal,
} from 'store/ui/actions';

// SERVICES
import deploymentsApi from 'services/DeploymentsApi';

/**
 * Test implanted experiment inference action
 *
 * @param {string} deployId
 * @param url
 * @param {object} file
 */
export const testImplantedExperimentInferenceAction = (url, file) => (
  dispatch
) => {
  dispatch(inferenceTestResultModalLoadingData());
  dispatch(showInferenceTestResultModal());
  deploymentsApi
    .testDeployedExperiments(url, file)
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
        url: url,
        file: file,
      });
      dispatch(inferenceTestResultModalDataLoaded());
    });
};

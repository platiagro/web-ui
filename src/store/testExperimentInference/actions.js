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
 * @param {string} projectId
 * @param {string} deployId
 * @param {object} file
 */
export const testImplantedExperimentInferenceAction = (projectId, deployId, file) => (
  dispatch
) => {
  dispatch(inferenceTestResultModalLoadingData());
  dispatch(showInferenceTestResultModal());
  deploymentsApi
    .testDeployment(projectId, deployId, file)
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

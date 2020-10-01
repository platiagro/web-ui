// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// ACTIONS
import {
  inferenceTestResultModalLoadingData,
  inferenceTestResultModalDataLoaded,
  showInferenceTestResultModal,
} from 'store/ui/actions';

// SERVICES
import implantedExperimentsApi from 'services/implantedExperimentsApi';

// UTILS
import utils from 'utils';

/**
 * Test implanted experiment inference action
 *
 * @param {string} implantedExperimentUuid
 * @param {object} file
 */
export const testImplantedExperimentInferenceAction = (
  implantedExperimentUuid,
  file
) => (dispatch) => {
  dispatch(inferenceTestResultModalLoadingData());
  dispatch(showInferenceTestResultModal());
  implantedExperimentsApi
    .testDeployedExperiments(implantedExperimentUuid, file)
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
      });
      dispatch(inferenceTestResultModalDataLoaded());
      message.error(utils.getErrorMessage(error));
    });
};

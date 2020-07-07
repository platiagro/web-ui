// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';
import implantedExperimentsApi from 'services/implantedExperimentsApi';
import {
  showExperimentInferenceModal,
  implantedExperimentsLoadingData,
  implantedExperimentsDataLoaded,
} from 'store/ui/actions';
import utils from 'utils';

// ACTIONS
/**
 * test implanted experiment inference action
 * @param {string} implantedExperimentUuid
 * @param {Object} file
 * @returns {type, inferenceResult}
 */
const testImplantedExperimentInferenceAction = (
  implantedExperimentUuid,
  file
) => (dispatch) => {
  dispatch(implantedExperimentsLoadingData());
  implantedExperimentsApi
    .testDeployedExperiments(implantedExperimentUuid, file)
    .then((response) => {
      dispatch({
        type: actionTypes.TEST_IMPLANTED_EXPERIMENT_INFERENCE,
        inferenceResult: response.data.data,
      });
      dispatch(showExperimentInferenceModal());
      dispatch(implantedExperimentsDataLoaded());
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.TEST_IMPLANTED_EXPERIMENT_INFERENCE_FAILS,
      });
      dispatch(implantedExperimentsDataLoaded());
      message.error(utils.getErrorMessage(error));
    });
};

// EXPORT DEFAULT
export default testImplantedExperimentInferenceAction;

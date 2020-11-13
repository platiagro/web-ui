// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import { InferenceTestResultModal } from 'components/Modals';

// ACTIONS
import { fetchDeploymentLogsRequest } from 'store/deploymentLogs/actions';
import { testImplantedExperimentInferenceAction } from 'store/testExperimentInference/actions';
import { hideInferenceTestResultModal } from 'store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleCloseModal: () => dispatch(hideInferenceTestResultModal()),
    handleGetDeployExperimentLogs: (deployId) =>
      dispatch(fetchDeploymentLogsRequest(deployId)),
    handleTestImplantedExperimentInference: (deployId, file) =>
      dispatch(testImplantedExperimentInferenceAction(deployId, file)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    deployId: state.testExperimentInferenceReducer.deployId,
    file: state.testExperimentInferenceReducer.file,
    inferenceResult: state.testExperimentInferenceReducer.inferenceResult,
    loading: state.uiReducer.inferenceTestResultModal.loading,
    visible: state.uiReducer.inferenceTestResultModal.visible,
  };
};

/**
 * Container to display inference test result modal.
 *
 * @param {object} props Container props
 * @returns {InferenceTestResultModalContainer} Container
 */
const InferenceTestResultModalContainer = (props) => {
  const {
    deployId,
    file,
    handleCloseModal,
    handleGetDeployExperimentLogs,
    handleTestImplantedExperimentInference,
    inferenceResult,
    loading,
    visible,
  } = props;

  const handleOpenLog = () => {
    handleGetDeployExperimentLogs(deployId);
  };

  const handleRetryTest = () => {
    handleTestImplantedExperimentInference(deployId, file);
  };

  return (
    <InferenceTestResultModal
      closeModal={handleCloseModal}
      experimentInference={inferenceResult}
      fetchDeployExperimentLogs={handleOpenLog}
      isLoading={loading}
      retryTest={handleRetryTest}
      visible={visible}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InferenceTestResultModalContainer);
